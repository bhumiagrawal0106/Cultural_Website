import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import useFetch from '../../hooks/useFetch';
import { useLanguage } from '../../context/LanguageContext';
import ErrorBoundary from '../ErrorBoundary';
import Spinner from '../Spinner/Spinner';
import GeoStates from './GeoStates';
import TileStates from './TileStates';
import StaticStateList from './StaticStateList';
import CinematicIntro from './CinematicIntro';

const VIEW_KEY = 'bd_map_view';

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (err) {
    return false;
  }
}

function ViewToggle({ view, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(view === 'map' ? 'list' : 'map')}
      className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/40 glass px-3 py-1.5 text-xs font-semibold text-india-navy shadow-sm transition-all hover:bg-india-navy/5 hover:shadow-glow-navy"
      aria-pressed={view === 'list'}
    >
      <span aria-hidden="true">{view === 'map' ? '☰' : '🇮🇳'}</span> {label}
    </button>
  );
}

function Legend({ ui }) {
  return (
    <ul
      className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1 text-[11px] text-gray-600"
      aria-hidden="true"
    >
      <li className="flex items-center gap-1.5 rounded-full glass px-2 py-0.5 shadow-sm">
        <span className="inline-flex h-3 w-4 flex-col overflow-hidden rounded-xs border border-gray-200 shadow-2xs">
          <span className="flex-1 bg-[#FF671F]" />
          <span className="flex-1 bg-white" />
          <span className="flex-1 bg-[#138808]" />
        </span>
        <span className="font-medium text-gray-700">{ui('legendActive')}</span>
      </li>
      <li className="flex items-center gap-1.5 rounded-full glass px-2 py-0.5 shadow-sm">
        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gray-300" /> {ui('legendComingSoon')}
      </li>
    </ul>
  );
}

/** Animated gradient ocean disc behind the extruded states */
function OceanDisc() {
  const meshRef = useRef();
  return (
    <mesh ref={meshRef} position={[0, 0, -0.08]} receiveShadow>
      <circleGeometry args={[14.5, 96]} />
      <meshStandardMaterial
        color="#C7D2FE"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

/** Outer halo ring creating an ethereal glow around the subcontinent base */
function AtmosphereRing() {
  return (
    <group position={[0, 0, -0.09]}>
      <mesh>
        <ringGeometry args={[14.4, 15.6, 64]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, -0.005]}>
        <ringGeometry args={[15.6, 17.2, 64]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function Map3D() {
  const navigate = useNavigate();
  const { ui, pick } = useLanguage();
  const { data: statesRes, loading: statesLoading, error: statesError } = useFetch('/api/states');
  const [geo, setGeo] = useState(undefined); // undefined = loading, null = not available
  const [hovered, setHovered] = useState(null);
  const [view, setView] = useState(() =>
    sessionStorage.getItem(VIEW_KEY) === 'list' ? 'list' : 'map'
  );
  const [introPlayed, setIntroPlayed] = useState(false);
  const orbitRef = useRef();
  const webgl = useMemo(() => hasWebGL(), []);

  useEffect(() => {
    sessionStorage.setItem(VIEW_KEY, view);
  }, [view]);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/india-states.geojson', {
      headers: { Accept: 'application/geo+json, application/json' },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        const valid =
          json &&
          json.type === 'FeatureCollection' &&
          Array.isArray(json.features) &&
          json.features.length > 0;
        setGeo(valid ? json : null);
      })
      .catch(() => !cancelled && setGeo(null));
    return () => {
      cancelled = true;
    };
  }, []);

  const states = useMemo(() => (statesRes && statesRes.data) || [], [statesRes]);
  const bySlug = useMemo(
    () => Object.fromEntries(states.map((s) => [s.slug, s])),
    [states]
  );

  const onSelect = (slug) => {
    document.body.style.cursor = 'default';
    navigate(`/state/${slug}`);
  };

  const handleIntroDone = () => {
    setIntroPlayed(true);
    // Re-enable OrbitControls after intro finishes
    if (orbitRef.current) {
      orbitRef.current.enabled = true;
    }
  };

  const list = <StaticStateList states={states} />;

  // No WebGL: plain accessible list, no toggle
  if (!webgl) {
    return (
      <div className="card p-6">
        <p className="mb-4 text-sm text-gray-600">{ui('noWebGL')}</p>
        {statesLoading ? <Spinner /> : list}
      </div>
    );
  }

  const ready = geo !== undefined && !statesLoading;

  return (
    <section aria-label={ui('mapAria')} className="relative">
      <div className="card relative h-[60vh] min-h-[360px] w-full overflow-hidden md:h-[560px]"
           style={{
             background: 'linear-gradient(160deg, #EEF2FF 0%, #E0E7FF 40%, #F0FDF4 100%)'
           }}
      >
        <ViewToggle
          view={view}
          onChange={setView}
          label={view === 'map' ? ui('listView') : ui('mapView')}
        />

        {view === 'list' ? (
          <div className="h-full overflow-y-auto p-5 pt-14">
            {statesLoading ? (
              <Spinner />
            ) : statesError ? (
              <p className="text-sm text-gray-500">{ui('errorGeneric')}</p>
            ) : (
              list
            )}
          </div>
        ) : (
          <>
            <ErrorBoundary fallback={<div className="h-full overflow-y-auto p-5 pt-14">{list}</div>}>
              {!ready ? (
                <Spinner className="h-full" />
              ) : (
                <Suspense fallback={<Spinner className="h-full" />}>
                  <Canvas
                    shadows
                    dpr={[1, 1.75]}
                    frameloop="demand"
                    performance={{ min: 0.5 }}
                    camera={{ position: [0, 38, 8], fov: 40, near: 0.1, far: 200 }}
                    gl={{
                      antialias: true,
                      alpha: true,
                      powerPreference: 'high-performance',
                    }}
                    onPointerMissed={() => setHovered(null)}
                    aria-hidden="true"
                  >
                    {/* Atmospheric Stars field */}
                    <Stars radius={70} depth={30} count={600} factor={3} saturation={0.5} fade speed={0.8} />

                    {/* Lighting */}
                    <ambientLight intensity={0.75} />
                    <directionalLight
                      position={[12, 22, 10]}
                      intensity={1.4}
                      castShadow
                      shadow-mapSize-width={1024}
                      shadow-mapSize-height={1024}
                      shadow-camera-left={-15}
                      shadow-camera-right={15}
                      shadow-camera-top={15}
                      shadow-camera-bottom={-15}
                    />
                    <hemisphereLight args={['#EEF2FF', '#DCFCE7', 0.4]} />
                    <Environment preset="city" background={false} />

                    {/* Post-processing Bloom for glowing active states on hover */}
                    <EffectComposer multisampling={0} disableNormalPass>
                      <Bloom
                        luminanceThreshold={0.4}
                        luminanceSmoothing={0.85}
                        intensity={0.4}
                      />
                    </EffectComposer>

                    {/* Cinema intro — disabled once played */}
                    {!introPlayed && <CinematicIntro onDone={handleIntroDone} />}

                    {/* Map content — rotated to XZ plane */}
                    <group rotation={[-Math.PI / 2, 0, 0]}>
                      <OceanDisc />
                      <AtmosphereRing />

                      {geo ? (
                        <GeoStates
                          geo={geo}
                          bySlug={bySlug}
                          pick={pick}
                          onHover={setHovered}
                          onSelect={onSelect}
                        />
                      ) : (
                        <TileStates
                          states={states}
                          pick={pick}
                          onHover={setHovered}
                          onSelect={onSelect}
                        />
                      )}
                    </group>

                    {/* Orbit controls — disabled during intro */}
                    <OrbitControls
                      ref={orbitRef}
                      makeDefault
                      enabled={introPlayed}
                      enablePan={false}
                      enableDamping
                      dampingFactor={0.08}
                      minDistance={8}
                      maxDistance={40}
                      minPolarAngle={0.25}
                      maxPolarAngle={Math.PI / 2.25}
                      touches={{ ONE: 0, TWO: 2 }}
                    />
                  </Canvas>
                </Suspense>
              )}
            </ErrorBoundary>

            {ready && geo && <Legend ui={ui} />}

            {/* Hover tooltip — glassmorphism pill */}
            <div
              className={`pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full glass-dark px-4 py-1.5 text-sm font-semibold text-white shadow-glow-navy transition-all duration-200 ${
                hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              aria-live="polite"
            >
              {hovered
                ? `${hovered.label} · ${hovered.active ? ui('clickToExplore') : ui('comingSoon')}`
                : ''}
            </div>

            <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full glass px-3 py-1 text-xs text-gray-600 shadow-sm">
              {ui('mapHint')}
            </p>

            {ready && geo === null && import.meta.env.DEV && (
              <p className="absolute bottom-3 right-3 max-w-[220px] rounded bg-yellow-50 px-2 py-1 text-[11px] text-yellow-800">
                Dev: run <code>npm run fetch-geojson</code> to add real state boundaries
              </p>
            )}
          </>
        )}
      </div>

      {/* Screen-reader friendly list — always in DOM */}
      {view === 'map' && states.length > 0 && (
        <nav className="sr-only" aria-label={ui('mapAria')}>
          {list}
        </nav>
      )}
    </section>
  );
}

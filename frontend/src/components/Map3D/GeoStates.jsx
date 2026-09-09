import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { buildExtrudedGeometry, featureCentroid } from '../../utils/geo';
import { slugForFeature } from '../../utils/stateSlugMap';

// Indian National Flag Palette
const FLAG_SAFFRON = '#FF671F'; // Upper part: Northern states
const FLAG_WHITE = '#FFFFFF';   // Middle part: Central states
const FLAG_GREEN = '#138808';   // Bottom part: Southern states
const INACTIVE = '#D1D5DB';

// Determine flag tricolour band based on projected latitude (Y-axis)
function getFlagColor(y) {
  if (y >= 1.2) return FLAG_SAFFRON; // Upper part
  if (y >= -2.5) return FLAG_WHITE;  // Middle part
  return FLAG_GREEN;                 // Bottom part
}

function StateMesh({ geometry, edges, label, centroid, onSelect, onHover }) {
  const [hover, setHover] = useState(false);
  const meshRef = useRef();
  const emissiveIntensityRef = useRef(0);
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, [hover, invalidate]);

  const baseColor = getFlagColor(centroid[1]);
  const isWhite = baseColor === FLAG_WHITE;
  const hoverEmissive = isWhite ? '#06038D' : '#FFD700';

  // Smoothly animate emissive glow on hover
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = hover ? 0.35 : 0;
    if (Math.abs(emissiveIntensityRef.current - target) > 0.01) {
      emissiveIntensityRef.current += (target - emissiveIntensityRef.current) * Math.min(delta * 10, 1);
      meshRef.current.material.emissiveIntensity = emissiveIntensityRef.current;
      invalidate();
    }
  });

  const color = hover
    ? (isWhite ? '#E0E7FF' : baseColor === FLAG_SAFFRON ? '#FFA366' : '#22C55E')
    : baseColor;
  const liftY = hover ? 0.3 : 0;
  const edgeColor = isWhite ? '#06038D' : '#ffffff';
  const edgeOpacity = isWhite ? 0.4 : 0.85;

  return (
    <group position={[0, 0, liftY]}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          onHover({ label, active: true });
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(null);
          document.body.style.cursor = 'default';
        }}
      >
        <meshPhysicalMaterial
          color={color}
          roughness={0.45}
          metalness={0.08}
          clearcoat={0.2}
          clearcoatRoughness={0.3}
          emissive={hoverEmissive}
          emissiveIntensity={0}
        />
      </mesh>

      {/* State border edges */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={edgeColor} transparent opacity={edgeOpacity} />
      </lineSegments>

      {/* Crisp HTML label badge pinned to state centroid */}
      <Html
        position={[centroid[0], centroid[1], 0.4]}
        center
        distanceFactor={20}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className={`pointer-events-none select-none whitespace-nowrap rounded-md px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold tracking-tight transition-all duration-200 shadow-md ${
            hover
              ? 'scale-130 bg-india-navy text-amber-300 ring-2 ring-india-orange z-50 shadow-2xl'
              : isWhite
                ? 'bg-india-navy/95 text-white border border-white/40 shadow-sm'
                : 'bg-white/95 text-india-navy border border-black/15 shadow-sm'
          }`}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

export default function GeoStates({ geo, bySlug, pick, onHover, onSelect }) {
  const items = useMemo(() => {
    const out = [];
    const warned = [];
    (geo.features || []).forEach((feature, index) => {
      const { name, slug, mapped } = slugForFeature(feature.properties || {});
      const geometry = buildExtrudedGeometry(feature, 0.28);
      if (!geometry) return;
      if (!mapped) warned.push(name);
      out.push({
        key: `${slug}-${index}`,
        name,
        slug,
        state: bySlug[slug] || null,
        geometry,
        edges: new THREE.EdgesGeometry(geometry, 25),
        centroid: featureCentroid(feature),
      });
    });
    if (warned.length) {
      console.warn(
        `[Map3D] No slug mapping for GeoJSON state(s): ${warned.join(', ')}. Add them to src/utils/stateSlugMap.js`
      );
    }
    return out;
  }, [geo, bySlug]);

  useEffect(
    () => () => {
      items.forEach((item) => {
        item.geometry.dispose();
        item.edges.dispose();
      });
    },
    [items]
  );

  return items.map((item) => (
    <StateMesh
      key={item.key}
      geometry={item.geometry}
      edges={item.edges}
      centroid={item.centroid}
      label={item.state ? pick(item.state, 'name') : item.name}
      onSelect={() => onSelect(item.slug)}
      onHover={onHover}
    />
  ));
}

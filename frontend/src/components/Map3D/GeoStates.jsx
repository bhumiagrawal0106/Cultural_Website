import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { buildExtrudedGeometry, featureCentroid } from '../../utils/geo';
import { slugForFeature } from '../../utils/stateSlugMap';

const ORANGE = '#FF9933';
const GREEN = '#138808';
const INACTIVE = '#E5E7EB';

function StateMesh({ geometry, edges, label, active, centroid, onSelect, onHover }) {
  const [hover, setHover] = useState(false);
  const color = !active ? INACTIVE : hover ? GREEN : ORANGE;

  return (
    <group position={[0, 0, hover && active ? 0.25 : 0]}>
      <mesh
        geometry={geometry}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (active) onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          onHover({ label, active });
          document.body.style.cursor = active ? 'pointer' : 'default';
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(null);
          document.body.style.cursor = 'default';
        }}
      >
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.05} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </lineSegments>
      {active && (
        <Html position={[centroid[0], centroid[1], 0.6]} center distanceFactor={16} style={{ pointerEvents: 'none' }}>
          <span className="whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-india-navy shadow">
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}

export default function GeoStates({ geo, bySlug, pick, onHover, onSelect }) {
  const items = useMemo(() => {
    const out = [];
    const warned = [];
    (geo.features || []).forEach((feature, index) => {
      const { name, slug, mapped } = slugForFeature(feature.properties || {});
      const geometry = buildExtrudedGeometry(feature, 0.35);
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
      console.warn(`[Map3D] No slug mapping for GeoJSON state(s): ${warned.join(', ')}. Add them to src/utils/stateSlugMap.js`);
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
      active={Boolean(item.state)}
      onSelect={() => onSelect(item.slug)}
      onHover={onHover}
    />
  ));
}

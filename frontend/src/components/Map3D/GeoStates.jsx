import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Billboard, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { buildExtrudedGeometry, featureCentroid } from '../../utils/geo';
import { slugForFeature } from '../../utils/stateSlugMap';

const ORANGE = '#FF9933';
const GREEN = '#138808';
const INACTIVE = '#D1D5DB';
const HOVER_EMISSIVE = '#FF9933';

function StateMesh({ geometry, edges, label, active, centroid, onSelect, onHover }) {
  const [hover, setHover] = useState(false);
  const meshRef = useRef();
  const emissiveIntensityRef = useRef(0);
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, [hover, invalidate]);

  // Smoothly animate emissive glow on hover
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = hover && active ? 0.35 : 0;
    if (Math.abs(emissiveIntensityRef.current - target) > 0.01) {
      emissiveIntensityRef.current += (target - emissiveIntensityRef.current) * Math.min(delta * 10, 1);
      meshRef.current.material.emissiveIntensity = emissiveIntensityRef.current;
      invalidate();
    }
  });

  const color = !active ? INACTIVE : hover ? GREEN : ORANGE;
  const liftY = hover && active ? 0.3 : 0;

  return (
    <group position={[0, 0, liftY]}>
      <mesh
        ref={meshRef}
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
        <meshPhysicalMaterial
          color={color}
          roughness={0.45}
          metalness={0.08}
          clearcoat={0.2}
          clearcoatRoughness={0.3}
          emissive={HOVER_EMISSIVE}
          emissiveIntensity={0}
        />
      </mesh>

      {/* State border edges */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.85} />
      </lineSegments>

      {/* Floating label for active states — uses Billboard (always faces camera) */}
      {active && (
        <Billboard
          position={[centroid[0], centroid[1], 0.55]}
          follow={true}
          lockX={false}
          lockY={false}
        >
          <Text
            fontSize={0.28}
            color="#06038D"
            anchorX="center"
            anchorY="middle"
            font={undefined}
            outlineWidth={0.02}
            outlineColor="#ffffff"
          >
            {label}
          </Text>
        </Billboard>
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
      active={Boolean(item.state)}
      onSelect={() => onSelect(item.slug)}
      onHover={onHover}
    />
  ));
}

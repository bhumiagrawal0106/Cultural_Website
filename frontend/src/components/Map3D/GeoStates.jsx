import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Billboard, Text } from '@react-three/drei';
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

function StateMesh({ geometry, edges, label, active, centroid, onSelect, onHover }) {
  const [hover, setHover] = useState(false);
  const meshRef = useRef();
  const emissiveIntensityRef = useRef(0);
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, [hover, invalidate]);

  const baseColor = !active ? INACTIVE : getFlagColor(centroid[1]);
  const isWhite = baseColor === FLAG_WHITE;
  const hoverEmissive = isWhite ? '#06038D' : '#FFD700';

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

  const color = hover && active
    ? (isWhite ? '#E0E7FF' : baseColor === FLAG_SAFFRON ? '#FFA366' : '#22C55E')
    : baseColor;
  const liftY = hover && active ? 0.3 : 0;
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
          emissive={hoverEmissive}
          emissiveIntensity={0}
        />
      </mesh>

      {/* State border edges */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={edgeColor} transparent opacity={edgeOpacity} />
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

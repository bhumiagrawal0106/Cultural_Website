import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { project } from '../../utils/geo';

const FLAG_SAFFRON = '#FF671F';
const FLAG_WHITE = '#FFFFFF';
const FLAG_GREEN = '#138808';

function getFlagColor(y) {
  if (y >= 1.2) return FLAG_SAFFRON;
  if (y >= -2.5) return FLAG_WHITE;
  return FLAG_GREEN;
}

// Rough outline of India used as a backdrop when the GeoJSON file is not available.
const OUTLINE = [
  [68.2, 23.6], [70.0, 21.0], [72.6, 19.9], [73.0, 17.0], [74.5, 14.0], [75.5, 11.5], [76.6, 8.4], [77.6, 8.1],
  [78.3, 9.3], [79.9, 10.3], [80.3, 13.2], [80.1, 15.7], [82.3, 17.0], [84.8, 19.2], [86.9, 20.5], [88.0, 21.6],
  [89.1, 22.1], [89.7, 24.0], [88.2, 25.9], [89.8, 26.3], [92.0, 26.8], [94.9, 27.7], [96.7, 28.5], [97.4, 27.7],
  [95.2, 26.6], [94.2, 24.4], [92.3, 23.1], [91.5, 24.1], [89.9, 25.2], [88.1, 26.6], [88.9, 27.5], [88.0, 28.0],
  [85.0, 28.6], [81.0, 30.2], [79.0, 31.3], [78.8, 32.7], [78.4, 34.5], [77.0, 35.6], [74.4, 36.8], [73.9, 34.8],
  [74.0, 32.9], [74.6, 31.2], [73.9, 29.6], [71.0, 27.9], [69.5, 26.6], [70.2, 24.7], [68.7, 24.2],
];

function OutlinePlate() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    OUTLINE.forEach((coord, i) => {
      const [x, y] = project(coord);
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    });
    s.closePath();
    return s;
  }, []);

  return (
    <mesh position={[0, 0, -0.02]} receiveShadow>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color="#F8FAFC" roughness={1} />
    </mesh>
  );
}

function Tile({ position, label, onSelect, onHover }) {
  const [hover, setHover] = useState(false);
  const baseColor = getFlagColor(position[1]);
  const isWhite = baseColor === FLAG_WHITE;
  const tileColor = hover
    ? (isWhite ? '#E0E7FF' : baseColor === FLAG_SAFFRON ? '#FFA366' : '#22C55E')
    : baseColor;

  return (
    <group position={position}>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, hover ? 0.5 : 0.3]}
        castShadow
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
        <cylinderGeometry args={[1.05, 1.05, 0.6, 6]} />
        <meshStandardMaterial color={tileColor} roughness={0.5} />
      </mesh>
      <Html position={[0, 0, 1.1]} center distanceFactor={16} style={{ pointerEvents: 'none' }}>
        <span className="whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-india-navy shadow">
          {label}
        </span>
      </Html>
    </group>
  );
}

export default function TileStates({ states, pick, onHover, onSelect }) {
  return (
    <>
      <OutlinePlate />
      {states
        .filter((s) => s.mapCoordinates && typeof s.mapCoordinates.lat === 'number')
        .map((s) => {
          const [x, y] = project([s.mapCoordinates.lng, s.mapCoordinates.lat]);
          return (
            <Tile
              key={s.slug}
              position={[x, y, 0]}
              label={pick(s, 'name')}
              onSelect={() => onSelect(s.slug)}
              onHover={onHover}
            />
          );
        })}
    </>
  );
}

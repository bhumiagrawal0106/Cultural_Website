import * as THREE from 'three';

// Simple equirectangular projection centred on India. 1 unit ~ 1.8 degrees.
const LAT0 = 22.5;
const LNG0 = 81;
const SCALE = 0.55;
const COS_LAT0 = Math.cos((LAT0 * Math.PI) / 180);

export function project([lng, lat]) {
  return [(lng - LNG0) * COS_LAT0 * SCALE, (lat - LAT0) * SCALE];
}

function ringToPath(ring, PathClass) {
  const path = new PathClass();
  ring.forEach((coord, i) => {
    const [x, y] = project(coord);
    if (i === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  });
  return path;
}

function polygonsOf(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'Polygon') return [geometry.coordinates];
  if (geometry.type === 'MultiPolygon') return geometry.coordinates;
  return [];
}

export function featureToShapes(feature) {
  return polygonsOf(feature.geometry)
    .filter((polygon) => polygon[0] && polygon[0].length >= 3)
    .map(([outer, ...holes]) => {
      const shape = ringToPath(outer, THREE.Shape);
      holes.forEach((hole) => shape.holes.push(ringToPath(hole, THREE.Path)));
      return shape;
    });
}

/** Centroid (projected) of the largest outer ring, used for labels. */
export function featureCentroid(feature) {
  let best = null;
  polygonsOf(feature.geometry).forEach((polygon) => {
    const ring = polygon[0];
    if (ring && (!best || ring.length > best.length)) best = ring;
  });
  if (!best) return [0, 0];
  const sum = best.reduce(
    (acc, coord) => {
      const [x, y] = project(coord);
      return [acc[0] + x, acc[1] + y];
    },
    [0, 0]
  );
  return [sum[0] / best.length, sum[1] / best.length];
}

export function buildExtrudedGeometry(feature, depth = 0.35) {
  const shapes = featureToShapes(feature);
  if (!shapes.length) return null;
  const geometry = new THREE.ExtrudeGeometry(shapes, { depth, bevelEnabled: false });
  geometry.computeVertexNormals();
  return geometry;
}

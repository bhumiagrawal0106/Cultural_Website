import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei';
import ErrorBoundary from './ErrorBoundary';
import Spinner from './Spinner/Spinner';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function ModelViewer({ url, fallback }) {
  return (
    <div className="card h-72 w-full bg-gradient-to-b from-white to-india-bg sm:h-96">
      <ErrorBoundary fallback={fallback || null}>
        <Suspense fallback={<Spinner className="h-full" />}>
          <Canvas camera={{ position: [0, 1.2, 4], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} />
            <directionalLight position={[-5, 3, -5]} intensity={0.4} />
            <Bounds fit clip observe margin={1.25}>
              <Model url={url} />
            </Bounds>
            <OrbitControls makeDefault enablePan={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const F1CarModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/f1-car.gltf");

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} scale={[0.008, 0.008, 0.008]} position={[0, -0.5, 0]} rotation={[0.1, 0, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
};

// Preload the model
useGLTF.preload("/models/f1-car.gltf");

export const F1Car3D = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-5, 3, -5]} intensity={0.8} color="#d4a100" />
          <pointLight position={[5, -2, 5]} intensity={0.5} color="#00d4aa" />
          <F1CarModel />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

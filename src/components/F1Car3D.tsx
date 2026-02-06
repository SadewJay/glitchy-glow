import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const F1CarModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const primaryColor = "#d4a100";
  const accentColor = "#00d4aa";
  const darkColor = "#1a1a1a";

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={[1.2, 1.2, 1.2]} position={[0, 0, 0]}>
        {/* Main Body */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.8, 0.25, 2.8]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Nose Cone */}
        <mesh position={[0, 0.1, 1.8]} rotation={[Math.PI / 8, 0, 0]}>
          <coneGeometry args={[0.2, 1, 4]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Cockpit */}
        <mesh position={[0, 0.35, -0.2]}>
          <boxGeometry args={[0.5, 0.3, 0.8]} />
          <meshStandardMaterial color={darkColor} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Halo */}
        <mesh position={[0, 0.5, 0]}>
          <torusGeometry args={[0.25, 0.03, 8, 16, Math.PI]} />
          <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} emissive={accentColor} emissiveIntensity={0.3} />
        </mesh>

        {/* Front Wing */}
        <mesh position={[0, 0, 1.6]}>
          <boxGeometry args={[1.4, 0.03, 0.4]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.6, 0.05, 1.6]}>
          <boxGeometry args={[0.2, 0.15, 0.35]} />
          <meshStandardMaterial color={darkColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.6, 0.05, 1.6]}>
          <boxGeometry args={[0.2, 0.15, 0.35]} />
          <meshStandardMaterial color={darkColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Rear Wing */}
        <mesh position={[0, 0.5, -1.4]}>
          <boxGeometry args={[1.2, 0.02, 0.3]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.35, -1.4]}>
          <boxGeometry args={[1.0, 0.02, 0.25]} />
          <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.2} emissive={accentColor} emissiveIntensity={0.2} />
        </mesh>
        {/* Wing Supports */}
        <mesh position={[-0.4, 0.25, -1.35]}>
          <boxGeometry args={[0.03, 0.5, 0.15]} />
          <meshStandardMaterial color={darkColor} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.4, 0.25, -1.35]}>
          <boxGeometry args={[0.03, 0.5, 0.15]} />
          <meshStandardMaterial color={darkColor} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Side Pods */}
        <mesh position={[-0.55, 0.18, -0.3]}>
          <boxGeometry args={[0.35, 0.3, 1.2]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.55, 0.18, -0.3]}>
          <boxGeometry args={[0.35, 0.3, 1.2]} />
          <meshStandardMaterial color={primaryColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Wheels */}
        {/* Front Left */}
        <group position={[-0.7, 0, 1.1]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
            <meshStandardMaterial color={darkColor} metalness={0.5} roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} emissive={accentColor} emissiveIntensity={0.5} />
          </mesh>
        </group>
        {/* Front Right */}
        <group position={[0.7, 0, 1.1]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
            <meshStandardMaterial color={darkColor} metalness={0.5} roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} emissive={accentColor} emissiveIntensity={0.5} />
          </mesh>
        </group>
        {/* Rear Left */}
        <group position={[-0.7, 0, -1]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
            <meshStandardMaterial color={darkColor} metalness={0.5} roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.21, 16]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} emissive={accentColor} emissiveIntensity={0.5} />
          </mesh>
        </group>
        {/* Rear Right */}
        <group position={[0.7, 0, -1]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
            <meshStandardMaterial color={darkColor} metalness={0.5} roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.21, 16]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.1} emissive={accentColor} emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Engine Cover / Air Intake */}
        <mesh position={[0, 0.4, -0.6]}>
          <boxGeometry args={[0.3, 0.25, 0.6]} />
          <meshStandardMaterial color={darkColor} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

export const F1Car3D = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#d4a100" />
        <pointLight position={[5, -2, 5]} intensity={0.3} color="#00d4aa" />
        <F1CarModel />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

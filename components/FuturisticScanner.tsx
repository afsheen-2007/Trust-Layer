import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Ring, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Augment JSX namespace to recognize React Three Fiber elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshBasicMaterial: any;
      group: any;
      ambientLight: any;
      pointLight: any;
      fog: any;
    }
  }
}

const NeuralCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1.2, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#4f46e5"
          emissive="#2e1065"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          wireframe={true}
        />
      </Sphere>
      {/* Inner Glowing Core */}
      <Sphere args={[0.8, 32, 32]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </Sphere>
    </Float>
  );
};

const ScanningRings = () => {
    const ringRef1 = useRef<THREE.Mesh>(null);
    const ringRef2 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ringRef1.current) {
            ringRef1.current.rotation.x = Math.PI / 1.8;
            ringRef1.current.rotation.z = t * 0.2;
            ringRef1.current.scale.setScalar(1 + Math.sin(t) * 0.05);
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.x = Math.PI / 2.2;
            ringRef2.current.rotation.y = Math.PI / 6;
            ringRef2.current.rotation.z = -t * 0.15;
        }
    });

    return (
        <group>
            <Ring args={[1.8, 1.85, 64]} ref={ringRef1}>
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[2.2, 2.22, 64]} ref={ringRef2}>
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} side={THREE.DoubleSide} />
            </Ring>
        </group>
    );
};

const FloatingDataParticles = () => {
    const ref = useRef<any>(null);
    // Generate random positions
    const count = 300;
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count; i++) {
        const r = 4 + Math.random() * 4;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i*3+2] = r * Math.cos(phi);
    }

    useFrame((state) => {
        if(ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    })

    return (
        <group rotation={[0,0,Math.PI/4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#22d3ee"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

export const FuturisticScanner: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <NeuralCore />
        <ScanningRings />
        <FloatingDataParticles />
        
        <fog attach="fog" args={['#0b0f19', 5, 20]} />
      </Canvas>
    </div>
  );
};

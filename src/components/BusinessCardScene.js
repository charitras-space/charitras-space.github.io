import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function CardMesh() {
  const faceMat = React.useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#10121e',
        metalness: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.3,
        envMapIntensity: 1.8,
      }),
    [],
  );
  const edgeMat = React.useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffd166',
        metalness: 1,
        roughness: 0.4,
        clearcoat: 1,
        envMapIntensity: 2.2,
      }),
    [],
  );
  const geometry = React.useMemo(() => {
    const w = 2.6;
    const h = 4.2;
    const r = 0.25;
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.04,
      bevelEnabled: false,
      material: 0,
      extrudeMaterial: 1,
    });
  }, []);

  const ref = React.useRef();

  // Handle texture loading with error handling
  const [logoTexture, setLogoTexture] = useState(null);
  const [textureError, setTextureError] = useState(false);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/assets/abstract.png',
      (texture) => {
        setLogoTexture(texture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
        setTextureError(true);
      }
    );
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.025;
  });

  return (
    <group ref={ref}>
      <mesh geometry={geometry} material={[faceMat, edgeMat]} />

      {logoTexture && (
        <mesh position={[0, 1.6, 0.05]}>
          <planeGeometry args={[2.58, 1]} />
          <meshPhysicalMaterial map={logoTexture} metalness={0.3} roughness={0.7} transparent />
        </mesh>
      )}

      {textureError && (
        <mesh position={[0, 1.6, 0.05]}>
          <planeGeometry args={[2.58, 1]} />
          <meshPhysicalMaterial color="#333" metalness={0.3} roughness={0.7} />
        </mesh>
      )}

      <React.Suspense fallback={null}>
        {/* Embossed Title */}
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.4}
          height={0.008}
          position={[1.2, -1.7, 0.036]}
          rotation={[0, 0, Math.PI / 2]}
        >
          BLISS
          <meshPhysicalMaterial
            attach="material"
            color="#0a0a0a"
            metalness={0}
            roughness={0.2}
            clearcoat={0}
            clearcoatRoughness={1}
            envMapIntensity={0.5}
          />
        </Text3D>
        {/* Business Details */}
        {/* Business Details (horizontal) */}
        {/* Business Info Left */}
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={0.1}
          height={0.006}
          position={[-0.6, 0.1, 0.036]}
          rotation={[0, 0, 0]}
        >
          CHARITRA ARORA
          <meshPhysicalMaterial attach="material" color="#ffffff" roughness={1} />
        </Text3D>

        {/* Contact Info Right */}
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.07}
          height={0.005}
          position={[-0.5, -0.1, 0.036]}
          rotation={[0, 0, 0]}
        >
          SOFTWARE DEVELOPER
          <meshPhysicalMaterial attach="material" color="#ffffff" roughness={1} />
        </Text3D>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.08}
          height={0.006}
          position={[-1.1, -1.1, 0.036]}
          rotation={[0, 0, 0]}
        >
          +91 810 311 8540
          <meshPhysicalMaterial attach="material" color="#ffffff" roughness={1} />
        </Text3D>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.08}
          height={0.006}
          position={[-1.1, -1.3, 0.036]}
          rotation={[0, 0, 0]}
        >
          charitraarora@gmail.com
          <meshPhysicalMaterial attach="material" color="#ffffff" roughness={1} />
        </Text3D>
      </React.Suspense>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Warm key light */}
      <spotLight
        color="#ffd166"
        position={[5, 6, 5]}
        angle={0.4}
        penumbra={1}
        intensity={1.8}
        castShadow
      />
      {/* Cool rim light */}
      <directionalLight
        color="#ffffff"
        position={[-5, 4, 23]}
        intensity={0.2}
      />
      <directionalLight
        color="#ffffff"
        position={[8, -6, 23]}
        intensity={0.2}
      />
    </>
  );
}

export default function CardShowcase({ onLoaded }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  // Signal when card is fully loaded
  useEffect(() => {
    // Delay indicating loaded state to ensure proper rendering
    const timer = setTimeout(() => {
      setIsLoaded(true);
      if (onLoaded) {
        onLoaded();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background: 'transparent',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
        shadows
        camera={{ position: [0, 0, 7], fov: 40 }}
      >
        <CardMesh />
        <Lights />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.15}
        />
      </Canvas>
    </div>
  );
}

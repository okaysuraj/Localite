import React, { useLayoutEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export const SceneContent = ({ timeline }) => {
  const { camera } = useThree();
  const meshRef = useRef();

  useLayoutEffect(() => {
    if (!timeline || !meshRef.current) return;

    // Reset initial camera
    camera.position.set(0, 0, 8);

    // Camera Choreography
    timeline
      // Hero to Value Prop
      .to(camera.position, {
        z: 4,
        x: 1.2,
        ease: 'power2.inOut',
        duration: 1,
      }, 'hero')
      // Value Prop to Features
      .to(camera.position, {
        z: 5.5,
        x: -1.2,
        ease: 'power2.inOut',
        duration: 1,
      }, 'valueProp')
      // Features to CTA
      .to(camera.position, {
        z: 7,
        x: 0,
        ease: 'power2.out',
        duration: 1,
      }, 'features');

    // Mesh Rotation Behavior
    timeline
      .to(meshRef.current.rotation, {
        y: Math.PI * 0.8,
        ease: 'power2.out',
        duration: 1,
      }, 'hero+=0.1')
      .to(meshRef.current.rotation, {
        x: Math.PI * 0.4,
        ease: 'power2.out',
        duration: 1,
      }, 'valueProp+=0.1')
      .to(meshRef.current.rotation, {
        y: Math.PI * 1.6,
        x: 0.2,
        ease: 'power2.out',
        duration: 1,
      }, 'features+=0.1');

  }, [camera, timeline]);

  useFrame(() => {
    if (camera) {
      camera.lookAt(0, 0, 0);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 6, 5]} intensity={1.2} color="#1A6B4A" />
      <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#E8E8E8" />

      {/* Hero Architectural Geometric Mesh */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#1A6B4A"
          roughness={0.4}
          metalness={0.1}
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* Subtle Warm Canvas Plane */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#F7F6F3" />
      </mesh>
    </>
  );
};

export default SceneContent;

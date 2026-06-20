import React, { useLayoutEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export const SceneContent = ({ timeline }) => {
  const { camera } = useThree();
  const meshRef = useRef();

  useLayoutEffect(() => {
    if (!timeline) return;

    // Reset initial camera
    camera.position.set(0, 0, 8);
    
    // Add labels matching the parent timeline if not already added, but the parent should manage labels.
    // We will just add our animations to the timeline at the corresponding labels.
    
    // Camera Choreography (Phase 3)
    timeline
      // Hero to Value Prop (0% -> 33%)
      .to(camera.position, {
        z: 4,
        x: 1.5,
        ease: 'power2.inOut',
        duration: 1
      }, 'hero')
      // Value Prop to Features (33% -> 66%)
      .to(camera.position, {
        z: 6,
        x: -1.5,
        ease: 'power2.inOut',
        duration: 1
      }, 'valueProp')
      // Features to CTA (66% -> 100%)
      .to(camera.position, {
        z: 10,
        x: 0,
        ease: 'expo.out',
        duration: 1
      }, 'features');

    // Object Behavior (Phase 4) - Reacts slightly after camera
    timeline
      .to(meshRef.current.rotation, {
        y: Math.PI,
        ease: 'power3.out',
        duration: 1
      }, 'hero+=0.2')
      .to(meshRef.current.rotation, {
        x: Math.PI / 2,
        ease: 'power3.out',
        duration: 1
      }, 'valueProp+=0.2')
      .to(meshRef.current.rotation, {
        y: Math.PI * 2,
        x: 0,
        ease: 'power3.out',
        duration: 1
      }, 'features+=0.2');

  }, [camera, timeline]);

  useFrame(() => {
    // Phase 3: camera.lookAt controls focus
    camera.lookAt(0, 0, 0);
    // Keep mesh rotating slightly regardless of scroll
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#c6ff00" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
      
      {/* 1 Hero Mesh */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#224400"
          wireframe={true} 
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* 1 Background Plane */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
    </>
  );
};

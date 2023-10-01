import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import state from '../store';
import { useSnapshot } from 'valtio';

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);
//useFrame is executed on every frame of animation hence making the rendering on the targetesd item everytime
  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1268; // Defining parameters for larger screen
    const isMobile = window.innerWidth <= 600; // Defining parameters for mobile
    let targetPosition = [-0.4, 0, 2];

    if (snap.intro) {
      if (isBreakPoint) {
        targetPosition = [0, 0, 2]; // Defining the target position of the shirt at the center of the screen for larger screens
      }
      if (isMobile) {
        targetPosition = [0, 0.2, 2.5]; // Doing the same for mobile
      }
    } else {
      if (isMobile) {
        targetPosition = [0, 0.2, 2.5]; // Adjusting the position at the customizer page for mobile
      } else {
        targetPosition = [0, 0, 2]; // Same but for larger screens
      }
    }
    //set model camera position
    easing.damp3(state.camera.position,targetPosition,0.25,delta);

    // Set the model to rotate smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0], // Defining the points of the rotation
      0.25
    );
  });

  return (
    <group ref={group}>
      {children}
    </group>
  );
};

export default CameraRig;

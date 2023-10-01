import React from 'react'
import {easing} from 'maath';
import { useSnapshot } from 'valtio';
import {useFrame} from '@react-three/fiber';
import { Decal,useGLTF,useTexture} from '@react-three/drei';
import state from '../store'
const Shirt = () => {//creating the shirt 3d
    const snap = useSnapshot(state);//using ssnapshot provided by valtio
    const {nodes,materials} = useGLTF('/shirt_baked.glb');//use nodes,materials from useGLTF
    const logoTexture = useTexture(snap.logoDecal);//.logoDecal points to a default image
    const fullTexture = useTexture(snap.fullDecal);
    useFrame((state,delta)=>{easing.dampC(materials.lambert1.color,snap.color,0.25,delta)});
    const stateString = JSON.stringify(snap);

    return (
   <group key = {stateString}>
    <mesh
    castShadow
    geometry={nodes.T_Shirt_male.geometry}//we are telling the library that we want the attribute of the shirt object to be set as that of node.T_Shirt_male
     material = {materials.lambert1}//this is the material which makes up our shirt
    material-roughness = {1}
    dispose = {null}    
    >
   {snap.isFullTexture &&
   (<Decal
     position = {[0,0,0]}
     rotation = {[0,0,0]}
     scale = {1}
     map = {fullTexture}/>)//pointing out that the image with full screen size texture is to be mapped
    }
  {snap.isLogoTexture && (
    <Decal
     position = {[0,0.04,0.15]}
     rotation = {[0,0,0]}
     scale = {0.15}
     map = {logoTexture}//pointing out to the image with logo screen size texture to be mapped
    //map-anisortopy = {16}//providing better fitting to the shirt
     depthTest = {false}
     depthWrite = {true}
     />
  )
  }


    </mesh>
   </group>
  )
}

export default Shirt
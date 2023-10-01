import { Canvas } from '@react-three/fiber'
import { Environment,Center, EnvironmentMap } from '@react-three/drei';
import Shirt from './Shirt';
import CameraRig from './CameraRig';
import Backdrop from './Backdrop';


const CanvasModel = () => {
  return (
  <Canvas
  shadows //turning on the shadows for the canvas
  camera={{position: [0,0,0], fov : 25}}//positon is setting the position of the camera and fov is setting the field of view the greater the fov the larger the canvas
  gl = {{preserveDrawingBuffer : true}}
  className="w-full max-w-full h-full transition-all ease-in"

  >
    <ambientLight intensity= {0.5} />
    <Environment preset = "city"/>
    <CameraRig>
      <Backdrop/>
    <Center> 
      <Shirt/>
      </Center>
   
    </CameraRig>
    
  </Canvas>
  )}

export default CanvasModel
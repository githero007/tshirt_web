import React from 'react'
import {SketchPicker} from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';
const Colorpicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className= "absolute left-full ml-3">
      <SketchPicker
      color = {snap.color}//defining the default value of the color 
      disableAlpha
      presetColors = {[
        '#FF0000', // Red
        '#00FF00', // Green
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#FF00FF', // Magenta
        '#00FFFF', // Cyan
        '#FFA500', // Orange
        // Add more colors as needed
      ]}
      onChange={(color)=> state.color = color.hex}//changing the color of the state to the color of the hex the state.color is the default value we have rendered on the shirt so as the state.color is changed so is the color of the shirt
       />
     
    </div>
    
  )
}

export default Colorpicker
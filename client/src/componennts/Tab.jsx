import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
const Tab = ({tab,isFilterTab,isActiveTab,handleClick}) => {
  const snap = useSnapshot(state);
  const generateStyles =  isFilterTab && isActiveTab ? 
    {
      backgroundColor :snap.color ,opacity:0.5
    }:{
      backgroundColor : 'transparent' , opacity :1
    }
  

  return (
     <div key = {tab.name}
    className= {`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
    style={generateStyles}
    onClick = {handleClick}
     >
      <img src= {tab.icon}//the images are rendered from their parent components
      //Filter Tabs and Editor Tabs they have an image stored as an icon so when you use tab.icon it renders those 
      //elements
      alt = {tab.name}
      className= {`${isFilterTab? 'h-2/3 w-2/3':'w-11/12 h-11/12 object-contain'}`}
      />

    </div>  
  )
}

export default Tab
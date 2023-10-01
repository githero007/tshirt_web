import React from 'react';
import { useState, useEffect } from 'react';
import state from '../store';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { Aipicker, ColorPicker, FilePicker, Tab, CustomButton } from '../componennts';

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImage, setGeneratingImage] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({logoShirt: true,stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
        break;
      case "aipicker":
        return <Aipicker
        prompt = {prompt}
        setPrompt = {setPrompt}
        generatingImage = {generatingImage}
        handleSubmit = {handleSubmit}
        />;
        break;
      case "filepicker":
        return <FilePicker
           file={file} 
          setFile={setFile}
          readFile={readFile}
        />
        break;
      default:
        return null;
    }
  }

  //decaltypes is just a content defined in constant,js
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  } 
  const handleSubmit = async(type)=>
  {
    if(!prompt)alert("please enter a prompt");
    try {
       setGeneratingImage(true);
      const response = await fetch('http://localhost:8080/api/v1/dalle',{
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body :JSON.stringify({prompt})
      })
      const data = await response.json();
      handleDecals(type,`data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
      
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {//takes the tab name as a parameter
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]; //manages whether to load Decal only as a logo
        //or to render it throughout the entire screen
        break;
    
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }
    setActiveFilterTab((prevState)=>{
     return {
      ...prevState,
      [tabName]: !prevState[tabName]
     }
    })
  }
  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  return ( 
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className="editortabs-containertabs">
                {EditorTabs.map((tab => (
                  <Tab//imported from constants.js
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />

                )))}
                {generateTabContent(activeEditorTab)}
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute z-10 top-5 right-5" {...slideAnimation('left')}>
            <CustomButton
              title='Go Back'
              type='filled'
              handleClick={() => { state.intro = true }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name) }
              />
            ))
            }

          </motion.div>
        </>

      )

      }
    </AnimatePresence>
  )
}

export default Customizer;

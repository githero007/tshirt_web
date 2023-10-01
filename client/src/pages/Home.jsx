import React from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import state from '../store'
import { useSnapshot } from 'valtio'; 
import {headContainerAnimation,
    headTextAnimation,
    headContentAnimation,
    slideAnimation} from '../config/motion'
import { CustomButton } from '../componennts';

const Home = () => {
    const snap = useSnapshot(state);
  return (
   <AnimatePresence>
      {snap.intro && (
        <motion.section className = "home" {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
           <img src="./threejs.png" alt="logo" className="w-8 h-8 object contain" />
            </motion.header>
              <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div className="head-text"  {...headTextAnimation}>
                LETS <br className= "xl:blockhidden" />BUILD SOMETHING
              </motion.div>
              <motion.div className = 'flex flex-col gap-5'   {...headContentAnimation}>
                <p className='max-w-md font-normal text-grey-600'>
                  Create a unique t-shirt design with  3d customization tool.<strong>Explore your creativity</strong> and have fun.
                </p>
                <CustomButton 
                  type = "filled"
                  title = "Customize it"
                  handleClick = {()=>{state.intro = false}}
                  customStyles = "w-fit px-4 py-2.5 font-bold text-sm" />
              </motion.div>
              </motion.div>
        </motion.section>
      )}
   </AnimatePresence>

  )
}

export default Home
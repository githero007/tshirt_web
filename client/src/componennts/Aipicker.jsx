import React from 'react'
import CustomButton from './CustomButton'
const Aipicker = ({prompt,setPrompt,generatingImage,handleSubmit}) => {
  return (
    <div className= "aipickercontianer">
    <textarea
    className="ai-picker text area"
    rows = "5"
    value = {prompt}
    onChange = {(e)=>setPrompt(e.target.value)}
    placeholder="Ask AI(this feature is currently disabled because there is
      some issue going on with OpenAI api)"
    />
    <div className="flex flex-wrap gap-3">
      {generatingImage?(
        <CustomButton
        type ="outline"
        title = "Asking AI"
        customStyles="text-xs"
        />
      ):(
      <><CustomButton
        type = "outline"
        title = "AI  logo"
        handleClick={()=>handleSubmit('logo')}
        customStyles="text-xs"
        />
        <CustomButton
        type = "filled"
        title = "AI  full"
        handleClick={()=>handleSubmit('full ')}
        customStyles="text-xs"
        />
        </>)
      
      
      
}
    </div>
    
    
    
    </div>
      

    )
}

export default Aipicker
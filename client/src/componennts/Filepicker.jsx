import React from 'react'
import CustomButton from './CustomButton'

const Filepicker = ({file,setFile,readFile}) => {
  return (
    <div className="filepicker-container">
   <div className= "flex-1 flex flex-col">
    <input
    id = "file-upload"
    type = "file"//specify file as input type
    accept = "image/*"//accepting only the images
    onChange={(e)=> setFile(e.target.files[0])}
    />
    <label htmlFor = "file-upload" className="filepicker-label">Upload file</label>
      <p>
        {file === ''?'No file selected':file.name}
      </p>
      <div className="mt-4 flex-wrap gap-34">
        <CustomButton
        type = "outline"
        title = "logo"
        handleClick={()=>readFile('logo')}
        customStyles= "text-xs "
        />
           <CustomButton
        type = "filled"
        title = "full"
        handleClick={()=>readFile('full')}
        customStyles= "text-xs "
        />

      </div>
      </div>
      </div>
  )
}

export default Filepicker
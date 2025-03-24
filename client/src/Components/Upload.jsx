import { useState } from "react"

const Upload=()=>{
    const [filePath,setFilePath]=useState(null)
  return ( <>
  < img src={__dirname+filePath}  style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#4CAF50',
        color: 'white',
      }}/>
    <div>upload file</div>
    <input type="file" onChange={(e)=>{
        setFilePath(e.target?.files[0])
        console.log(filePath)
    }}/>
    </>)
}
export default Upload
import React, { useState } from 'react'
import TestUploadCard from "../components/testUploadCard"
export default function TestUploadPage() {
   const [file,setFile]=useState("")

  return (
    
        <div>
        <TestUploadCard  />
      </div>
      
    
  )
}

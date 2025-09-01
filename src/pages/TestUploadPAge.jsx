import React, { useState } from 'react'
import TestUploadCard from "../components/testUploadCard"
import FileTextCard from '../components/FileTextCard'
export default function TestUploadPage() {
   const [file,setFile]=useState("")

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Quiz</h1>
          <p className="text-gray-600">Create and upload a new quiz</p>
        </div>
        <TestUploadCard setFile={setFile} />
      </div>
      <FileTextCard file={file} />
    </div>
  )
}

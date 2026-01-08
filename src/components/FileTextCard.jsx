import React, { useEffect, useState } from 'react';
import { Upload, FileText, Save, CheckCircle, AlertCircle } from 'lucide-react';
import {Fileparser} from "../../utils/fileTotext"
const QuizUploadCard = ({file}) => {
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };
  useEffect(()=>{
    async function FileTOtext() {
        try {
         const data=   await file.text();
         setFileContent(data)
         
         
        } catch (error) {
            
        }
    }
    FileTOtext()
  },[file])

  const handleSave = () => {
    if (!fileContent.trim()) {
      
      showNotification('Please add some content before saving', 'error');
      return;
    }

    
    
    showNotification('Quiz content saved successfully!', 'success');
  };

  const handleContentChange = (e) => {
    setFileContent(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      

    
       
              
            
                
                
                
             

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Quiz Questions Content
                </label>
                {isLoading && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                )}
              </div>
              
              <textarea
                value={fileContent}
                onChange={handleContentChange}
                placeholder="Upload a file or paste your quiz questions here in this format:

Q1: What is the capital of Japan?
a) Seoul
b) Tokyo
c) Beijing
d) Bangkok
Answer: Tokyo

Q2: What is the square root of 81?
a) 7
b) 8
c) 9
d) 10
Answer: 9"
                className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
              />
              
              <p className="text-xs text-gray-500 mt-2">
                You can edit the content directly in this text area after uploading a file
              </p>
            </div>

            {/* Save Button */}
            {/* <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={!fileContent.trim() || isLoading}
                className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  fileContent.trim() && !isLoading
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-5 h-5" />
                <span>Save Quiz</span>
              </button>
            </div> */}
          </div>
        
  );
};

export default QuizUploadCard;
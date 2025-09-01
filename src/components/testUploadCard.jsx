import React, { useState } from 'react';
import { Upload, Save, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const QuizUploadPage = ({setFile}) => {
  const [formData, setFormData] = useState({
    testId: '',
    testName: '',
    testSubject: '',
    questions: 0
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'testId' || name === 'questions' ? parseInt(value) || '' : value
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file)
    setUploadedFile(file);
    
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      
      if (Array.isArray(parsed)) {
        setFormData(prev => ({ ...prev, questions: parsed.length }));
        showNotification('File uploaded successfully!', 'success');
      }
    } catch (error) {
      showNotification('Error parsing file', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    
    try {
      const quizData = {
        ...formData,
        test: uploadedFile 
      };

      console.log('Submitting quiz data:', quizData);
      
      const uploadFormData = new FormData();
      uploadFormData.append("testId", quizData.testId);
      uploadFormData.append("testName", quizData.testName);
      uploadFormData.append("testSubject", quizData.testSubject);
      uploadFormData.append("file", uploadedFile); 
      uploadFormData.append("questions",quizData.questions)
      
      

      // Example: send to backend
      await axios.post(`${import.meta.env.VITE_backend_Url}/api/questions`, uploadFormData)

      showNotification('Quiz uploaded successfully!', 'success');
      
      // Reset form
      setFormData({
        testId: '',
        testName: '',
        testSubject: '',
        questions: 0
      });
      setUploadedFile(null);
      
    } catch (error) {
      showNotification('Error uploading quiz', 'error');
    }
    
    setIsLoading(false);
  };

  const isFormValid = formData.testId && formData.testName && uploadedFile;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Quiz Details Card */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">Quiz Details</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Test ID and Subject */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test ID *
            </label>
            <input
              type="number"
              name="testId"
              value={formData.testId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter test ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
           <select
        name="testSubject"
        value={formData.testSubject}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      >
        <option value="">Select subject</option>

        <option value="mathematics">Mathematics</option>
        <option value="science">Science</option>
        <option value="english">English</option>
        <option value="programming">Programming</option>
        <option value="social">Social Studies</option>
        <option value="other">Other</option>
      </select>

      {formData.testSubject === "other" && (
        <input
          type="text"
          name="testSubject"
          value={formData.testSubjectCustom || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              testSubjectCustom: e.target.value,
            }))
          }
          placeholder="Enter your custom subject"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      )}
          </div>
        </div>

        {/* Test Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Name *
          </label>
          <input
            type="text"
            name="testName"
            value={formData.testName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter test name"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Questions File *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-2">JSON or CSV format</p>
            
            {uploadedFile && (
              <div className="mt-3 text-sm text-green-600">
                ✓ {uploadedFile.name} uploaded
              </div>
            )}
          </div>
        </div>

        {/* Questions Count */}
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Number of Questions
  </label>
  <input
    type="number"
    name="questions"
    value={formData.questions}
    onChange={handleInputChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    readOnly={!!uploadedFile} // user can type only if file not uploaded
  />
</div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
              isFormValid && !isLoading
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Upload Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`mt-4 mx-6 p-3 rounded-lg text-sm ${
            notification.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default QuizUploadPage;

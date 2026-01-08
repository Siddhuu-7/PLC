import React, { useState, useEffect } from 'react'

export default function VerifyPage() {
  const [showNotification, setShowNotification] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)

  // Simulate user signup detection
  useEffect(() => {
    // Check if user just signed up (you can replace this with actual logic)
    const userJustSignedUp = Math.random() > 0.5 // Random for demo
    if (userJustSignedUp) {
      setIsSignedUp(true)
      setShowNotification(true)
      // Auto hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    }
  }, [])

  const handleCloseNotification = () => {
    setShowNotification(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-pulse">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Thanks for signup! Wait until you're verified by our team</span>
          <button 
            onClick={handleCloseNotification}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      <div className="max-w-4xl w-full">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-6">
          <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Verification</h1>
          <p className="text-gray-600">Your account is being reviewed by our team</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800">
                  Verification Pending
                </h3>
                <div className="mt-2 text-yellow-700">
                  <p>Your account is currently under review by our verification team. This process typically takes 24-48 hours during business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Verification Process</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Review Submitted</h4>
              <p className="text-sm text-gray-600">Our team reviews your submitted information and documents</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Email Notification</h4>
              <p className="text-sm text-gray-600">You'll receive an email once verification is complete</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Account Activated</h4>
              <p className="text-sm text-gray-600">Full access to your account will be granted upon approval</p>
            </div>
          </div>
        </div>

        {/* Important Information Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Information</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <p className="text-gray-600">Check your email regularly for updates on your verification status</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <p className="text-gray-600">Verification is typically completed within 24-48 hours during business days</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <p className="text-gray-600">Your account access will be restored automatically once approved</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <p className="text-gray-600">Please ensure all submitted documents are clear and legible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function AdminUserManagement() {
  const [partialUsers, setPartialUsers] = useState([])
  const [verifiedUsers, setVerifiedUsers] = useState([])
  const [activeTab, setActiveTab] = useState('partial') 
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  useEffect(() => {
    async function getDetails(params) {
        try {
               const res =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/partialusers`);
              const mockPartialUsers=res.data.data

            const verfiyres=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/verifyeduser`)
             const mockVerifiedUsers =verfiyres.data.data

    setPartialUsers(mockPartialUsers)
    setVerifiedUsers(mockVerifiedUsers)
        } catch (error) {
            
        }
    }
    getDetails()
  }, [])

  const showNotificationMessage = (message) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

 const handleVerifyUser = async (userId) => {
  const userToVerify = partialUsers.find(user => user.id === userId);
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_backend_Url}/api/admin/verify?verify=true&registerNumber=${userId}`
    );
    console.log(res.data);
    if (userToVerify) {
      setPartialUsers(partialUsers.filter(user => user.id !== userId));

      setVerifiedUsers([...verifiedUsers, userToVerify]);

      showNotificationMessage("User verified successfully!");
    }
  } catch (error) {
    console.error("Verify error:", error);
    showNotificationMessage("Failed to verify user!");
  }
};


  const handleDeleteUser = async(userId, userType) => {
    try {
        if (userType === 'partial') {
      const res=  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete?registerNumber=${userId}`)
      console.log(res.data)
      setPartialUsers(partialUsers.filter(user => user.id !== userId))
    } else {
        const res=  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete?registerNumber=${userId}`)
      console.log(res.data)
      setVerifiedUsers(verifiedUsers.filter(user => user.id !== userId))
    }
    showNotificationMessage('User deleted successfully!')
    } catch (error) {
        
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const UserCard = ({ user, userType }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500">{user.registerNumber}</p>
            </div>
            {userType === 'partial' ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending Verification
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Branch:</span>
              <p className="text-gray-600">{user.branch}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Year:</span>
              <p className="text-gray-600">{user.year}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Mobile:</span>
              <p className="text-gray-600">{user.mobileNumber}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <p className="text-gray-600">{user.gmail}</p>
            </div>
          </div>
          
          <div className="mt-3">
            <span className="font-medium text-gray-700">Courses:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.courses.map((course, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                  {course}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-500">
            Registered: {formatDate(user.createdAt)}
          </div>
        </div>
        
        <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-3">
          {userType === 'partial' ? (
            <>
              <button
                onClick={() => handleVerifyUser(user.registerNumber)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Verify User
              </button>
              <button
                onClick={() => handleDeleteUser(user.registerNumber, 'partial')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => handleDeleteUser(user.registerNumber, 'verified')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Delete User
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">{notificationMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage user registrations and verifications</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{partialUsers.length}</div>
                  <div className="text-gray-600">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{verifiedUsers.length}</div>
                  <div className="text-gray-600">Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{partialUsers.length + verifiedUsers.length}</div>
                  <div className="text-gray-600">Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('partial')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'partial'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Verification ({partialUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('verified')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'verified'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Verified Users ({verifiedUsers.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {activeTab === 'partial' && (
            <>
              {partialUsers.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Users</h3>
                  <p className="text-gray-600">All users have been verified!</p>
                </div>
              ) : (
                partialUsers.map(user => (
                  <UserCard key={user.id} user={user} userType="partial" />
                ))
              )}
            </>
          )}

          {activeTab === 'verified' && (
            <>
              {verifiedUsers.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Verified Users</h3>
                  <p className="text-gray-600">No users have been verified yet.</p>
                </div>
              ) : (
                verifiedUsers.map(user => (
                  <UserCard key={user.id} user={user} userType="verified" />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
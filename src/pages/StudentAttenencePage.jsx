import  { useState, useEffect } from 'react';
import { Calendar, Clock, Send, Loader, ArrowLeft, CheckCircle } from 'lucide-react';
import UserCard from '../components/UserCard';
import UserDetailsModal from '../components/UserDetailsModal';
import axios from 'axios';

const AttendancePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function userPic(registerNumber) {
      try {
        const buffer = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/pics/?registerNumber=${registerNumber}`,
          { responseType: 'arraybuffer' }
        );

        const base64 = btoa(
          new Uint8Array(buffer.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return `data:image/jpeg;base64,${base64}`;
      } catch (error) {
        console.error("Error fetching user pic:", error);
      }
    }

    async function UserDetails() {
      try {
        const apiResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/details`
        );

        const formattedUsers = await Promise.all(
          apiResponse.data.data.map(async (user) => {
            const img = await userPic(user.registerNumber);

            return {
              ...user,
              userImg: img,
              courses: user.courses.map((course) => ({
                name: course,
                code: '',
                credits: '',
              })),
              attendanceStatus: null,
            };
          })
        );

        setUsers(formattedUsers);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    }
    UserDetails();
  }, []);

  const handleUpdateAttendance = (userId, status) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, attendanceStatus: status } : user
      )
    );
  };
useEffect(()=>{
  async function isposted() {
    try {
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/isPosted`)
      if(res.data.msg){
        setIsSubmitted(true)
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  isposted()
},[])
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const hasMarkedAttendance = users.some(user => user.attendanceStatus !== null);

  const prepareAttendanceData = () => {
    return {
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      attendanceRecords: users
        .filter(user => user.attendanceStatus !== null)
        .map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          registerNumber: user.registerNumber,
          branch: user.branch,
          year: user.year,
          attendanceStatus: user.attendanceStatus,
          mobileNumber: user.mobileNumber,
        })),
    };
  };

  const handleSubmitAttendance = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const attendanceData = prepareAttendanceData();
      console.log('Sending attendance data to server:', attendanceData);

      for (const record of attendanceData.attendanceRecords) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/attendence`, {
          registerNumber: record.registerNumber,
          classattend: record.attendanceStatus === 'present' ? 1 : 0,
        });
      }
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/updateclass`)
      setSubmitMessage('Attendance submitted successfully!');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setSubmitMessage('Error submitting attendance. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  };

  const markedCount = users.filter(user => user.attendanceStatus !== null).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Student Attendance</h1>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              <Clock className="w-5 h-5 ml-4 mr-2" />
              {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Marked: {markedCount}/{users.length}
              </p>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(markedCount / users.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onUpdateAttendance={handleUpdateAttendance}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        {hasMarkedAttendance && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
            <div className="bg-white rounded-lg shadow-lg border p-4 min-w-96">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {isSubmitted ? 'Attendance Submitted' : 'Ready to Submit'}
                  </p>
                  <p className="text-sm text-gray-600">{markedCount} students marked</p>
                </div>
                
                {isSubmitted ? (
                  <div className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submitted
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitAttendance}
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Attendance
                      </>
                    )}
                  </button>
                )}
              </div>

              {submitMessage && (
                <div
                  className={`text-sm px-3 py-2 rounded-md ${
                    submitMessage.includes('Error')
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        )}

        {/* User Modal */}
        <UserDetailsModal user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default AttendancePage;
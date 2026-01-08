import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Register";
import Home from "./Home";
import Login from "./pages/Login";
import Landingpage from "./Landingpage";
import ProfilePage from "./pages/profilePage";
import MCQSpage from './pages/MCQSpage'
import TestUploadPAge from "./pages/TestUploadPAge";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminSignUpPage from "./pages/AdminSignUpPage";
import AdminForgotPasswordPage from "./pages/AdminForgotPasswordPage";
import AdminHomePage from "./pages/AdminHomePage"
import AdminProfile from "./pages/AdminProfilePage";
import AttendancePage from "./pages/StudentAttenencePage"
import StudentsDashboard from './pages/StudentsDashboard'
import StudentResource from "./pages/StudentResource";
import ResourceSharingPage from "./pages/ResourceSharePage";
import StudentDashboard from "./pages/StudentDashBoard";
import LiveTest from "./pages/LiveTest";
import AnnouncementsPage from "./pages/Announcements";
import VerifyPage from "./pages/verfiyPage";
import AdminUserManagement from "./pages/AdminStudentMangement";
import PollPage from "./pages/PollPage"
function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Landingpage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/mcqs" element={<MCQSpage/>}/>
      <Route  path="/admin/upload" element={<TestUploadPAge/>}/>
      <Route path="/admin/login" element={<AdminLoginPage/>}/>
      <Route path="/admin/signup" element={<AdminSignUpPage/>}/>
      <Route path="/notice" element={<AdminForgotPasswordPage/>}/>
      <Route path="/admin/home" element={<AdminHomePage/>}/>
      <Route path="/admin/profile" element={<AdminProfile/>}/>
      <Route path="/attendence" element={<AttendancePage/>}/>
      <Route path="/admin/resourcesahre" element={<ResourceSharingPage/>}/>
      <Route path="/student/analytics" element={<StudentsDashboard/>}/>
      <Route path="/student/resource" element={<StudentResource/>}/>
      <Route path="/student/dashboard" element={<StudentDashboard/>}/>
      <Route path="/admin/announcements" element={<AnnouncementsPage/>}/>
      <Route path="/students/livetest" element={<LiveTest/>}/>
      <Route path="/verfiy" element={<VerifyPage/>}/>
      <Route path="/admin/AdminStudentManagement" element={<AdminUserManagement/>}/>
      <Route path="/vote" element={<PollPage/>}/>
    </Routes>
  );
}

export default App;

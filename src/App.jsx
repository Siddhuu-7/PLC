import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./Home";
import Login from "./pages/Login";
import Landingpage from "./Landingpage";
import Loading from "./pages/LoadingPage";
import ProfilePage from "./pages/profilePage";
import MCQSpage from './pages/MCQSpage'
import TestUploadPAge from "./pages/TestUploadPAge";
function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/landingpage" element={<Landingpage />} />
      <Route path="/" element={<Loading/>}/>
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/mcqs" element={<MCQSpage/>}/>
      <Route  path="/upload" element={<TestUploadPAge/>}/>
    </Routes>
  );
}

export default App;

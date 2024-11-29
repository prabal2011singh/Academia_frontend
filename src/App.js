import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SpecializationCourses from './pages/SpecializationCourses';
import SpecializationPage from './pages/SpecializationPage';
import Navbar from './components/Navbar';
import { useState,useEffect } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token); //it converts to boolean => if token is present, !token converts to false and then !!token converts to true,
      //or else if token is NULL then !token converts to true and then !!token converts to false.
    }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/specializations" element={isLoggedIn ? <SpecializationPage /> : <Navigate to="/login" />} />
        <Route path="/specializations/:id/courses" element={isLoggedIn ? <SpecializationCourses /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

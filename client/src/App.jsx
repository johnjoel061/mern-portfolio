import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { CssBaseline } from '@mui/material';

import Homepage from './pages/Menu/Homepage';
import Login from './pages/Account/Login';
import ForgotPassword from './pages/Account/ForgotPassword';
import Topbar from './pages/global/Topbar';
import AdminSidebar from './pages/Dashboard/AdminSidebar';
import User from './pages/Menu/User';
import Skills from './pages/Menu/Skills';
import Experience from './pages/Menu/Experience';
import Education from './pages/Menu/Education';
import Certification from './pages/Menu/Certification';
import Portfolio from './pages/Menu/Portfolio';
import Testimonial from './pages/Menu/Testimonial';


const App = () => {
  const { isAuthenticated, userData } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Function to determine where to redirect based on user role
  const getRedirectPath = () => {
    if (userData.role === 'ADMIN') return '/user';
    return '/';
  };

  return (
    <Router>
      <CssBaseline />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {isAuthenticated && userData.role === 'ADMIN' && (
          <AdminSidebar className="sidebar" isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        )}

        <main style={{ flexGrow: 1, overflowX: 'hidden', backgroundColor: '#FAFAFA' }}>
          {isAuthenticated && <Topbar setIsSidebar={setIsSidebarCollapsed} className="topbar" />}
          <Routes>
            {/* Redirect logged-in users from the login page */}
            <Route path="/login" element={isAuthenticated ? <Navigate to={getRedirectPath()} /> : <Login />} />
            <Route path="/" element={!isAuthenticated ? <Homepage /> : <Navigate to={getRedirectPath()} />} />
            <Route path="/user" element={isAuthenticated && userData.role === 'ADMIN' ? <User /> : <Navigate to="/" />} />
            <Route path="/skills" element={isAuthenticated && userData.role === 'ADMIN' ? <Skills /> : <Navigate to="/" />} />
            <Route path="/experience" element={isAuthenticated && userData.role === 'ADMIN' ? <Experience /> : <Navigate to="/" />} />
            <Route path="/education" element={isAuthenticated && userData.role === 'ADMIN' ? <Education /> : <Navigate to="/" />} />
            <Route path="/certifications" element={isAuthenticated && userData.role === 'ADMIN' ? <Certification /> : <Navigate to="/" />} />
            <Route path="/portfolio" element={isAuthenticated && userData.role === 'ADMIN' ? <Portfolio /> : <Navigate to="/" />} />
            <Route path="/testimonials" element={isAuthenticated && userData.role === 'ADMIN' ? <Testimonial /> : <Navigate to="/" />} />

            {/* FORGOT PASSWORD SECTION */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

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
import PendingSchedule from './pages/Menu/PendingSchedule';
// import ApprovedSchedule from './pages/Menu/ApprovedSchedule';
import DisapprovedSchedule from './pages/Menu/DisapprovedSchedule';

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
            <Route path="/pending-schedule" element={isAuthenticated && userData.role === 'ADMIN' ? <PendingSchedule /> : <Navigate to="/" />} />
            {/* <Route path="/approved-schedule" element={isAuthenticated && userData.role === 'ADMIN' ? <ApprovedSchedule /> : <Navigate to="/" />} /> */}
            <Route path="/disapproved-schedule" element={isAuthenticated && userData.role === 'ADMIN' ? <DisapprovedSchedule /> : <Navigate to="/" />} />
            
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

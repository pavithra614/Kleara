import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AgeVerification from './pages/AgeVerification';
import VerificationStatus from './pages/VerificationStatus';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Authentication routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Main application */}
          <Route path="/home" element={<Home />} />

          {/* Verification flow */}
          <Route path="/age-verification" element={<AgeVerification />} />
          <Route path="/verification-status" element={<VerificationStatus />} />

          {/* Admin dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Default redirect to sign in */}
          <Route path="/" element={<Navigate to="/signin" replace />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

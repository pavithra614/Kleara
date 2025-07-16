import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AgeVerification from './pages/AgeVerification';
import VerificationStatus from './pages/VerificationStatus';
import AdminDashboard from './pages/AdminDashboard';
import SpeechPractice from './pages/SpeechPractice';
import ArticulationHub from './pages/ArticulationHub';
import HearingPractice from './pages/HearingPractice';
import AuditoryAwarenessHub from './pages/AuditoryAwarenessHub';
import { SoundSafari, BuildAWordLab, MagicMirror, SoundSorter, KnightOfSounds } from './components/speech-practice';
import { SoundHideAndSeek } from './components/hearing-practice';

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

          {/* Speech Practice Routes */}
          <Route path="/speech-practice" element={<SpeechPractice />} />
          <Route path="/speech-practice/articulation" element={<ArticulationHub />} />
          <Route path="/speech-practice/articulation/sound-safari" element={<SoundSafari />} />
          <Route path="/speech-practice/articulation/build-word-lab" element={<BuildAWordLab />} />
          <Route path="/speech-practice/articulation/magic-mirror" element={<MagicMirror />} />
          <Route path="/speech-practice/articulation/sound-sorter" element={<SoundSorter />} />
          <Route path="/speech-practice/articulation/knight-sounds" element={<KnightOfSounds />} />

          {/* Hearing Practice Routes */}
          <Route path="/hearing-practice" element={<HearingPractice />} />
          <Route path="/hearing-practice/auditory-awareness" element={<AuditoryAwarenessHub />} />
          <Route path="/hearing-practice/auditory-awareness/sound-hide-seek" element={<SoundHideAndSeek />} />

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

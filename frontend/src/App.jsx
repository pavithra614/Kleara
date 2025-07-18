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
import SignLanguagePractice from './pages/SignLanguagePractice';
import BasicSignsLesson from './pages/BasicSignsLesson';
import SocialSkillsPlatform from './pages/SocialSkillsPlatform';
import FindTherapists from './pages/FindTherapists';
import TherapistProfile from './pages/TherapistProfile';
import BookTherapist from './pages/BookTherapist';
import MyTherapist from './pages/MyTherapist';
import TherapistChat from './pages/TherapistChat';
import TherapistVideo from './pages/TherapistVideo';
import TherapistApplication from './pages/TherapistApplication';
import TherapistApplicationStatus from './pages/TherapistApplicationStatus';
import AdminTherapistReview from './pages/AdminTherapistReview';
import EnterpriseApplication from './pages/EnterpriseApplication';
import { SoundSafari, BuildAWordLab, MagicMirror, SoundSorter, KnightOfSounds } from './components/speech-practice';
import { SoundHideAndSeek } from './components/hearing-practice';
import { GestureRecognition } from './components/sign-language';
import {
  SignToPost,
  SymbolExpression,
  TextToSignTranslator,
  SmartSuggestions,
  SignMoments,
  ExpressionBuilder,
  TranslateWall,
  LearningProgress,
  SignOfTheDay,
  PracticeMode,
  PersonalizedLessons,
  ExpressionFeed,
  ReactionsSystem,
  PrivateMessages,
  GroupBoards,
  SignFeedback,
  EmotionDetection,
  SuggestionsPanel
} from './components/social-skills';

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

          {/* Sign Language Practice Routes */}
          <Route path="/sign-language" element={<SignLanguagePractice />} />
          <Route path="/sign-language/basic-signs" element={<BasicSignsLesson />} />

          {/* Social Skills Platform Routes */}
          <Route path="/social-skills" element={<SocialSkillsPlatform />} />

          {/* Expression Creation Routes */}
          <Route path="/social-skills/sign-to-post" element={<SignToPost />} />
          <Route path="/social-skills/symbol-expression" element={<SymbolExpression />} />
          <Route path="/social-skills/text-to-sign" element={<TextToSignTranslator />} />
          <Route path="/social-skills/smart-suggestions" element={<SmartSuggestions />} />
          <Route path="/social-skills/sign-moments" element={<SignMoments />} />
          <Route path="/social-skills/expression-builder" element={<ExpressionBuilder />} />
          <Route path="/social-skills/translate-wall" element={<TranslateWall />} />

          {/* Learning & Personal Growth Routes */}
          <Route path="/social-skills/learning-progress" element={<LearningProgress />} />
          <Route path="/social-skills/sign-of-day" element={<SignOfTheDay />} />
          <Route path="/social-skills/practice-mode" element={<PracticeMode />} />
          <Route path="/social-skills/personalized-lessons" element={<PersonalizedLessons />} />

          {/* Social & Interaction Routes */}
          <Route path="/social-skills/expression-feed" element={<ExpressionFeed />} />
          <Route path="/social-skills/reactions" element={<ReactionsSystem />} />
          <Route path="/social-skills/private-messages" element={<PrivateMessages />} />
          <Route path="/social-skills/group-boards" element={<GroupBoards />} />

          {/* AI Tools & Feedback Routes */}
          <Route path="/social-skills/sign-feedback" element={<SignFeedback />} />
          <Route path="/social-skills/emotion-detection" element={<EmotionDetection />} />
          <Route path="/social-skills/suggestions-panel" element={<SuggestionsPanel />} />

          {/* Therapist Routes - Only for therapist-guided mode */}
          <Route path="/find-therapists" element={<FindTherapists />} />
          <Route path="/therapists/:id/profile" element={<TherapistProfile />} />
          <Route path="/therapists/:id/book" element={<BookTherapist />} />
          <Route path="/my-therapist" element={<MyTherapist />} />
          <Route path="/therapists/:id/chat" element={<TherapistChat />} />
          <Route path="/therapists/:id/video" element={<TherapistVideo />} />

          {/* Therapist Application Routes */}
          <Route path="/work-as-therapist" element={<TherapistApplication />} />
          <Route path="/therapist-application-status" element={<TherapistApplicationStatus />} />

          {/* Enterprise Application Routes */}
          <Route path="/enterprise-application" element={<EnterpriseApplication />} />

          {/* Test route for debugging */}
          <Route path="/test-route" element={<div style={{padding: '20px'}}><h1>Test Route Works!</h1><p>If you can see this, routing is working fine.</p></div>} />

          {/* Verification flow */}
          <Route path="/age-verification" element={<AgeVerification />} />
          <Route path="/verification-status" element={<VerificationStatus />} />

          {/* Admin dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/therapist-applications" element={<AdminTherapistReview />} />

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

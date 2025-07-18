import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// UI Components
import {
  Header,
  ProgressCard,
  CommunicationSkillsCard,
  AchievementsCard
} from '../components/ui';

// Therapy Components
import {
  TherapyMethodToggle,
  TherapyActivitiesCard
} from '../components/therapy';

// Dashboard Components
import {
  HealthReportsCard,
  RecentSessionsCard,
  AITranslationHubCard,
  TherapistConnectionCard,
  TherapistNavigationCard,
  WorkAsTherapistCard,
  EnterprisePackageCard
} from '../components/dashboard';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Uvindu Thamodya',
    age: 16,
    therapyLevel: 'Intermediate',
    totalProgress: 68,
    mode: 'Therapist-guided' // or 'Self-guided'
  });

  // Toggle state for therapist-guided users (self-guided vs therapist-supervised)
  const [therapyMethod, setTherapyMethod] = useState('self-guided'); // 'self-guided' or 'therapist-supervised'

  // Health reports data for therapist-guided users
  const [healthReports] = useState({
    weeklyProgress: {
      speechTherapy: { sessions: 12, avgScore: 85, improvement: '+15%' },
      signLanguage: { sessions: 8, avgScore: 78, improvement: '+12%' },
      literacy: { sessions: 10, avgScore: 92, improvement: '+8%' },
      socialSkills: { sessions: 6, avgScore: 73, improvement: '+18%' }
    },
    recentAssessments: [
      {
        id: 1,
        date: '2024-01-15',
        type: 'Speech Clarity Assessment',
        score: 88,
        status: 'Improved',
        therapistNotes: 'Significant improvement in consonant pronunciation'
      },
      {
        id: 2,
        date: '2024-01-12',
        type: 'Sign Language Fluency',
        score: 82,
        status: 'Stable',
        therapistNotes: 'Consistent performance, ready for advanced vocabulary'
      },
      {
        id: 3,
        date: '2024-01-10',
        type: 'Reading Comprehension',
        score: 94,
        status: 'Excellent',
        therapistNotes: 'Outstanding progress in complex sentence understanding'
      }
    ],
    therapistRecommendations: [
      'Increase speech practice sessions to 3x per week',
      'Focus on complex sign language sentence structures',
      'Continue current reading comprehension exercises'
    ]
  });

  const [communicationSkills] = useState({
    speechTherapy: { level: 7, progress: 75, nextMilestone: 'Clear consonant sounds' },
    signLanguage: { level: 5, progress: 60, nextMilestone: 'Complex sentence structure' },
    literacy: { level: 6, progress: 80, nextMilestone: 'Reading comprehension' },
    socialSkills: { level: 4, progress: 45, nextMilestone: 'Group conversation' }
  });

  const [recentSessions] = useState([
    { id: 1, activity: 'Speech Practice', type: 'Pronunciation', progress: '+12%', time: '2h ago', status: 'completed' },
    { id: 2, activity: 'Sign Language', type: 'Vocabulary', progress: '+8%', time: '1d ago', status: 'completed' },
    { id: 3, activity: 'Reading Game', type: 'Comprehension', progress: '+15%', time: '2d ago', status: 'completed' }
  ]);

  const [achievements] = useState([
    { id: 1, name: 'First Words', category: 'Speech', unlocked: true, description: 'Completed first speech exercise' },
    { id: 2, name: 'Sign Master', category: 'Sign Language', unlocked: true, description: 'Learned 50 sign language words' },
    { id: 3, name: 'Reading Star', category: 'Literacy', unlocked: false, description: 'Complete 10 reading activities' },
    { id: 4, name: 'Social Skills', category: 'Social', unlocked: false, description: 'Join 5 group activities' }
  ]);

  const handleSignOut = () => {
    // In a real app, you would clear authentication tokens, etc.
    navigate('/signin');
  };

  const handleTherapyMethodChange = (method) => {
    setTherapyMethod(method);
  };

  const handleViewHealthReports = () => {
    // Handle health reports view
    console.log('View health reports');
  };

  const handleFindTherapists = () => {
    navigate('/find-therapists');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header user={user} therapyMethod={therapyMethod} onSignOut={handleSignOut} />

      {/* Therapy Method Toggle - Only show for therapist-guided users */}
      {user.mode === 'Therapist-guided' && (
        <TherapyMethodToggle 
          therapyMethod={therapyMethod}
          onMethodChange={handleTherapyMethodChange}
          onViewHealthReports={handleViewHealthReports}
        />
      )}

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Progress & Skills */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressCard user={user} />
            <CommunicationSkillsCard communicationSkills={communicationSkills} />
            <AchievementsCard achievements={achievements} />
          </div>

          {/* Right Column - Therapy Activities & Recent Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Therapist Navigation - Only for Therapist-guided mode */}
            {user.mode === 'Therapist-guided' && (
              <TherapistNavigationCard user={user} therapyMethod={therapyMethod} />
            )}

            {/* Health Reports Section - Only for Therapist-supervised mode */}
            {user.mode === 'Therapist-guided' && therapyMethod === 'therapist-supervised' && (
              <HealthReportsCard healthReports={healthReports} />
            )}

            <TherapyActivitiesCard user={user} therapyMethod={therapyMethod} />
            <RecentSessionsCard recentSessions={recentSessions} />
            <AITranslationHubCard />

            {/* Work as Therapist Card - Show for all users */}
            <WorkAsTherapistCard user={user} />

            {/* Enterprise Package Card - Show for all users */}
            <EnterprisePackageCard user={user} />

            {/* Keep the original connection card for backup/additional info */}
            <TherapistConnectionCard user={user} therapyMethod={therapyMethod} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

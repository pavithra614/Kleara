import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock, 
  FiMessageCircle, 
  FiVideo,
  FiUser,
  FiStar,
  FiPhone,
  FiMail,
  FiActivity,
  FiTrendingUp,
  FiCheckCircle
} from 'react-icons/fi';

const MyTherapist = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for booked therapist
  const therapistData = {
    id: 1,
    name: 'Dr. Shanika Madumali',
    specialty: 'Speech-Language Pathology',
    image: '/speech_therapy.jpg',
    rating: 4.9,
    experience: '8 years',
    nextSession: {
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Individual Session',
      duration: '1 hour'
    },
    monthlyPackage: {
      totalHours: 30,
      usedHours: 12,
      remainingHours: 18,
      renewalDate: '2024-02-15'
    },
    recentSessions: [
      {
        id: 1,
        date: '2024-01-15',
        time: '10:00 AM',
        duration: '1 hour',
        type: 'Individual',
        status: 'Completed',
        notes: 'Great progress on articulation exercises'
      },
      {
        id: 2,
        date: '2024-01-12',
        time: '2:00 PM',
        duration: '1 hour',
        type: 'Individual',
        status: 'Completed',
        notes: 'Worked on speech clarity and pronunciation'
      },
      {
        id: 3,
        date: '2024-01-08',
        time: '10:00 AM',
        duration: '1 hour',
        type: 'Individual',
        status: 'Completed',
        notes: 'Introduction session and assessment'
      }
    ],
    upcomingSessions: [
      {
        id: 4,
        date: '2024-01-20',
        time: '10:00 AM',
        duration: '1 hour',
        type: 'Individual',
        status: 'Scheduled'
      },
      {
        id: 5,
        date: '2024-01-22',
        time: '2:00 PM',
        duration: '1 hour',
        type: 'Individual',
        status: 'Scheduled'
      }
    ],
    progressStats: {
      sessionsCompleted: 12,
      averageRating: 4.8,
      improvementScore: 85,
      goalsAchieved: 7
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleStartChat = () => {
    navigate(`/therapists/${therapistData.id}/chat`);
  };

  const handleVideoCall = () => {
    navigate(`/therapists/${therapistData.id}/video`);
  };

  const handleBookNewSession = () => {
    navigate(`/therapists/${therapistData.id}/book`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your therapist dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Therapist</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Therapist Info & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Therapist Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-center mb-6">
                <img
                  src={therapistData.image}
                  alt={therapistData.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
                />
                <h2 className="text-xl font-bold text-gray-900">{therapistData.name}</h2>
                <p className="text-blue-600 font-medium">{therapistData.specialty}</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{therapistData.rating}</span>
                  <span className="text-sm text-gray-500">• {therapistData.experience}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleStartChat}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <FiMessageCircle className="w-5 h-5 mr-2" />
                  Start Chat
                </button>
                <button
                  onClick={handleVideoCall}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                >
                  <FiVideo className="w-5 h-5 mr-2" />
                  Video Call
                </button>
                <button
                  onClick={handleBookNewSession}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
                >
                  <FiCalendar className="w-5 h-5 mr-2" />
                  Book New Session
                </button>
              </div>
            </div>

            {/* Next Session Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Session</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="w-5 h-5 mr-3" />
                  <span>{new Date(therapistData.nextSession.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiClock className="w-5 h-5 mr-3" />
                  <span>{therapistData.nextSession.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiUser className="w-5 h-5 mr-3" />
                  <span>{therapistData.nextSession.type}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Reminder</p>
                <p className="text-xs text-blue-600 mt-1">
                  Your session is in 2 days. Make sure to prepare any questions you'd like to discuss.
                </p>
              </div>
            </div>

            {/* Monthly Package Status */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Package</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Hours Used</span>
                    <span>{therapistData.monthlyPackage.usedHours}/{therapistData.monthlyPackage.totalHours}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(therapistData.monthlyPackage.usedHours / therapistData.monthlyPackage.totalHours) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">{therapistData.monthlyPackage.remainingHours} hours</span> remaining</p>
                  <p>Renews on {new Date(therapistData.monthlyPackage.renewalDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'sessions', label: 'Sessions' },
                    { id: 'progress', label: 'Progress' },
                    { id: 'messages', label: 'Messages' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Progress Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{therapistData.progressStats.sessionsCompleted}</div>
                        <div className="text-sm text-gray-600">Sessions Completed</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{therapistData.progressStats.averageRating}</div>
                        <div className="text-sm text-gray-600">Average Rating</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{therapistData.progressStats.improvementScore}%</div>
                        <div className="text-sm text-gray-600">Improvement</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{therapistData.progressStats.goalsAchieved}</div>
                        <div className="text-sm text-gray-600">Goals Achieved</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {therapistData.recentSessions.slice(0, 3).map(session => (
                          <div key={session.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                              <FiCheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {session.type} Session Completed
                              </div>
                              <div className="text-sm text-gray-600">
                                {new Date(session.date).toLocaleDateString()} at {session.time}
                              </div>
                              {session.notes && (
                                <div className="text-sm text-gray-500 mt-1">{session.notes}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'sessions' && (
                  <div className="space-y-6">
                    {/* Upcoming Sessions */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
                      <div className="space-y-3">
                        {therapistData.upcomingSessions.map(session => (
                          <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <FiCalendar className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {session.type} Session
                                </div>
                                <div className="text-sm text-gray-600">
                                  {new Date(session.date).toLocaleDateString()} at {session.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                                Reschedule
                              </button>
                              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Join
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Session History */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Session History</h3>
                      <div className="space-y-3">
                        {therapistData.recentSessions.map(session => (
                          <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                <FiCheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {session.type} Session
                                </div>
                                <div className="text-sm text-gray-600">
                                  {new Date(session.date).toLocaleDateString()} at {session.time} • {session.duration}
                                </div>
                                {session.notes && (
                                  <div className="text-sm text-gray-500 mt-1">{session.notes}</div>
                                )}
                              </div>
                            </div>
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                              {session.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'progress' && (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <FiTrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Progress Tracking</h3>
                      <p className="text-gray-600">
                        Detailed progress reports and analytics will be available here.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'messages' && (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <FiMessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Message History</h3>
                      <p className="text-gray-600 mb-4">
                        Your conversation history with Dr. {therapistData.name} will appear here.
                      </p>
                      <button
                        onClick={handleStartChat}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Start New Conversation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTherapist;

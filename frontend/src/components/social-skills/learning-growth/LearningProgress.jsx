import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaChartLine,
  FaTrophy,
  FaCalendar,
  FaFire,
  FaStar,
  FaHandPaper,
  FaComments,
  FaHeart,
  FaGraduationCap,
  FaLightbulb
} from 'react-icons/fa';

const LearningProgress = () => {
  const [progressData, setProgressData] = useState({
    totalSigns: 156,
    learnedSigns: 89,
    streakDays: 12,
    weeklyGoal: 10,
    weeklyProgress: 7,
    level: 'Intermediate',
    xp: 2450,
    nextLevelXp: 3000
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'learned', sign: 'Thank you', date: '2024-01-15', xp: 25 },
    { id: 2, type: 'practiced', sign: 'Hello', date: '2024-01-15', xp: 10 },
    { id: 3, type: 'mastered', sign: 'Please', date: '2024-01-14', xp: 50 },
    { id: 4, type: 'learned', sign: 'Sorry', date: '2024-01-14', xp: 25 },
    { id: 5, type: 'practiced', sign: 'Help', date: '2024-01-13', xp: 10 }
  ]);

  const [frequentSigns, setFrequentSigns] = useState([
    { sign: 'Hello', count: 45, category: 'Greetings' },
    { sign: 'Thank you', count: 38, category: 'Politeness' },
    { sign: 'Please', count: 32, category: 'Politeness' },
    { sign: 'Help', count: 28, category: 'Assistance' },
    { sign: 'Love', count: 25, category: 'Emotions' },
    { sign: 'Family', count: 22, category: 'People' },
    { sign: 'Food', count: 20, category: 'Objects' },
    { sign: 'Home', count: 18, category: 'Places' }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Steps', description: 'Learned your first sign', icon: '🎯', earned: true, date: '2024-01-10' },
    { id: 2, title: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earned: true, date: '2024-01-12' },
    { id: 3, title: 'Social Butterfly', description: 'Used 50 different signs', icon: '🦋', earned: true, date: '2024-01-14' },
    { id: 4, title: 'Practice Makes Perfect', description: 'Practice 100 times', icon: '💪', earned: false, progress: 67 },
    { id: 5, title: 'Master Communicator', description: 'Learn 100 signs', icon: '🏆', earned: false, progress: 89 },
    { id: 6, title: 'Streak Master', description: '30-day learning streak', icon: '⚡', earned: false, progress: 40 }
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'learned': return <FaGraduationCap className="text-green-500" />;
      case 'practiced': return <FaHandPaper className="text-blue-500" />;
      case 'mastered': return <FaTrophy className="text-yellow-500" />;
      default: return <FaStar className="text-gray-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'learned': return 'bg-green-50 border-green-200';
      case 'practiced': return 'bg-blue-50 border-blue-200';
      case 'mastered': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const progressPercentage = (progressData.learnedSigns / progressData.totalSigns) * 100;
  const weeklyPercentage = (progressData.weeklyProgress / progressData.weeklyGoal) * 100;
  const xpPercentage = ((progressData.xp % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-blue-600 hover:text-blue-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">My Learning Progress</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FaHandPaper className="text-3xl text-blue-500 mr-4" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{progressData.learnedSigns}</div>
                <div className="text-sm text-gray-600">Signs Learned</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {progressData.learnedSigns} of {progressData.totalSigns} signs
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FaFire className="text-3xl text-orange-500 mr-4" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{progressData.streakDays}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-orange-600">
              Keep it up! 🔥
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FaCalendar className="text-3xl text-green-500 mr-4" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{progressData.weeklyProgress}</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${weeklyPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {progressData.weeklyProgress} of {progressData.weeklyGoal} goal
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FaStar className="text-3xl text-purple-500 mr-4" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{progressData.level}</div>
                <div className="text-sm text-gray-600">Current Level</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${xpPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {progressData.xp} / {progressData.nextLevelXp} XP
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-blue-500" />
              Recent Activity
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className={`p-3 rounded-lg border ${getActivityColor(activity.type)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getActivityIcon(activity.type)}
                      <div className="ml-3">
                        <div className="font-medium text-gray-800">
                          {activity.type === 'learned' && 'Learned: '}
                          {activity.type === 'practiced' && 'Practiced: '}
                          {activity.type === 'mastered' && 'Mastered: '}
                          {activity.sign}
                        </div>
                        <div className="text-sm text-gray-600">{activity.date}</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      +{activity.xp} XP
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Used Signs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaComments className="mr-2 text-green-500" />
              Most Used Signs
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {frequentSigns.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{item.sign}</div>
                      <div className="text-sm text-gray-600">{item.category}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {item.count} times
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaTrophy className="mr-2 text-yellow-500" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-lg border-2 ${
                  achievement.earned 
                    ? 'border-yellow-300 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      achievement.earned ? 'text-yellow-800' : 'text-gray-700'
                    }`}>
                      {achievement.title}
                    </div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                  </div>
                </div>
                
                {achievement.earned ? (
                  <div className="text-xs text-yellow-700">
                    Earned on {achievement.date}
                  </div>
                ) : (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {achievement.progress}% complete
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Suggestions */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaLightbulb className="mr-2" />
            Personalized Suggestions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎯 Focus Area</h4>
              <p className="text-sm">Practice emotion signs - you've been using them frequently!</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">📈 Next Goal</h4>
              <p className="text-sm">Learn 11 more signs to reach your next level milestone!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;

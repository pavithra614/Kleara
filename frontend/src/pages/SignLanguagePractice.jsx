import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiMove,
  FiUsers,
  FiMessageSquare,
  FiPackage,
  FiRefreshCw,
  FiArrowLeft,
  FiUser,
  FiCalendar,
  FiAward,
  FiTrendingUp
} from 'react-icons/fi';

const SignLanguagePractice = () => {
  const navigate = useNavigate();
  const [userAge, setUserAge] = useState(6); // Mock age - in real app, get from user context
  
  // Sign language lessons with AI-based learning
  const signLessons = [
    {
      id: 'basic-signs',
      name: 'Introduction to Basic Signs',
      description: 'Learn simple, essential signs for basic communication',
      icon: FiMove,
      color: 'blue',
      minAge: 3,
      maxAge: 18,
      signs: ['Hello', 'Goodbye', 'Please', 'Thank You', 'Yes', 'No', 'More', 'Eat', 'Drink'],
      estimatedTime: '20-30 min',
      difficulty: 'Beginner',
      aiFeatures: ['Gesture Recognition', 'Real-Time Feedback', 'Voice Guidance', 'Video Tutorial'],
      available: true
    },
    {
      id: 'family-signs',
      name: 'Signs for Family Members',
      description: 'Learn signs for family members and relationships',
      icon: FiUsers,
      color: 'green',
      minAge: 4,
      maxAge: 18,
      signs: ['Mother', 'Father', 'Sister', 'Brother', 'Grandmother', 'Grandfather'],
      estimatedTime: '25-35 min',
      difficulty: 'Beginner',
      aiFeatures: ['Voice-to-Sign Translation', 'Personalized Progress', 'Gamified Progress'],
      available: true
    },
    {
      id: 'simple-phrases',
      name: 'Simple Phrases',
      description: 'Learn to combine basic signs into simple phrases',
      icon: FiMessageSquare,
      color: 'purple',
      minAge: 5,
      maxAge: 18,
      signs: ['How are you?', 'I want water', 'I\'m hungry', 'I\'m tired', 'I love you'],
      estimatedTime: '30-40 min',
      difficulty: 'Intermediate',
      aiFeatures: ['Sentence Builder', 'Progress Tracker', 'Speech-to-Sign Translation'],
      available: true
    },
    {
      id: 'everyday-objects',
      name: 'Common Everyday Objects',
      description: 'Learn signs for common items used every day',
      icon: FiPackage,
      color: 'orange',
      minAge: 4,
      maxAge: 18,
      signs: ['Water', 'Food', 'Book', 'Phone', 'Car', 'Chair', 'Pen', 'Table'],
      estimatedTime: '25-35 min',
      difficulty: 'Intermediate',
      aiFeatures: ['Real-Time Object Matching', 'Gesture-Specific Feedback', 'Contextual Feedback'],
      available: true
    },
    {
      id: 'practice-reinforcement',
      name: 'Practice and Reinforcement',
      description: 'Reinforce learned signs with repeated practice and quizzes',
      icon: FiRefreshCw,
      color: 'indigo',
      minAge: 5,
      maxAge: 18,
      signs: ['Review all previous signs'],
      estimatedTime: '15-45 min',
      difficulty: 'All Levels',
      aiFeatures: ['Review Mode', 'Interactive Quizzes', 'Learning Reinforcement'],
      available: true
    }
  ];

  // Filter lessons based on user age
  const getAgeAppropriateLessons = () => {
    return signLessons.filter(lesson => userAge >= lesson.minAge && userAge <= lesson.maxAge);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        hoverBg: 'hover:bg-blue-200',
        text: 'text-blue-600',
        border: 'hover:border-blue-300',
        focus: 'focus:ring-blue-500'
      },
      green: {
        bg: 'bg-green-100',
        hoverBg: 'hover:bg-green-200',
        text: 'text-green-600',
        border: 'hover:border-green-300',
        focus: 'focus:ring-green-500'
      },
      purple: {
        bg: 'bg-purple-100',
        hoverBg: 'hover:bg-purple-200',
        text: 'text-purple-600',
        border: 'hover:border-purple-300',
        focus: 'focus:ring-purple-500'
      },
      orange: {
        bg: 'bg-orange-100',
        hoverBg: 'hover:bg-orange-200',
        text: 'text-orange-600',
        border: 'hover:border-orange-300',
        focus: 'focus:ring-orange-500'
      },
      indigo: {
        bg: 'bg-indigo-100',
        hoverBg: 'hover:bg-indigo-200',
        text: 'text-indigo-600',
        border: 'hover:border-indigo-300',
        focus: 'focus:ring-indigo-500'
      }
    };
    return colorMap[color];
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      case 'All Levels': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleLessonClick = (lessonId) => {
    if (lessonId === 'basic-signs') {
      navigate('/sign-language/basic-signs');
    } else {
      // For prototype, show coming soon for other lessons
      alert(`${signLessons.find(lesson => lesson.id === lessonId)?.name} coming soon!`);
    }
  };

  const ageAppropriateLessons = getAgeAppropriateLessons();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/home')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sign Language Practice</h1>
                <p className="text-gray-600">AI-powered sign language learning with real-time gesture recognition</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FiUser className="w-4 h-4" />
                <span>Age {userAge}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCalendar className="w-4 h-4" />
                <span>{ageAppropriateLessons.length} lessons available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* AI Features Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiMove className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">AI-Powered Learning</h3>
              <p className="text-blue-800 mb-3">
                Our advanced AI system provides real-time gesture recognition, personalized feedback, and adaptive learning 
                to help you master sign language effectively.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Gesture Recognition</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Real-Time Feedback</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Voice Guidance</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Progress Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ageAppropriateLessons.map((lesson, index) => {
            const colors = getColorClasses(lesson.color);
            const Icon = lesson.icon;
            
            return (
              <button
                key={lesson.id}
                onClick={() => handleLessonClick(lesson.id)}
                className={`group p-6 bg-white border border-gray-200 rounded-xl ${colors.border} hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 ${colors.focus} focus:ring-offset-2 text-left`}
              >
                {/* Lesson Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${colors.bg} ${colors.hoverBg} rounded-lg flex items-center justify-center transition-colors`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-500">Lesson {index + 1}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{lesson.name}</h3>
                    </div>
                  </div>
                  {lesson.available && (
                    <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Available
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>

                {/* Signs Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Signs to Learn:</h4>
                  <div className="flex flex-wrap gap-1">
                    {lesson.signs.slice(0, 6).map((sign, signIndex) => (
                      <span
                        key={signIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {sign}
                      </span>
                    ))}
                    {lesson.signs.length > 6 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                        +{lesson.signs.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* AI Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">AI Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {lesson.aiFeatures.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded-md`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lesson Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{lesson.estimatedTime}</span>
                  <span>{lesson.signs.length} signs</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress Overview */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FiTrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-blue-700">Lessons Completed</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-green-700">Signs Mastered</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-purple-700">Accuracy Rate</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">45</div>
              <div className="text-sm text-orange-700">Practice Minutes</div>
            </div>
          </div>
        </div>

        {/* Getting Started Tips */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <FiAward className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Tips for Success</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Ensure good lighting and clear camera view of your hands</li>
                <li>• Practice in front of a plain background for better gesture recognition</li>
                <li>• Start with basic signs and gradually progress to more complex phrases</li>
                <li>• Use the AI feedback to improve your hand positioning and movements</li>
                <li>• Practice regularly for 15-20 minutes daily for best results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguagePractice;

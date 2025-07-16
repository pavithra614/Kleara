import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiVolume2,
  FiHeadphones,
  FiMic,
  FiClock,
  FiUsers,
  FiArrowLeft,
  FiUser,
  FiCalendar
} from 'react-icons/fi';

const HearingPractice = () => {
  const navigate = useNavigate();
  const [userAge, setUserAge] = useState(4); // Mock age - in real app, get from user context
  
  // Hearing practice areas with age-appropriate filtering
  const hearingAreas = [
    {
      id: 'auditory-awareness',
      name: 'Auditory Awareness / Detection',
      description: 'Recognize presence or absence of sounds and develop basic listening skills',
      icon: FiVolume2,
      color: 'blue',
      minAge: 2,
      maxAge: 8,
      activities: 4,
      estimatedTime: '10-15 min',
      difficulty: 'Beginner',
      standards: 'ASHA early auditory milestone, Erber\'s Level 1'
    },
    {
      id: 'auditory-discrimination',
      name: 'Auditory Discrimination',
      description: 'Distinguish between different sounds, tones, and speech patterns',
      icon: FiHeadphones,
      color: 'purple',
      minAge: 3,
      maxAge: 10,
      activities: 5,
      estimatedTime: '15-20 min',
      difficulty: 'Intermediate',
      standards: 'WHO ICF function-focused learning'
    },
    {
      id: 'auditory-identification',
      name: 'Auditory Identification / Recognition',
      description: 'Identify and recognize specific sounds, words, and environmental audio',
      icon: FiMic,
      color: 'green',
      minAge: 3,
      maxAge: 12,
      activities: 6,
      estimatedTime: '15-25 min',
      difficulty: 'Intermediate',
      standards: 'ASHA auditory processing guidelines'
    },
    {
      id: 'auditory-comprehension',
      name: 'Auditory Comprehension',
      description: 'Understand meaning from spoken language and complex audio information',
      icon: FiHeadphones,
      color: 'orange',
      minAge: 4,
      maxAge: 15,
      activities: 7,
      estimatedTime: '20-30 min',
      difficulty: 'Advanced',
      standards: 'Language comprehension protocols'
    },
    {
      id: 'auditory-memory',
      name: 'Auditory Memory & Sequencing',
      description: 'Remember and sequence sounds, words, and instructions in correct order',
      icon: FiClock,
      color: 'indigo',
      minAge: 4,
      maxAge: 12,
      activities: 5,
      estimatedTime: '15-25 min',
      difficulty: 'Intermediate',
      standards: 'Working memory assessment standards'
    },
    {
      id: 'listening-in-noise',
      name: 'Listening in Noise / Auditory Closure',
      description: 'Focus on important sounds while filtering out background noise',
      icon: FiHeadphones,
      color: 'red',
      minAge: 5,
      maxAge: 15,
      activities: 4,
      estimatedTime: '20-30 min',
      difficulty: 'Advanced',
      standards: 'Auditory processing in noise protocols'
    },
    {
      id: 'family-involvement',
      name: 'Family/Caregiver Involvement',
      description: 'Activities and guidance for family members to support hearing development',
      icon: FiUsers,
      color: 'pink',
      minAge: 2,
      maxAge: 18,
      activities: 8,
      estimatedTime: '10-60 min',
      difficulty: 'All Levels',
      standards: 'Family-centered intervention approach'
    }
  ];

  // Filter areas based on user age
  const getAgeAppropriateAreas = () => {
    return hearingAreas.filter(area => userAge >= area.minAge && userAge <= area.maxAge);
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
      purple: {
        bg: 'bg-purple-100',
        hoverBg: 'hover:bg-purple-200',
        text: 'text-purple-600',
        border: 'hover:border-purple-300',
        focus: 'focus:ring-purple-500'
      },
      green: {
        bg: 'bg-green-100',
        hoverBg: 'hover:bg-green-200',
        text: 'text-green-600',
        border: 'hover:border-green-300',
        focus: 'focus:ring-green-500'
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
      },
      red: {
        bg: 'bg-red-100',
        hoverBg: 'hover:bg-red-200',
        text: 'text-red-600',
        border: 'hover:border-red-300',
        focus: 'focus:ring-red-500'
      },
      pink: {
        bg: 'bg-pink-100',
        hoverBg: 'hover:bg-pink-200',
        text: 'text-pink-600',
        border: 'hover:border-pink-300',
        focus: 'focus:ring-pink-500'
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

  const handleAreaClick = (areaId) => {
    if (areaId === 'auditory-awareness') {
      navigate('/hearing-practice/auditory-awareness');
    } else {
      // For prototype, show coming soon for other areas
      alert(`${hearingAreas.find(area => area.id === areaId)?.name} activities coming soon!`);
    }
  };

  const ageAppropriateAreas = getAgeAppropriateAreas();

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
                <h1 className="text-2xl font-bold text-gray-900">Hearing Practice</h1>
                <p className="text-gray-600">Develop auditory skills through interactive listening activities</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FiUser className="w-4 h-4" />
                <span>Age {userAge}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCalendar className="w-4 h-4" />
                <span>{ageAppropriateAreas.length} areas available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Age-appropriate notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2">
            <FiVolume2 className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-medium text-blue-900">Age-Appropriate Hearing Activities</h3>
              <p className="text-blue-700 text-sm">
                Showing {ageAppropriateAreas.length} hearing practice areas suitable for age {userAge}
              </p>
            </div>
          </div>
        </div>

        {/* Hearing Practice Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ageAppropriateAreas.map((area) => {
            const colors = getColorClasses(area.color);
            const Icon = area.icon;
            
            return (
              <button
                key={area.id}
                onClick={() => handleAreaClick(area.id)}
                className={`group p-6 bg-white border border-gray-200 rounded-xl ${colors.border} hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 ${colors.focus} focus:ring-offset-2 text-left`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${colors.bg} ${colors.hoverBg} rounded-lg flex items-center justify-center transition-colors`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{area.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(area.difficulty)}`}>
                        {area.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{area.activities} activities</span>
                        <span>{area.estimatedTime}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Standards: {area.standards}
                      </div>
                    </div>
                    {area.id === 'auditory-awareness' && (
                      <div className="mt-3 inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Available Now
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Coming Soon Areas (if any are filtered out) */}
        {hearingAreas.length > ageAppropriateAreas.length && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon (Age-Restricted)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hearingAreas
                .filter(area => userAge < area.minAge || userAge > area.maxAge)
                .map((area) => {
                  const colors = getColorClasses(area.color);
                  const Icon = area.icon;
                  
                  return (
                    <div
                      key={area.id}
                      className="p-6 bg-gray-50 border border-gray-200 rounded-xl opacity-60"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">{area.name}</h3>
                          <p className="text-gray-500 text-sm mb-4">{area.description}</p>
                          <div className="text-xs text-gray-400">
                            Available for ages {area.minAge}-{area.maxAge}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">About Hearing Practice</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">What is Auditory Training?</h4>
              <p>
                Auditory training helps develop listening skills through structured activities that improve 
                sound detection, discrimination, identification, and comprehension abilities.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Evidence-Based Approach</h4>
              <p>
                Our activities are based on ASHA guidelines, WHO ICF standards, and Erber's auditory 
                skill hierarchy to ensure effective and progressive learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HearingPractice;

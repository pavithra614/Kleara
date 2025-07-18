import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiUser, 
  FiCalendar, 
  FiMessageCircle, 
  FiVideo,
  FiActivity,
  FiCreditCard,
  FiArrowRight
} from 'react-icons/fi';

const TherapistNavigationCard = ({ user, therapyMethod }) => {
  const navigate = useNavigate();
  const isTherapistGuided = user.mode === 'Therapist-guided';
  const isSupervised = user.mode === 'Therapist-guided' && therapyMethod === 'therapist-supervised';

  // Don't show this card for self-guided users
  if (!isTherapistGuided) {
    return null;
  }

  const therapistOptions = [
    {
      id: 'find-therapists',
      title: 'Find Therapists',
      description: 'Browse and book qualified therapists',
      icon: <FiSearch className="w-5 h-5" />,
      route: '/find-therapists',
      color: 'blue',
      available: true
    },
    {
      id: 'my-therapist',
      title: 'My Therapist',
      description: 'View your current therapist dashboard',
      icon: <FiUser className="w-5 h-5" />,
      route: '/my-therapist',
      color: 'green',
      available: isSupervised
    },
    {
      id: 'book-session',
      title: 'Book Session',
      description: 'Schedule new therapy sessions',
      icon: <FiCalendar className="w-5 h-5" />,
      route: '/find-therapists',
      color: 'purple',
      available: true
    },
    {
      id: 'chat',
      title: 'Chat with Therapist',
      description: 'Message your therapist directly',
      icon: <FiMessageCircle className="w-5 h-5" />,
      route: isSupervised ? '/therapists/1/chat' : '/find-therapists',
      color: 'indigo',
      available: true
    },
    {
      id: 'video-call',
      title: 'Video Sessions',
      description: 'Join video therapy sessions',
      icon: <FiVideo className="w-5 h-5" />,
      route: isSupervised ? '/therapists/1/video' : '/find-therapists',
      color: 'red',
      available: true
    },
    {
      id: 'session-tracker',
      title: 'Session Tracker',
      description: 'Track your 30-hour monthly usage',
      icon: <FiActivity className="w-5 h-5" />,
      route: '/my-therapist',
      color: 'orange',
      available: isSupervised
    }
  ];

  const handleNavigation = (option) => {
    if (!option.available && !isSupervised) {
      // If user doesn't have a therapist yet, redirect to find therapists
      navigate('/find-therapists');
    } else {
      navigate(option.route);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Therapist Services</h3>
          <p className="text-sm text-gray-600">
            {isSupervised 
              ? 'Manage your therapy sessions and communicate with your therapist'
              : 'Find and book qualified therapists for personalized therapy'
            }
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isSupervised 
            ? 'bg-green-100 text-green-700'
            : 'bg-blue-100 text-blue-700'
        }`}>
          {isSupervised ? 'Active Therapist' : 'Find Therapist'}
        </div>
      </div>

      {/* Quick Stats for Active Users */}
      {isSupervised && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-600">18</div>
            <div className="text-xs text-gray-600">Hours Left</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-600">12</div>
            <div className="text-xs text-gray-600">Sessions Done</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-600">85%</div>
            <div className="text-xs text-gray-600">Progress</div>
          </div>
        </div>
      )}

      {/* Navigation Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {therapistOptions.map((option) => {
          const isDisabled = !option.available && !isSupervised && option.id !== 'find-therapists' && option.id !== 'book-session';
          
          return (
            <button
              key={option.id}
              onClick={() => handleNavigation(option)}
              disabled={isDisabled}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left group ${
                isDisabled
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  : `border-${option.color}-200 hover:border-${option.color}-300 hover:bg-${option.color}-50 cursor-pointer`
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isDisabled 
                      ? 'bg-gray-200 text-gray-400'
                      : `bg-${option.color}-100 text-${option.color}-600`
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      isDisabled ? 'text-gray-400' : 'text-gray-900'
                    }`}>
                      {option.title}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      isDisabled ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {isDisabled && option.id !== 'find-therapists' && option.id !== 'book-session'
                        ? 'Book a therapist first'
                        : option.description
                      }
                    </p>
                  </div>
                </div>
                <FiArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  isDisabled ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Therapist Info (if active) */}
      {isSupervised && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <img
              src="/speech_therapy.jpg"
              alt="Dr. Shanika Madumali"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Dr. Shanika Madumali</h4>
              <p className="text-sm text-gray-600">Speech-Language Pathologist</p>
              <div className="flex items-center space-x-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Available now</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate('/therapists/1/chat')}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiMessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/therapists/1/video')}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiVideo className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Info for New Users */}
      {!isSupervised && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Monthly Therapy Package</h4>
              <p className="text-sm text-blue-700">30 hours of personalized therapy</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">LKR 25,000</div>
              <div className="text-xs text-blue-600">per month</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistNavigationCard;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiMic, 
  FiVolumeX, 
  FiBook, 
  FiNavigation, 
  FiType, 
  FiZap,
  FiArrowLeft,
  FiUser,
  FiCalendar
} from 'react-icons/fi';

const SpeechPractice = () => {
  const navigate = useNavigate();
  const [userAge, setUserAge] = useState(4); // Mock age - in real app, get from user context
  
  // Speech practice areas with age-appropriate filtering
  const speechAreas = [
    {
      id: 'articulation',
      name: 'Articulation',
      description: 'Practice clear pronunciation of sounds and words',
      icon: FiMic,
      color: 'blue',
      minAge: 3,
      maxAge: 12,
      activities: 5,
      estimatedTime: '15-20 min'
    },
    {
      id: 'phonological-awareness',
      name: 'Phonological Awareness',
      description: 'Recognize and work with sounds in spoken language',
      icon: FiVolumeX,
      color: 'purple',
      minAge: 4,
      maxAge: 8,
      activities: 4,
      estimatedTime: '10-15 min'
    },
    {
      id: 'vocabulary-building',
      name: 'Vocabulary Building',
      description: 'Learn new words and expand language skills',
      icon: FiBook,
      color: 'green',
      minAge: 3,
      maxAge: 15,
      activities: 6,
      estimatedTime: '20-25 min'
    },
    {
      id: 'following-directions',
      name: 'Following Directions',
      description: 'Practice listening and following multi-step instructions',
      icon: FiNavigation,
      color: 'orange',
      minAge: 3,
      maxAge: 10,
      activities: 4,
      estimatedTime: '15-20 min'
    },
    {
      id: 'sentence-formation',
      name: 'Sentence Formation',
      description: 'Build and structure complete sentences',
      icon: FiType,
      color: 'indigo',
      minAge: 4,
      maxAge: 12,
      activities: 5,
      estimatedTime: '20-25 min'
    },
    {
      id: 'fluency-stuttering',
      name: 'Fluency/Stuttering',
      description: 'Practice smooth and fluent speech patterns',
      icon: FiZap,
      color: 'red',
      minAge: 5,
      maxAge: 15,
      activities: 3,
      estimatedTime: '25-30 min'
    }
  ];

  // Filter areas based on user age
  const getAgeAppropriateAreas = () => {
    return speechAreas.filter(area => userAge >= area.minAge && userAge <= area.maxAge);
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
      }
    };
    return colorMap[color];
  };

  const handleAreaClick = (areaId) => {
    if (areaId === 'articulation') {
      navigate('/speech-practice/articulation');
    } else {
      // For prototype, show coming soon for other areas
      alert(`${speechAreas.find(area => area.id === areaId)?.name} activities coming soon!`);
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
                <h1 className="text-2xl font-bold text-gray-900">Speech Practice</h1>
                <p className="text-gray-600">Choose an area to practice and improve your communication skills</p>
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
            <FiUser className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-medium text-blue-900">Age-Appropriate Activities</h3>
              <p className="text-blue-700 text-sm">
                Showing {ageAppropriateAreas.length} speech practice areas suitable for age {userAge}
              </p>
            </div>
          </div>
        </div>

        {/* Speech Practice Areas Grid */}
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{area.activities} activities</span>
                      <span>{area.estimatedTime}</span>
                    </div>
                    {area.id === 'articulation' && (
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
        {speechAreas.length > ageAppropriateAreas.length && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon (Age-Restricted)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speechAreas
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
      </div>
    </div>
  );
};

export default SpeechPractice;

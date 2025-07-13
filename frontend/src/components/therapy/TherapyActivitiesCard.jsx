import { FiMic, FiBook, FiUsers, FiGlobe, FiPlay } from 'react-icons/fi';

const TherapyActivitiesCard = ({ user, therapyMethod }) => {
  const activities = [
    {
      id: 'speech',
      name: 'Speech Practice',
      icon: FiMic,
      color: 'blue',
      duration: '15 min session'
    },
    {
      id: 'sign',
      name: 'Sign Language',
      icon: FiGlobe,
      color: 'purple',
      duration: '20 min session'
    },
    {
      id: 'reading',
      name: 'Reading Games',
      icon: FiBook,
      color: 'green',
      duration: '25 min session'
    },
    {
      id: 'social',
      name: 'Social Skills',
      icon: FiUsers,
      color: 'orange',
      duration: '30 min session'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        hoverBg: 'hover:bg-blue-200',
        text: 'text-blue-600',
        border: 'hover:border-blue-300',
        focus: 'focus:ring-blue-500',
        hoverBgStatic: 'hover:bg-blue-50'
      },
      purple: {
        bg: 'bg-purple-100',
        hoverBg: 'hover:bg-purple-200',
        text: 'text-purple-600',
        border: 'hover:border-purple-300',
        focus: 'focus:ring-purple-500',
        hoverBgStatic: 'hover:bg-purple-50'
      },
      green: {
        bg: 'bg-green-100',
        hoverBg: 'hover:bg-green-200',
        text: 'text-green-600',
        border: 'hover:border-green-300',
        focus: 'focus:ring-green-500',
        hoverBgStatic: 'hover:bg-green-50'
      },
      orange: {
        bg: 'bg-orange-100',
        hoverBg: 'hover:bg-orange-200',
        text: 'text-orange-600',
        border: 'hover:border-orange-300',
        focus: 'focus:ring-orange-500',
        hoverBgStatic: 'hover:bg-orange-50'
      }
    };
    return colorMap[color];
  };

  const getSessionType = () => {
    if (user.mode === 'Therapist-guided' && therapyMethod === 'therapist-supervised') {
      return 'Live with therapist';
    }
    return null;
  };

  const isTherapistSupervised = user.mode === 'Therapist-guided' && therapyMethod === 'therapist-supervised';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {user.mode === 'Therapist-guided'
            ? (therapyMethod === 'self-guided' ? 'Self-Practice Activities' : 'Supervised Session Activities')
            : 'Today\'s Activities'
          }
        </h3>
        <div className="flex items-center space-x-2">
          {user.mode === 'Therapist-guided' && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              therapyMethod === 'self-guided'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {therapyMethod === 'self-guided' ? 'Self-Guided' : 'Supervised'}
            </span>
          )}
          <FiPlay className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {activities.map((activity) => {
          const colors = getColorClasses(activity.color);
          const Icon = activity.icon;
          const sessionType = getSessionType();
          
          return (
            <button
              key={activity.id}
              className={`group p-6 border border-gray-200 rounded-xl ${colors.border} ${colors.hoverBgStatic} transition-all duration-200 focus:outline-none focus:ring-2 ${colors.focus} focus:ring-offset-2`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`w-12 h-12 ${colors.bg} ${colors.hoverBg} rounded-lg flex items-center justify-center transition-colors`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <span className="text-sm font-medium text-gray-900">{activity.name}</span>
                <span className="text-xs text-gray-500">
                  {sessionType || activity.duration}
                </span>
                {isTherapistSupervised && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Therapist Available</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TherapyActivitiesCard;

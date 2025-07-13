import {
  FiMic,
  FiBook,
  FiUsers,
  FiGlobe,
  FiBarChart2,
  FiActivity,
  FiCalendar,
  FiDownload,
  FiShare2,
  FiUserCheck,
  FiCheckCircle
} from 'react-icons/fi';

const HealthReportsCard = ({ healthReports }) => {
  const progressData = [
    {
      key: 'speechTherapy',
      name: 'Speech Therapy',
      icon: FiMic,
      color: 'blue'
    },
    {
      key: 'signLanguage',
      name: 'Sign Language',
      icon: FiGlobe,
      color: 'purple'
    },
    {
      key: 'literacy',
      name: 'Literacy',
      icon: FiBook,
      color: 'green'
    },
    {
      key: 'socialSkills',
      name: 'Social Skills',
      icon: FiUsers,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', textBold: 'text-blue-700' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', textBold: 'text-purple-700' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', textBold: 'text-green-700' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', textBold: 'text-orange-700' }
    };
    return colorMap[color];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">Health Reports & Analytics</h3>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
            Therapist Monitored
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <FiDownload className="w-4 h-4 mr-1" />
            Export
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <FiShare2 className="w-4 h-4 mr-1" />
            Share
          </button>
          <FiBarChart2 className="w-5 h-5 text-indigo-600" />
        </div>
      </div>

      {/* Weekly Progress Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {progressData.map((item) => {
          const data = healthReports.weeklyProgress[item.key];
          const colors = getColorClasses(item.color);
          const Icon = item.icon;
          
          return (
            <div key={item.key} className={`p-4 ${colors.bg} rounded-lg border ${colors.border}`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${colors.text}`} />
                <span className="text-xs font-medium text-green-600">{data.improvement}</span>
              </div>
              <div className={`text-2xl font-bold ${colors.textBold} mb-1`}>{data.avgScore}</div>
              <div className={`text-xs ${colors.text}`}>{item.name}</div>
              <div className="text-xs text-gray-500 mt-1">{data.sessions} sessions</div>
            </div>
          );
        })}
      </div>

      {/* Recent Assessments */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <FiActivity className="w-4 h-4 mr-2 text-indigo-600" />
          Recent Assessments
        </h4>
        <div className="space-y-3">
          {healthReports.recentAssessments.map((assessment) => (
            <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <FiCalendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{assessment.date}</span>
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900">{assessment.type}</div>
                  <div className="text-xs text-gray-500">{assessment.therapistNotes}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  assessment.status === 'Improved' ? 'bg-green-100 text-green-700' :
                  assessment.status === 'Excellent' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {assessment.status}
                </span>
                <div className="text-right">
                  <div className="font-semibold text-lg text-gray-900">{assessment.score}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Therapist Recommendations */}
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <h4 className="text-md font-semibold text-indigo-900 mb-3 flex items-center">
          <FiUserCheck className="w-4 h-4 mr-2" />
          Therapist Recommendations
        </h4>
        <ul className="space-y-2">
          {healthReports.therapistRecommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2">
              <FiCheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-indigo-800">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthReportsCard;

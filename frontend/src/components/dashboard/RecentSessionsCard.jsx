import { FiMic, FiBook, FiGlobe, FiClock } from 'react-icons/fi';

const RecentSessionsCard = ({ recentSessions }) => {
  const getActivityIcon = (activity) => {
    switch (activity) {
      case 'Speech Practice':
        return FiMic;
      case 'Sign Language':
        return FiGlobe;
      case 'Reading Game':
        return FiBook;
      default:
        return FiMic;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Therapy Sessions</h3>
        <FiClock className="w-5 h-5 text-blue-600" />
      </div>
      <div className="space-y-4">
        {recentSessions.map((session) => {
          const Icon = getActivityIcon(session.activity);
          
          return (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900">{session.activity}</div>
                  <div className="text-xs text-gray-500">{session.type} • {session.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600 text-sm">
                  {session.progress}
                </div>
                <div className="text-xs text-gray-500">Progress</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentSessionsCard;

import { FiAward, FiCheckCircle } from 'react-icons/fi';

const AchievementsCard = ({ achievements }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Therapy Milestones</h3>
        <FiAward className="w-5 h-5 text-blue-600" />
      </div>
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 ${
              achievement.unlocked
                ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              achievement.unlocked
                ? 'bg-blue-100'
                : 'bg-gray-200'
            }`}>
              <FiAward className={`w-5 h-5 ${
                achievement.unlocked
                  ? 'text-blue-600'
                  : 'text-gray-400'
              }`} />
            </div>
            <div className="flex-1">
              <div className={`font-medium text-sm ${
                achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {achievement.name}
              </div>
              <div className={`text-xs ${
                achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </div>
            </div>
            {achievement.unlocked && (
              <FiCheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsCard;

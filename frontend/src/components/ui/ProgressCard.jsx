import { FiTrendingUp } from 'react-icons/fi';

const ProgressCard = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
        <FiTrendingUp className="w-5 h-5 text-blue-600" />
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-3">{user.totalProgress}%</div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${user.totalProgress}%` }}
          ></div>
        </div>
        <p className="text-gray-600">
          Therapy Level: <span className="font-semibold text-gray-900">{user.therapyLevel}</span>
        </p>
      </div>
    </div>
  );
};

export default ProgressCard;

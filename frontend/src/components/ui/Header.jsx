import { FiSettings, FiLogOut, FiTrendingUp, FiFileText, FiSearch, FiBriefcase } from 'react-icons/fi';
import { HiAcademicCap } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, therapyMethod, onSignOut }) => {
  const navigate = useNavigate();

  const handleFindTherapists = () => {
    navigate('/find-therapists');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <HiAcademicCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
              <p className="text-gray-600 mt-1">Continue your therapy journey • {user.mode}</p>
              <div className="flex items-center space-x-3 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {user.therapyLevel}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  {user.totalProgress}% Progress
                </span>
                {user.mode === 'Therapist-guided' && therapyMethod === 'therapist-supervised' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    <FiFileText className="w-3 h-3 mr-1" />
                    Health Reports Available
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Work as Therapist button - for testing */}
            <button
              onClick={() => navigate('/work-as-therapist')}
              className="inline-flex items-center px-4 py-2 border border-green-300 rounded-lg text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <FiBriefcase className="w-4 h-4 mr-2" />
              Work as Therapist
            </button>

            {/* Find Therapists button for therapist-guided users */}
            {user.mode === 'Therapist-guided' && (
              <button
                onClick={handleFindTherapists}
                className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <FiSearch className="w-4 h-4 mr-2" />
                Find Therapists
              </button>
            )}
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              <FiSettings className="w-4 h-4 mr-2" />
              Settings
            </button>
            <button
              onClick={onSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

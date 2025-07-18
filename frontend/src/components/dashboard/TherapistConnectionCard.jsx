import { FiUser, FiVideo, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TherapistConnectionCard = ({ user, therapyMethod }) => {
  const navigate = useNavigate();
  const isSupervised = user.mode === 'Therapist-guided' && therapyMethod === 'therapist-supervised';
  const isTherapistGuided = user.mode === 'Therapist-guided';

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-6 ${
      isSupervised
        ? 'border-green-200 bg-green-50/30'
        : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {isSupervised
            ? 'Active Therapist Session'
            : 'Connect with Therapist'
          }
        </h3>
        <div className="flex items-center space-x-2">
          {isSupervised && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
              Live Session
            </span>
          )}
          <FiVideo className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      <div className={`flex items-center justify-between p-4 rounded-lg border ${
        isSupervised
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-100'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <FiUser className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">Dr. Shanika Madumali</div>
            <div className="text-sm text-gray-600">Speech-Language Pathologist</div>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">
                {isSupervised
                  ? 'In session with you'
                  : 'Available now'
                }
              </span>
            </div>
          </div>
        </div>
        <button className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isSupervised
            ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
            : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
        }`}>
          <FiVideo className="w-4 h-4 mr-2" />
          {isSupervised
            ? 'Continue Session'
            : 'Start Session'
          }
        </button>
      </div>

      {/* Additional info for supervised mode */}
      {isSupervised && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <FiVideo className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Live Supervision Active</p>
              <p className="text-xs text-blue-600 mt-1">
                Your therapist is monitoring your session and can provide real-time guidance and feedback.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Find Therapists option for therapist-guided users without active therapist */}
      {isTherapistGuided && !isSupervised && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800 font-medium">Need a therapist?</p>
              <p className="text-xs text-gray-600 mt-1">
                Browse and book sessions with qualified therapists
              </p>
            </div>
            <button
              onClick={() => navigate('/find-therapists')}
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <FiSearch className="w-4 h-4 mr-1" />
              Find Therapists
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistConnectionCard;

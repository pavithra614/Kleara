import { FiMic, FiGlobe, FiMessageSquare } from 'react-icons/fi';

const AITranslationHubCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">AI Translation Hub</h3>
        <FiGlobe className="w-5 h-5 text-blue-600" />
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FiGlobe className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white">Real-time Communication</h4>
          </div>
          <p className="text-blue-100 mb-6">
            Convert between sign language, speech, and text instantly. Connect with others regardless of communication barriers.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
              <FiMic className="w-4 h-4 mr-2" />
              Speech to Text
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
              <FiGlobe className="w-4 h-4 mr-2" />
              Sign to Speech
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
              <FiMessageSquare className="w-4 h-4 mr-2" />
              Text to Sign
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-blue-300/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default AITranslationHubCard;

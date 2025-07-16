import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiPlay,
  FiStar,
  FiVolume2,
  FiTrendingUp,
  FiClock,
  FiUser,
  FiVolumeX
} from 'react-icons/fi';

const AuditoryAwarenessHub = () => {
  const navigate = useNavigate();
  const [userAge] = useState(4); // Mock age for auditory awareness activities

  // Auditory awareness games for detection and basic listening skills
  const auditoryGames = [
    {
      id: 'sound-hide-seek',
      name: 'Sound Hide-and-Seek',
      description: 'Help find the hiding puppy by listening to barks from different directions',
      goal: 'Auditory detection – recognizing presence or absence of a sound',
      gameType: 'Sound Localization + Detection',
      difficulty: 'Beginner',
      estimatedTime: '8-12 min',
      levels: 4,
      icon: '🐶',
      color: 'blue',
      features: ['Directional sounds', 'Sound presence/absence', 'Animal themes', 'Progressive difficulty'],
      standards: 'ASHA early auditory milestone, Erber\'s Level 1 (Detection)',
      available: true
    },
    {
      id: 'wheres-the-sound',
      name: 'Where\'s the Sound?',
      description: 'Match toy sounds to pictures and watch them come to life',
      goal: 'Sound localization and attention',
      gameType: 'Sound-Object Association',
      difficulty: 'Beginner',
      estimatedTime: '10-15 min',
      levels: 5,
      icon: '🚗',
      color: 'green',
      features: ['Toy sounds', 'Picture matching', 'Sound-object links', 'Interactive animations'],
      standards: 'WHO ICF (function-focused learning), ASHA for detection in early play',
      available: true
    },
    {
      id: 'pop-sound-bubbles',
      name: 'Pop the Sound Bubbles',
      description: 'Listen carefully and pop only the bubbles that make sounds',
      goal: 'Detect sound events among silence',
      gameType: 'Sound Detection + Timing',
      difficulty: 'Intermediate',
      estimatedTime: '6-10 min',
      levels: 3,
      icon: '🎈',
      color: 'purple',
      features: ['Bubble animations', 'Sound vs silence', 'Attention training', 'Cause-effect learning'],
      standards: 'Auditory awareness, early aural training principle',
      available: true
    },
    {
      id: 'sleepy-teddy-wakeup',
      name: 'Sleepy Teddy Wake-Up!',
      description: 'Wake up the sleeping teddy bear with the right sounds',
      goal: 'Sound-response connection (awareness and reaction to sound)',
      gameType: 'Sound Recognition + Response',
      difficulty: 'Beginner',
      estimatedTime: '8-14 min',
      levels: 4,
      icon: '🧸',
      color: 'orange',
      features: ['Teddy bear character', 'Wake-up sounds', 'Response training', 'Real sound integration'],
      standards: 'ASHA pre-linguistic auditory development',
      available: true
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
      green: {
        bg: 'bg-green-100',
        hoverBg: 'hover:bg-green-200',
        text: 'text-green-600',
        border: 'hover:border-green-300',
        focus: 'focus:ring-green-500'
      },
      purple: {
        bg: 'bg-purple-100',
        hoverBg: 'hover:bg-purple-200',
        text: 'text-purple-600',
        border: 'hover:border-purple-300',
        focus: 'focus:ring-purple-500'
      },
      orange: {
        bg: 'bg-orange-100',
        hoverBg: 'hover:bg-orange-200',
        text: 'text-orange-600',
        border: 'hover:border-orange-300',
        focus: 'focus:ring-orange-500'
      }
    };
    return colorMap[color];
  };

  const handleGameClick = (gameId) => {
    const gameRoutes = {
      'sound-hide-seek': '/hearing-practice/auditory-awareness/sound-hide-seek',
      'wheres-the-sound': '/hearing-practice/auditory-awareness/wheres-the-sound',
      'pop-sound-bubbles': '/hearing-practice/auditory-awareness/pop-sound-bubbles',
      'sleepy-teddy-wakeup': '/hearing-practice/auditory-awareness/sleepy-teddy-wakeup'
    };

    const route = gameRoutes[gameId];
    if (route) {
      if (gameId === 'sound-hide-seek') {
        navigate(route);
      } else {
        alert(`${auditoryGames.find(game => game.id === gameId)?.name} coming soon!`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/hearing-practice')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Auditory Awareness & Detection</h1>
                <p className="text-gray-600">Build foundational listening skills through sound detection games</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FiUser className="w-4 h-4" />
                <span>Ages 2-8</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiVolume2 className="w-4 h-4" />
                <span>4 Activities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiVolume2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Auditory Awareness Goals</h3>
              <p className="text-blue-800 mb-3">
                These activities help children develop the fundamental ability to detect and respond to sounds in their environment. 
                This is the first step in auditory skill development.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Sound Detection</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Presence/Absence</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Sound Localization</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Listening Attention</span>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {auditoryGames.map((game) => {
            const colors = getColorClasses(game.color);
            
            return (
              <div
                key={game.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                {/* Game Header */}
                <div className={`${colors.bg} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{game.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{game.name}</h3>
                        <p className="text-gray-600 text-sm">{game.gameType}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{game.description}</p>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-800 mb-1">Learning Goal:</p>
                    <p className="text-sm text-gray-700">{game.goal}</p>
                  </div>
                </div>

                {/* Game Details */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiClock className="w-4 h-4" />
                      <span>{game.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiTrendingUp className="w-4 h-4" />
                      <span>{game.levels} levels</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Game Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {game.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Standards */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-800 mb-1">Based on Standards:</h4>
                    <p className="text-xs text-gray-600">{game.standards}</p>
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => handleGameClick(game.id)}
                    disabled={!game.available}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      game.available
                        ? `${colors.bg} ${colors.hoverBg} ${colors.text} hover:shadow-md focus:outline-none focus:ring-2 ${colors.focus} focus:ring-offset-2`
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <FiPlay className="w-5 h-5" />
                    <span>{game.available ? 'Start Activity' : 'Coming Soon'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Section */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FiStar className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">Your Auditory Progress</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-blue-700">Activities Completed</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">78%</div>
              <div className="text-sm text-green-700">Detection Accuracy</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-purple-700">Sounds Recognized</div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <FiVolumeX className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Tips for Success</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Ensure a quiet environment for better sound detection</li>
                <li>• Use headphones if available for clearer audio experience</li>
                <li>• Start with easier levels and gradually increase difficulty</li>
                <li>• Take breaks if the child seems tired or frustrated</li>
                <li>• Celebrate small victories to maintain motivation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditoryAwarenessHub;

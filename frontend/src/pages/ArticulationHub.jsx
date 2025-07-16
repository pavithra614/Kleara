import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiPlay, 
  FiStar, 
  FiTarget,
  FiTrendingUp,
  FiClock,
  FiUser
} from 'react-icons/fi';

const ArticulationHub = () => {
  const navigate = useNavigate();
  const [userAge] = useState(4); // Mock age for 3-5 year olds

  // Articulation games for ages 3-5
  const articulationGames = [
    {
      id: 'sound-safari',
      name: 'Sound Safari',
      description: 'Go on a jungle adventure and practice initial consonant sounds',
      target: 'Initial consonant sounds (/b/, /m/, /p/, /t/, /d/)',
      gameType: 'Exploration + Tap & Speak',
      difficulty: 'Beginner',
      estimatedTime: '10-15 min',
      levels: 4,
      icon: '🦁',
      color: 'green',
      features: ['Animal sounds', 'Jungle adventure', 'Voice feedback', 'Progressive levels'],
      available: true
    },
    {
      id: 'build-word-lab',
      name: 'Build-a-Word Lab',
      description: 'Drag letter blocks to form words with blends and watch them come to life',
      target: 'Blends (/bl/, /st/, /tr/), multisyllabic words',
      gameType: 'Drag-and-Drop + Animation',
      difficulty: 'Intermediate',
      estimatedTime: '15-20 min',
      levels: 5,
      icon: '🧪',
      color: 'blue',
      features: ['Letter blocks', 'Word animations', 'Blend practice', 'Robot helper'],
      available: true
    },
    {
      id: 'magic-mirror',
      name: 'Magic Mirror',
      description: 'Practice difficult sounds with a magical mirror that gives funny effects',
      target: 'Difficult sounds (/r/, /s/, /l/, /sh/)',
      gameType: 'Voice Morph + Visual Feedback',
      difficulty: 'Advanced',
      estimatedTime: '12-18 min',
      levels: 3,
      icon: '🪞',
      color: 'purple',
      features: ['Voice effects', 'Visual feedback', 'Tongue placement hints', 'Magic animations'],
      available: true
    },
    {
      id: 'sound-sorter',
      name: 'Sound Sorter',
      description: 'Sort pictures into the right sound bins and practice pronunciation',
      target: 'Sound discrimination & minimal pairs',
      gameType: 'Puzzle Game',
      difficulty: 'Beginner',
      estimatedTime: '8-12 min',
      levels: 4,
      icon: '🧩',
      color: 'orange',
      features: ['Picture sorting', 'Sound discrimination', 'Minimal pairs', 'Puzzle solving'],
      available: true
    },
    {
      id: 'knight-sounds',
      name: 'Knight of Sounds',
      description: 'Help a brave knight defeat monsters by saying final consonant sounds',
      target: 'Final consonants (/t/, /k/, /n/, /d/)',
      gameType: 'Combat RPG-lite',
      difficulty: 'Intermediate',
      estimatedTime: '15-25 min',
      levels: 6,
      icon: '⚔️',
      color: 'red',
      features: ['RPG adventure', 'Monster battles', 'Quest system', 'Final consonants'],
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
      green: {
        bg: 'bg-green-100',
        hoverBg: 'hover:bg-green-200',
        text: 'text-green-600',
        border: 'hover:border-green-300',
        focus: 'focus:ring-green-500'
      },
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
      orange: {
        bg: 'bg-orange-100',
        hoverBg: 'hover:bg-orange-200',
        text: 'text-orange-600',
        border: 'hover:border-orange-300',
        focus: 'focus:ring-orange-500'
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

  const handleGameClick = (gameId) => {
    const gameRoutes = {
      'sound-safari': '/speech-practice/articulation/sound-safari',
      'build-word-lab': '/speech-practice/articulation/build-word-lab',
      'magic-mirror': '/speech-practice/articulation/magic-mirror',
      'sound-sorter': '/speech-practice/articulation/sound-sorter',
      'knight-sounds': '/speech-practice/articulation/knight-sounds'
    };

    const route = gameRoutes[gameId];
    if (route) {
      navigate(route);
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
                onClick={() => navigate('/speech-practice')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Articulation Practice</h1>
                <p className="text-gray-600">Fun games to practice clear pronunciation and speech sounds</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FiUser className="w-4 h-4" />
                <span>Ages 3-5</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiTarget className="w-4 h-4" />
                <span>5 Activities</span>
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
              <FiTarget className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Articulation Goals</h3>
              <p className="text-blue-800 mb-3">
                These games help children practice clear pronunciation of speech sounds, from simple consonants to complex blends.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Initial Sounds</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Final Consonants</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Sound Blends</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Difficult Sounds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articulationGames.map((game) => {
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
                    <p className="text-sm font-medium text-gray-800 mb-1">Target Sounds:</p>
                    <p className="text-sm text-gray-700">{game.target}</p>
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
                  <div className="mb-6">
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
                    <span>{game.available ? 'Start Game' : 'Coming Soon'}</span>
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
            <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-green-700">Games Completed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-sm text-blue-700">Average Score</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-purple-700">Sounds Mastered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticulationHub;

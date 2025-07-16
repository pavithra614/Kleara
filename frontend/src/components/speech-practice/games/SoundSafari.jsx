import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiVolume2, FiHome, FiRefreshCw } from 'react-icons/fi';
import { SpeechRecognition, GameProgress, GameFeedback } from '../shared';

const SoundSafari = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [score, setScore] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'feedback', 'levelComplete'
  const [speechResult, setSpeechResult] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [completedAnimals, setCompletedAnimals] = useState([]);

  // Game data for different levels
  const levels = {
    1: {
      name: 'Isolated Sounds',
      description: 'Practice making individual sounds',
      animals: [
        { name: 'Bear', sound: '/b/', emoji: '🐻', habitat: 'forest' },
        { name: 'Mouse', sound: '/m/', emoji: '🐭', habitat: 'grass' },
        { name: 'Pig', sound: '/p/', emoji: '🐷', habitat: 'farm' },
        { name: 'Tiger', sound: '/t/', emoji: '🐅', habitat: 'jungle' },
        { name: 'Dog', sound: '/d/', emoji: '🐕', habitat: 'house' }
      ]
    },
    2: {
      name: 'Syllables',
      description: 'Practice sound combinations',
      animals: [
        { name: 'Baboon', sound: 'ba', emoji: '🐒', habitat: 'tree' },
        { name: 'Mama Bird', sound: 'ma', emoji: '🐦', habitat: 'nest' },
        { name: 'Papa Bear', sound: 'pa', emoji: '🐻', habitat: 'cave' },
        { name: 'Turtle', sound: 'ta', emoji: '🐢', habitat: 'pond' },
        { name: 'Duck', sound: 'da', emoji: '🦆', habitat: 'water' }
      ]
    },
    3: {
      name: 'Simple Words',
      description: 'Practice complete words',
      animals: [
        { name: 'Bee', sound: 'bee', emoji: '🐝', habitat: 'flower' },
        { name: 'Moo', sound: 'moo', emoji: '🐄', habitat: 'field' },
        { name: 'Pop', sound: 'pop', emoji: '🐸', habitat: 'lily' },
        { name: 'Top', sound: 'top', emoji: '🦎', habitat: 'rock' },
        { name: 'Dad', sound: 'dad', emoji: '🦁', habitat: 'den' }
      ]
    },
    4: {
      name: 'Short Phrases',
      description: 'Practice simple phrases',
      animals: [
        { name: 'Big Bear', sound: 'big bear', emoji: '🐻', habitat: 'mountain' },
        { name: 'My Mom', sound: 'my mom', emoji: '🦘', habitat: 'pouch' },
        { name: 'Pop Pop', sound: 'pop pop', emoji: '🐸', habitat: 'pond' },
        { name: 'Tap Tap', sound: 'tap tap', emoji: '🐦', habitat: 'branch' },
        { name: 'Dad Dog', sound: 'dad dog', emoji: '🐕', habitat: 'yard' }
      ]
    }
  };

  const currentLevelData = levels[currentLevel];
  const currentAnimalData = currentLevelData?.animals[currentAnimal];
  const totalAnimals = currentLevelData?.animals.length || 0;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle speech recognition result
  const handleSpeechResult = (result) => {
    setSpeechResult(result);
    setGameState('feedback');
    
    if (result.success) {
      setScore(prev => prev + Math.round(result.accuracy / 10));
      setCompletedAnimals(prev => [...prev, currentAnimal]);
    }
  };

  // Handle feedback continue
  const handleContinue = () => {
    if (currentAnimal < totalAnimals - 1) {
      setCurrentAnimal(prev => prev + 1);
      setGameState('playing');
      setSpeechResult(null);
    } else {
      // Level complete
      setGameState('levelComplete');
    }
  };

  // Handle retry
  const handleRetry = () => {
    setGameState('playing');
    setSpeechResult(null);
  };

  // Handle level complete
  const handleLevelComplete = () => {
    if (currentLevel < 4) {
      setCurrentLevel(prev => prev + 1);
      setCurrentAnimal(0);
      setCompletedAnimals([]);
      setGameState('playing');
      setSpeechResult(null);
    } else {
      // Game complete
      navigate('/speech-practice/articulation');
    }
  };

  // Handle animal click (for demonstration)
  const handleAnimalClick = () => {
    if (gameState === 'playing') {
      // Play animal sound (mock)
      console.log(`Playing sound for ${currentAnimalData.name}: ${currentAnimalData.sound}`);
    }
  };

  const getHabitatBackground = (habitat) => {
    const backgrounds = {
      forest: 'bg-gradient-to-b from-green-400 to-green-600',
      grass: 'bg-gradient-to-b from-green-300 to-green-500',
      farm: 'bg-gradient-to-b from-yellow-300 to-orange-400',
      jungle: 'bg-gradient-to-b from-green-500 to-green-700',
      house: 'bg-gradient-to-b from-blue-300 to-blue-500',
      tree: 'bg-gradient-to-b from-green-400 to-brown-400',
      nest: 'bg-gradient-to-b from-blue-200 to-green-300',
      cave: 'bg-gradient-to-b from-gray-400 to-gray-600',
      pond: 'bg-gradient-to-b from-blue-300 to-blue-600',
      water: 'bg-gradient-to-b from-blue-400 to-blue-700',
      flower: 'bg-gradient-to-b from-pink-300 to-yellow-400',
      field: 'bg-gradient-to-b from-green-300 to-yellow-300',
      lily: 'bg-gradient-to-b from-green-400 to-blue-400',
      rock: 'bg-gradient-to-b from-gray-300 to-gray-500',
      den: 'bg-gradient-to-b from-orange-400 to-brown-500',
      mountain: 'bg-gradient-to-b from-gray-300 to-green-400',
      pouch: 'bg-gradient-to-b from-brown-300 to-brown-500',
      branch: 'bg-gradient-to-b from-brown-400 to-green-400',
      yard: 'bg-gradient-to-b from-green-400 to-brown-300'
    };
    return backgrounds[habitat] || 'bg-gradient-to-b from-blue-400 to-green-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-green-200">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/speech-practice/articulation')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">🦁 Sound Safari</h1>
                <p className="text-gray-600">Level {currentLevel}: {currentLevelData?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/home')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiHome className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            {/* Level Progress */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Animal {currentAnimal + 1} of {totalAnimals}
                </span>
                <span className="text-sm text-gray-600">{currentLevelData?.description}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentAnimal + 1) / totalAnimals) * 100}%` }}
                />
              </div>
            </div>

            {/* Safari Scene */}
            <div className={`relative rounded-xl overflow-hidden h-96 ${getHabitatBackground(currentAnimalData?.habitat)} mb-6`}>
              {/* Background Elements */}
              <div className="absolute inset-0">
                {/* Sky/Background */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-300/30 to-transparent" />
                
                {/* Ground/Habitat specific elements */}
                {currentAnimalData?.habitat === 'forest' && (
                  <>
                    <div className="absolute bottom-0 left-4 text-6xl">🌲</div>
                    <div className="absolute bottom-0 right-8 text-4xl">🌳</div>
                    <div className="absolute top-8 left-1/4 text-2xl">☁️</div>
                  </>
                )}
                {currentAnimalData?.habitat === 'jungle' && (
                  <>
                    <div className="absolute bottom-0 left-2 text-5xl">🌴</div>
                    <div className="absolute bottom-0 right-4 text-6xl">🌿</div>
                    <div className="absolute top-4 right-1/4 text-3xl">🦜</div>
                  </>
                )}
                {currentAnimalData?.habitat === 'water' && (
                  <>
                    <div className="absolute bottom-4 left-8 text-4xl">🌊</div>
                    <div className="absolute bottom-2 right-12 text-3xl">🐟</div>
                    <div className="absolute top-8 left-1/3 text-2xl">☁️</div>
                  </>
                )}
              </div>

              {/* Main Animal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handleAnimalClick}
                  className="group relative transform hover:scale-110 transition-all duration-300 focus:outline-none"
                  disabled={gameState !== 'playing'}
                >
                  <div className="text-8xl animate-bounce">
                    {currentAnimalData?.emoji}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium text-gray-800">
                      Click to hear!
                    </span>
                  </div>
                </button>
              </div>

              {/* Animal Name and Target */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h3 className="text-lg font-bold text-gray-900">{currentAnimalData?.name}</h3>
                <p className="text-sm text-gray-600">
                  Say: <span className="font-bold text-blue-600">{currentAnimalData?.sound}</span>
                </p>
              </div>

              {/* Sound Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleAnimalClick}
                  className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FiVolume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Speech Recognition or Feedback */}
            {gameState === 'playing' && (
              <SpeechRecognition
                targetWord={currentAnimalData?.name}
                targetSound={currentAnimalData?.sound}
                onResult={handleSpeechResult}
                isListening={isListening}
                onToggleListening={setIsListening}
                difficulty="beginner"
                showVisualFeedback={true}
              />
            )}

            {gameState === 'feedback' && speechResult && (
              <GameFeedback
                result={speechResult}
                onContinue={handleContinue}
                onRetry={handleRetry}
                showRetryOption={!speechResult.success}
                showContinueOption={true}
                autoAdvanceDelay={speechResult.success ? 3 : null}
                encouragementLevel="enthusiastic"
              />
            )}

            {gameState === 'levelComplete' && (
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Complete!</h2>
                <p className="text-gray-600 mb-6">
                  Great job completing {currentLevelData?.name}!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleLevelComplete}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {currentLevel < 4 ? 'Next Level' : 'Complete Game'}
                  </button>
                  <button
                    onClick={() => navigate('/speech-practice/articulation')}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back to Games
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <GameProgress
              currentLevel={currentLevel}
              totalLevels={4}
              score={score}
              maxScore={totalAnimals * 10 * currentLevel}
              timeElapsed={timeElapsed}
              targetsSolved={completedAnimals.length}
              totalTargets={totalAnimals}
              achievements={[
                { name: 'First Sound', description: 'Made your first animal sound!' },
                { name: 'Safari Explorer', description: 'Visited 3 different habitats' }
              ]}
              onLevelComplete={handleLevelComplete}
              showDetailedStats={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundSafari;

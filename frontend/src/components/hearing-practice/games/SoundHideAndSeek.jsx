import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiVolume2, FiMapPin } from 'react-icons/fi';
import { AudioPlayer, SoundDetection, HearingProgress } from '../shared';

const SoundHideAndSeek = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameState, setGameState] = useState('instructions'); // 'instructions', 'listening', 'guessing', 'feedback', 'levelComplete'
  const [puppyLocation, setPuppyLocation] = useState('center');
  const [hasSound, setHasSound] = useState(true);
  const [userGuess, setUserGuess] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [completedRounds, setCompletedRounds] = useState([]);
  const [showPuppy, setShowPuppy] = useState(false);

  // Game levels with increasing difficulty
  const levels = {
    1: {
      name: 'Easy Detection',
      description: 'Find the puppy with clear, loud barks',
      rounds: 6,
      soundPresenceRate: 0.8, // 80% of rounds have sound
      volume: 0.9,
      backgroundNoise: false,
      timeLimit: 5000
    },
    2: {
      name: 'Medium Detection',
      description: 'Puppy barks more quietly sometimes',
      rounds: 8,
      soundPresenceRate: 0.7,
      volume: 0.7,
      backgroundNoise: false,
      timeLimit: 4000
    },
    3: {
      name: 'Tricky Hiding',
      description: 'Sometimes the puppy is silent!',
      rounds: 10,
      soundPresenceRate: 0.6,
      volume: 0.6,
      backgroundNoise: false,
      timeLimit: 3500
    },
    4: {
      name: 'Expert Level',
      description: 'Quiet barks with background sounds',
      rounds: 12,
      soundPresenceRate: 0.5,
      volume: 0.5,
      backgroundNoise: true,
      timeLimit: 3000
    }
  };

  const currentLevelData = levels[currentLevel];
  const totalRounds = currentLevelData?.rounds || 6;
  const bushPositions = ['left', 'center', 'right'];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Start new round
  const startNewRound = () => {
    // Randomly determine if there's a sound this round
    const willHaveSound = Math.random() < currentLevelData.soundPresenceRate;
    setHasSound(willHaveSound);
    
    if (willHaveSound) {
      // Randomly place puppy behind one of the bushes
      const randomPosition = bushPositions[Math.floor(Math.random() * bushPositions.length)];
      setPuppyLocation(randomPosition);
    }
    
    setUserGuess(null);
    setDetectionResult(null);
    setShowPuppy(false);
    setGameState('listening');
  };

  // Handle user's bush selection
  const handleBushClick = (position) => {
    if (gameState !== 'guessing') return;
    
    setUserGuess(position);
    setShowPuppy(true);
    
    // Determine if guess was correct
    let result = {
      success: false,
      accuracy: 0,
      feedback: '',
      hasSound,
      puppyLocation,
      userGuess: position
    };

    if (!hasSound) {
      // No sound round - any guess should be "no sound" but we'll handle this differently
      result.success = false;
      result.accuracy = 30;
      result.feedback = 'The puppy was sleeping silently! No bark this time.';
    } else if (position === puppyLocation) {
      // Correct guess
      result.success = true;
      result.accuracy = 85 + Math.random() * 15;
      result.feedback = 'Perfect! You found the puppy!';
      setScore(prev => prev + Math.round(result.accuracy / 10));
      setCompletedRounds(prev => [...prev, currentRound]);
    } else {
      // Wrong bush
      result.accuracy = 25 + Math.random() * 30;
      result.feedback = `Not quite! The puppy was behind the ${puppyLocation} bush.`;
    }

    setDetectionResult(result);
    setGameState('feedback');
  };

  // Handle "No Sound" button
  const handleNoSoundGuess = () => {
    if (gameState !== 'guessing') return;
    
    setUserGuess('no_sound');
    
    let result = {
      success: !hasSound,
      accuracy: !hasSound ? 80 + Math.random() * 20 : 20 + Math.random() * 30,
      feedback: !hasSound ? 
        'Excellent! You correctly detected no sound!' : 
        'Oops! There was a bark - listen more carefully!',
      hasSound,
      puppyLocation,
      userGuess: 'no_sound'
    };

    if (result.success) {
      setScore(prev => prev + Math.round(result.accuracy / 10));
      setCompletedRounds(prev => [...prev, currentRound]);
    }

    setDetectionResult(result);
    setGameState('feedback');
  };

  // Handle audio play end
  const handleAudioEnd = () => {
    setGameState('guessing');
  };

  // Continue to next round
  const handleContinue = () => {
    if (currentRound < totalRounds - 1) {
      setCurrentRound(prev => prev + 1);
      startNewRound();
    } else {
      setGameState('levelComplete');
    }
  };

  // Handle level complete
  const handleLevelComplete = () => {
    if (currentLevel < 4) {
      setCurrentLevel(prev => prev + 1);
      setCurrentRound(0);
      setCompletedRounds([]);
      setGameState('instructions');
    } else {
      navigate('/hearing-practice/auditory-awareness');
    }
  };

  // Start game
  const handleStartGame = () => {
    startNewRound();
  };

  const getBushEmoji = (position) => {
    if (showPuppy && hasSound && position === puppyLocation) {
      return '🐶'; // Show puppy
    }
    return '🌳'; // Show bush
  };

  const getBushAnimation = (position) => {
    if (gameState === 'listening' && hasSound && position === puppyLocation) {
      return 'animate-pulse'; // Subtle hint during listening
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-200">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/hearing-practice/auditory-awareness')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">🐶 Sound Hide-and-Seek</h1>
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
            {/* Round Progress */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Round {currentRound + 1} of {totalRounds}
                </span>
                <span className="text-sm text-gray-600">{currentLevelData?.description}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentRound + 1) / totalRounds) * 100}%` }}
                />
              </div>
            </div>

            {/* Instructions */}
            {gameState === 'instructions' && (
              <div className="bg-white rounded-xl p-8 text-center mb-6">
                <div className="text-6xl mb-4">🐶</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Play Hide-and-Seek!</h2>
                <p className="text-gray-600 mb-6">
                  A playful puppy is hiding behind one of the bushes. Listen carefully for the bark 
                  and click the bush where you think the puppy is hiding. Sometimes the puppy might 
                  be sleeping silently!
                </p>
                <button
                  onClick={handleStartGame}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Start Playing!
                </button>
              </div>
            )}

            {/* Game Scene */}
            {(gameState === 'listening' || gameState === 'guessing' || gameState === 'feedback') && (
              <div className="bg-gradient-to-b from-sky-100 to-green-100 rounded-xl p-8 mb-6 min-h-96">
                {/* Sky and clouds */}
                <div className="text-center mb-8">
                  <div className="text-4xl mb-2">☀️ ☁️ ☁️</div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {gameState === 'listening' ? 'Listen carefully...' :
                     gameState === 'guessing' ? 'Where is the puppy?' :
                     'Round Complete!'}
                  </h3>
                </div>

                {/* Bushes */}
                <div className="flex justify-center space-x-8 mb-8">
                  {bushPositions.map((position) => (
                    <button
                      key={position}
                      onClick={() => handleBushClick(position)}
                      disabled={gameState !== 'guessing'}
                      className={`text-8xl transition-all duration-300 ${
                        gameState === 'guessing' ? 'hover:scale-110 cursor-pointer' : ''
                      } ${getBushAnimation(position)} focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 rounded-lg`}
                    >
                      {getBushEmoji(position)}
                    </button>
                  ))}
                </div>

                {/* Position Labels */}
                <div className="flex justify-center space-x-16 mb-6">
                  <span className="text-sm text-gray-600">Left</span>
                  <span className="text-sm text-gray-600">Center</span>
                  <span className="text-sm text-gray-600">Right</span>
                </div>

                {/* No Sound Button */}
                {gameState === 'guessing' && (
                  <div className="text-center">
                    <button
                      onClick={handleNoSoundGuess}
                      className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                    >
                      <FiVolume2 className="w-5 h-5 inline mr-2" />
                      No Sound / Puppy is Sleeping
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Audio Player */}
            {gameState === 'listening' && hasSound && (
              <AudioPlayer
                soundType="animal"
                soundName="bark"
                volume={currentLevelData.volume}
                autoPlay={true}
                showControls={false}
                onEnd={handleAudioEnd}
                direction={puppyLocation}
                backgroundNoise={currentLevelData.backgroundNoise}
                visualFeedback={true}
              />
            )}

            {/* Silent Round Indicator */}
            {gameState === 'listening' && !hasSound && (
              <div className="bg-white rounded-xl p-6 text-center">
                <FiVolume2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Listen Carefully...</h3>
                <p className="text-gray-600 mb-4">Is the puppy making any sound?</p>
                <button
                  onClick={() => setGameState('guessing')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  I'm Ready to Guess
                </button>
              </div>
            )}

            {/* Feedback */}
            {gameState === 'feedback' && detectionResult && (
              <div className={`rounded-xl p-6 ${
                detectionResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {detectionResult.success ? '🎉' : '😊'}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    detectionResult.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {detectionResult.feedback}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    detectionResult.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    Accuracy: {Math.round(detectionResult.accuracy)}%
                  </p>
                  <button
                    onClick={handleContinue}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {currentRound < totalRounds - 1 ? 'Next Round' : 'Complete Level'}
                  </button>
                </div>
              </div>
            )}

            {/* Level Complete */}
            {gameState === 'levelComplete' && (
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🏆</div>
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
                    onClick={() => navigate('/hearing-practice/auditory-awareness')}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back to Activities
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <HearingProgress
              currentLevel={currentLevel}
              totalLevels={4}
              score={score}
              maxScore={totalRounds * 10 * currentLevel}
              timeElapsed={timeElapsed}
              soundsDetected={completedRounds.length}
              totalSounds={totalRounds}
              achievements={[
                { name: 'First Find', description: 'Found the puppy for the first time!' },
                { name: 'Silent Detective', description: 'Correctly detected silence!' }
              ]}
              onLevelComplete={handleLevelComplete}
              hearingSkillType="detection"
              showDetailedStats={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundHideAndSeek;

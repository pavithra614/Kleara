import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiEye, FiStar } from 'react-icons/fi';
import { SpeechRecognition, GameProgress, GameFeedback } from '../shared';

const MagicMirror = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentSound, setCurrentSound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'feedback', 'levelComplete'
  const [speechResult, setSpeechResult] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [completedSounds, setCompletedSounds] = useState([]);
  const [mirrorEffect, setMirrorEffect] = useState('normal');

  // Difficult sounds practice data
  const levels = {
    1: {
      name: 'R Sound Practice',
      description: 'Master the tricky /r/ sound',
      sounds: [
        { target: 'red', sound: '/r/', tip: 'Curl your tongue back slightly', emoji: '🔴' },
        { target: 'run', sound: '/r/', tip: 'Keep your tongue away from your teeth', emoji: '🏃' },
        { target: 'rain', sound: '/r/', tip: 'Make your tongue into a cup shape', emoji: '🌧️' },
        { target: 'rabbit', sound: '/r/', tip: 'Start with your mouth slightly open', emoji: '🐰' }
      ]
    },
    2: {
      name: 'S Sound Practice',
      description: 'Perfect your /s/ sound',
      sounds: [
        { target: 'sun', sound: '/s/', tip: 'Put your tongue behind your teeth', emoji: '☀️' },
        { target: 'snake', sound: '/s/', tip: 'Make a thin stream of air', emoji: '🐍' },
        { target: 'star', sound: '/s/', tip: 'Keep your teeth close together', emoji: '⭐' },
        { target: 'smile', sound: '/s/', tip: 'Blow air gently through your teeth', emoji: '😊' }
      ]
    },
    3: {
      name: 'L Sound Practice',
      description: 'Learn the /l/ sound',
      sounds: [
        { target: 'lion', sound: '/l/', tip: 'Touch your tongue to the roof of your mouth', emoji: '🦁' },
        { target: 'love', sound: '/l/', tip: 'Let air flow around your tongue', emoji: '❤️' },
        { target: 'light', sound: '/l/', tip: 'Keep your tongue tip up', emoji: '💡' },
        { target: 'laugh', sound: '/l/', tip: 'Start with tongue touching the top', emoji: '😂' }
      ]
    }
  };

  const currentLevelData = levels[currentLevel];
  const currentSoundData = currentLevelData?.sounds[currentSound];
  const totalSounds = currentLevelData?.sounds.length || 0;

  // Mirror effects for feedback
  const mirrorEffects = {
    normal: 'transform-none',
    sparkle: 'animate-pulse bg-gradient-to-r from-yellow-200 to-pink-200',
    rainbow: 'animate-bounce bg-gradient-to-r from-red-200 via-yellow-200 to-blue-200',
    magic: 'animate-spin bg-gradient-to-r from-purple-200 to-indigo-200'
  };

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
    
    // Set mirror effect based on result
    if (result.accuracy >= 90) {
      setMirrorEffect('magic');
    } else if (result.accuracy >= 75) {
      setMirrorEffect('rainbow');
    } else if (result.accuracy >= 60) {
      setMirrorEffect('sparkle');
    } else {
      setMirrorEffect('normal');
    }
    
    if (result.success) {
      setScore(prev => prev + Math.round(result.accuracy / 10));
      setCompletedSounds(prev => [...prev, currentSound]);
    }

    // Reset mirror effect after animation
    setTimeout(() => setMirrorEffect('normal'), 3000);
  };

  // Handle feedback continue
  const handleContinue = () => {
    if (currentSound < totalSounds - 1) {
      setCurrentSound(prev => prev + 1);
      setGameState('playing');
      setSpeechResult(null);
    } else {
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
    if (currentLevel < 3) {
      setCurrentLevel(prev => prev + 1);
      setCurrentSound(0);
      setCompletedSounds([]);
      setGameState('playing');
      setSpeechResult(null);
    } else {
      navigate('/speech-practice/articulation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-200 to-purple-200">
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
                <h1 className="text-2xl font-bold text-gray-900">🪞 Magic Mirror</h1>
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
                  Sound {currentSound + 1} of {totalSounds}
                </span>
                <span className="text-sm text-gray-600">{currentLevelData?.description}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSound + 1) / totalSounds) * 100}%` }}
                />
              </div>
            </div>

            {/* Magic Mirror */}
            <div className="relative bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl p-8 mb-6 min-h-96">
              {/* Mirror Frame */}
              <div className="absolute inset-4 border-8 border-yellow-400 rounded-xl bg-gradient-to-b from-blue-50 to-purple-50 overflow-hidden">
                {/* Mirror Surface with Effects */}
                <div className={`w-full h-full flex flex-col items-center justify-center ${mirrorEffects[mirrorEffect]} transition-all duration-1000`}>
                  {/* Target Word Display */}
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{currentSoundData?.emoji}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Say: "{currentSoundData?.target}"
                    </h3>
                    <p className="text-lg text-purple-600 font-medium">
                      Focus on: {currentSoundData?.sound}
                    </p>
                  </div>

                  {/* Mirror Character */}
                  <div className="relative">
                    <div className="text-8xl animate-pulse">🪞</div>
                    {mirrorEffect !== 'normal' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl animate-bounce">✨</div>
                      </div>
                    )}
                  </div>

                  {/* Pronunciation Tip */}
                  <div className="mt-8 bg-white/80 rounded-lg p-4 max-w-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiEye className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-800">Pronunciation Tip:</span>
                    </div>
                    <p className="text-gray-700">{currentSoundData?.tip}</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-2 left-2 text-2xl">✨</div>
              <div className="absolute top-2 right-2 text-2xl">✨</div>
              <div className="absolute bottom-2 left-2 text-2xl">🌟</div>
              <div className="absolute bottom-2 right-2 text-2xl">🌟</div>
            </div>

            {/* Speech Recognition or Feedback */}
            {gameState === 'playing' && (
              <SpeechRecognition
                targetWord={currentSoundData?.target}
                targetSound={currentSoundData?.sound}
                onResult={handleSpeechResult}
                isListening={isListening}
                onToggleListening={setIsListening}
                difficulty="advanced"
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
                autoAdvanceDelay={speechResult.success ? 4 : null}
                encouragementLevel="enthusiastic"
              />
            )}

            {gameState === 'levelComplete' && (
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Complete!</h2>
                <p className="text-gray-600 mb-6">
                  Amazing work mastering {currentLevelData?.name}!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleLevelComplete}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {currentLevel < 3 ? 'Next Level' : 'Complete Game'}
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
              totalLevels={3}
              score={score}
              maxScore={totalSounds * 10 * currentLevel}
              timeElapsed={timeElapsed}
              targetsSolved={completedSounds.length}
              totalTargets={totalSounds}
              achievements={[
                { name: 'Mirror Magic', description: 'Made the mirror sparkle!' },
                { name: 'Sound Master', description: 'Perfect pronunciation!' }
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

export default MagicMirror;

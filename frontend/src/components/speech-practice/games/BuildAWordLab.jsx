import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiRotateCcw, FiCheck, FiPlay } from 'react-icons/fi';
import { SpeechRecognition, GameProgress, GameFeedback } from '../shared';

const BuildAWordLab = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameState, setGameState] = useState('building'); // 'building', 'speaking', 'feedback', 'levelComplete'
  const [builtWord, setBuiltWord] = useState([]);
  const [speechResult, setSpeechResult] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [completedWords, setCompletedWords] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  // Game data for different levels
  const levels = {
    1: {
      name: 'Simple CV Words',
      description: 'Build consonant-vowel words',
      words: [
        { target: 'be', letters: ['b', 'e'], animation: '🐝', sound: 'bee' },
        { target: 'go', letters: ['g', 'o'], animation: '🚗', sound: 'go' },
        { target: 'me', letters: ['m', 'e'], animation: '👶', sound: 'me' },
        { target: 'no', letters: ['n', 'o'], animation: '❌', sound: 'no' },
        { target: 'so', letters: ['s', 'o'], animation: '✨', sound: 'so' }
      ]
    },
    2: {
      name: 'CVC Words',
      description: 'Build consonant-vowel-consonant words',
      words: [
        { target: 'cat', letters: ['c', 'a', 't'], animation: '🐱', sound: 'cat' },
        { target: 'dog', letters: ['d', 'o', 'g'], animation: '🐕', sound: 'dog' },
        { target: 'sun', letters: ['s', 'u', 'n'], animation: '☀️', sound: 'sun' },
        { target: 'hat', letters: ['h', 'a', 't'], animation: '👒', sound: 'hat' },
        { target: 'pen', letters: ['p', 'e', 'n'], animation: '✏️', sound: 'pen' }
      ]
    },
    3: {
      name: 'Blends (CCVC)',
      description: 'Build words with consonant blends',
      words: [
        { target: 'blue', letters: ['b', 'l', 'u', 'e'], animation: '💙', sound: 'blue' },
        { target: 'tree', letters: ['t', 'r', 'e', 'e'], animation: '🌳', sound: 'tree' },
        { target: 'star', letters: ['s', 't', 'a', 'r'], animation: '⭐', sound: 'star' },
        { target: 'frog', letters: ['f', 'r', 'o', 'g'], animation: '🐸', sound: 'frog' },
        { target: 'play', letters: ['p', 'l', 'a', 'y'], animation: '🎮', sound: 'play' }
      ]
    },
    4: {
      name: 'Complex Blends',
      description: 'Build longer words with multiple blends',
      words: [
        { target: 'train', letters: ['t', 'r', 'a', 'i', 'n'], animation: '🚂', sound: 'train' },
        { target: 'plant', letters: ['p', 'l', 'a', 'n', 't'], animation: '🌱', sound: 'plant' },
        { target: 'smile', letters: ['s', 'm', 'i', 'l', 'e'], animation: '😊', sound: 'smile' },
        { target: 'brave', letters: ['b', 'r', 'a', 'v', 'e'], animation: '🦸', sound: 'brave' },
        { target: 'green', letters: ['g', 'r', 'e', 'e', 'n'], animation: '💚', sound: 'green' }
      ]
    },
    5: {
      name: 'Multisyllabic Words',
      description: 'Build longer multisyllabic words',
      words: [
        { target: 'robot', letters: ['r', 'o', 'b', 'o', 't'], animation: '🤖', sound: 'robot' },
        { target: 'happy', letters: ['h', 'a', 'p', 'p', 'y'], animation: '😄', sound: 'happy' },
        { target: 'tiger', letters: ['t', 'i', 'g', 'e', 'r'], animation: '🐅', sound: 'tiger' },
        { target: 'magic', letters: ['m', 'a', 'g', 'i', 'c'], animation: '✨', sound: 'magic' },
        { target: 'flower', letters: ['f', 'l', 'o', 'w', 'e', 'r'], animation: '🌸', sound: 'flower' }
      ]
    }
  };

  const currentLevelData = levels[currentLevel];
  const currentWordData = currentLevelData?.words[currentWord];
  const totalWords = currentLevelData?.words.length || 0;

  // Available letters (shuffled)
  const [availableLetters, setAvailableLetters] = useState([]);

  // Initialize available letters when word changes
  useEffect(() => {
    if (currentWordData) {
      const shuffled = [...currentWordData.letters].sort(() => Math.random() - 0.5);
      // Add some extra letters to make it more challenging
      const extraLetters = ['a', 'e', 'i', 'o', 'u', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
      const randomExtras = extraLetters
        .filter(letter => !currentWordData.letters.includes(letter))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      setAvailableLetters([...shuffled, ...randomExtras].sort(() => Math.random() - 0.5));
    }
  }, [currentWordData]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle letter click
  const handleLetterClick = (letter, index) => {
    if (gameState === 'building' && builtWord.length < currentWordData.target.length) {
      setBuiltWord(prev => [...prev, letter]);
      setAvailableLetters(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Handle remove letter
  const handleRemoveLetter = (index) => {
    if (gameState === 'building') {
      const removedLetter = builtWord[index];
      setBuiltWord(prev => prev.filter((_, i) => i !== index));
      setAvailableLetters(prev => [...prev, removedLetter]);
    }
  };

  // Check if word is correct
  const isWordCorrect = () => {
    return builtWord.join('') === currentWordData.target;
  };

  // Handle word completion
  const handleWordComplete = () => {
    if (isWordCorrect()) {
      setShowAnimation(true);
      setTimeout(() => {
        setGameState('speaking');
        setShowAnimation(false);
      }, 2000);
    }
  };

  // Handle speech result
  const handleSpeechResult = (result) => {
    setSpeechResult(result);
    setGameState('feedback');
    
    if (result.success) {
      setScore(prev => prev + Math.round(result.accuracy / 10) + (isWordCorrect() ? 5 : 0));
      setCompletedWords(prev => [...prev, currentWord]);
    }
  };

  // Handle feedback continue
  const handleContinue = () => {
    if (currentWord < totalWords - 1) {
      setCurrentWord(prev => prev + 1);
      setBuiltWord([]);
      setGameState('building');
      setSpeechResult(null);
    } else {
      setGameState('levelComplete');
    }
  };

  // Handle retry
  const handleRetry = () => {
    setGameState('speaking');
    setSpeechResult(null);
  };

  // Handle level complete
  const handleLevelComplete = () => {
    if (currentLevel < 5) {
      setCurrentLevel(prev => prev + 1);
      setCurrentWord(0);
      setBuiltWord([]);
      setCompletedWords([]);
      setGameState('building');
      setSpeechResult(null);
    } else {
      navigate('/speech-practice/articulation');
    }
  };

  // Reset current word
  const handleReset = () => {
    setBuiltWord([]);
    const shuffled = [...currentWordData.letters].sort(() => Math.random() - 0.5);
    const extraLetters = ['a', 'e', 'i', 'o', 'u', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    const randomExtras = extraLetters
      .filter(letter => !currentWordData.letters.includes(letter))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    setAvailableLetters([...shuffled, ...randomExtras].sort(() => Math.random() - 0.5));
    setGameState('building');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-blue-200">
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
                <h1 className="text-2xl font-bold text-gray-900">🧪 Build-a-Word Lab</h1>
                <p className="text-gray-600">Level {currentLevel}: {currentLevelData?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleReset}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Reset word"
              >
                <FiRotateCcw className="w-5 h-5" />
              </button>
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
                  Word {currentWord + 1} of {totalWords}
                </span>
                <span className="text-sm text-gray-600">{currentLevelData?.description}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentWord + 1) / totalWords) * 100}%` }}
                />
              </div>
            </div>

            {/* Lab Scene */}
            <div className="relative bg-gradient-to-b from-blue-100 to-purple-100 rounded-xl p-8 mb-6 min-h-96">
              {/* Lab Background */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute top-4 left-4 text-4xl">🧪</div>
                <div className="absolute top-4 right-4 text-3xl">⚗️</div>
                <div className="absolute bottom-4 left-8 text-2xl">🔬</div>
                <div className="absolute bottom-4 right-8 text-2xl">📊</div>
              </div>

              {/* Target Word Display */}
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Build this word:</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {currentWordData?.target}
                </div>
                <div className="text-6xl mb-4">
                  {showAnimation ? (
                    <div className="animate-bounce">{currentWordData?.animation}</div>
                  ) : (
                    currentWordData?.animation
                  )}
                </div>
              </div>

              {/* Word Building Area */}
              <div className="bg-white/80 rounded-lg p-6 mb-6">
                <h4 className="text-center text-gray-700 font-medium mb-4">Your Word:</h4>
                <div className="flex justify-center space-x-2 mb-4 min-h-16">
                  {Array.from({ length: currentWordData?.target.length || 0 }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xl font-bold cursor-pointer transition-all ${
                        builtWord[index] 
                          ? 'bg-purple-100 border-purple-400 text-purple-700' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => builtWord[index] && handleRemoveLetter(index)}
                    >
                      {builtWord[index] || ''}
                    </div>
                  ))}
                </div>
                
                {/* Check Button */}
                {builtWord.length === currentWordData?.target.length && (
                  <div className="text-center">
                    <button
                      onClick={handleWordComplete}
                      disabled={!isWordCorrect()}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        isWordCorrect()
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <FiCheck className="w-5 h-5 inline mr-2" />
                      {isWordCorrect() ? 'Perfect! Say the word' : 'Not quite right...'}
                    </button>
                  </div>
                )}
              </div>

              {/* Available Letters */}
              {gameState === 'building' && (
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="text-center text-gray-700 font-medium mb-4">Letter Blocks:</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {availableLetters.map((letter, index) => (
                      <button
                        key={index}
                        onClick={() => handleLetterClick(letter, index)}
                        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Speech Recognition or Feedback */}
            {gameState === 'speaking' && (
              <SpeechRecognition
                targetWord={currentWordData?.target}
                targetSound={currentWordData?.sound}
                onResult={handleSpeechResult}
                isListening={isListening}
                onToggleListening={setIsListening}
                difficulty="intermediate"
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
                encouragementLevel="normal"
              />
            )}

            {gameState === 'levelComplete' && (
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Complete!</h2>
                <p className="text-gray-600 mb-6">
                  Excellent work building {currentLevelData?.name}!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleLevelComplete}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {currentLevel < 5 ? 'Next Level' : 'Complete Game'}
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
              totalLevels={5}
              score={score}
              maxScore={totalWords * 15 * currentLevel}
              timeElapsed={timeElapsed}
              targetsSolved={completedWords.length}
              totalTargets={totalWords}
              achievements={[
                { name: 'Word Builder', description: 'Built your first word!' },
                { name: 'Blend Master', description: 'Mastered consonant blends' }
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

export default BuildAWordLab;

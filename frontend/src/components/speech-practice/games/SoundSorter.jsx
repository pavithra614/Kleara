import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiCheck, FiX } from 'react-icons/fi';
import { SpeechRecognition, GameProgress, GameFeedback } from '../shared';

const SoundSorter = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentPair, setCurrentPair] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameState, setGameState] = useState('sorting'); // 'sorting', 'speaking', 'feedback', 'levelComplete'
  const [speechResult, setSpeechResult] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [completedPairs, setCompletedPairs] = useState([]);
  const [sortedItems, setSortedItems] = useState({ bin1: [], bin2: [] });
  const [selectedWord, setSelectedWord] = useState(null);

  // Sound discrimination pairs
  const levels = {
    1: {
      name: 'S vs SH Sounds',
      description: 'Sort /s/ and /sh/ sounds',
      sound1: '/s/',
      sound2: '/sh/',
      bin1Label: 'S Sound',
      bin2Label: 'SH Sound',
      pairs: [
        { word: 'sock', sound: '/s/', bin: 'bin1', emoji: '🧦' },
        { word: 'shark', sound: '/sh/', bin: 'bin2', emoji: '🦈' },
        { word: 'sun', sound: '/s/', bin: 'bin1', emoji: '☀️' },
        { word: 'ship', sound: '/sh/', bin: 'bin2', emoji: '🚢' },
        { word: 'snake', sound: '/s/', bin: 'bin1', emoji: '🐍' },
        { word: 'shoe', sound: '/sh/', bin: 'bin2', emoji: '👟' }
      ]
    },
    2: {
      name: 'B vs P Sounds',
      description: 'Sort /b/ and /p/ sounds',
      sound1: '/b/',
      sound2: '/p/',
      bin1Label: 'B Sound',
      bin2Label: 'P Sound',
      pairs: [
        { word: 'ball', sound: '/b/', bin: 'bin1', emoji: '⚽' },
        { word: 'pig', sound: '/p/', bin: 'bin2', emoji: '🐷' },
        { word: 'bear', sound: '/b/', bin: 'bin1', emoji: '🐻' },
        { word: 'pen', sound: '/p/', bin: 'bin2', emoji: '✏️' },
        { word: 'book', sound: '/b/', bin: 'bin1', emoji: '📚' },
        { word: 'pizza', sound: '/p/', bin: 'bin2', emoji: '🍕' }
      ]
    },
    3: {
      name: 'T vs D Sounds',
      description: 'Sort /t/ and /d/ sounds',
      sound1: '/t/',
      sound2: '/d/',
      bin1Label: 'T Sound',
      bin2Label: 'D Sound',
      pairs: [
        { word: 'top', sound: '/t/', bin: 'bin1', emoji: '🔝' },
        { word: 'dog', sound: '/d/', bin: 'bin2', emoji: '🐕' },
        { word: 'tree', sound: '/t/', bin: 'bin1', emoji: '🌳' },
        { word: 'duck', sound: '/d/', bin: 'bin2', emoji: '🦆' },
        { word: 'toy', sound: '/t/', bin: 'bin1', emoji: '🧸' },
        { word: 'door', sound: '/d/', bin: 'bin2', emoji: '🚪' }
      ]
    },
    4: {
      name: 'Mixed Review',
      description: 'Sort various sound pairs',
      sound1: 'Mixed',
      sound2: 'Sounds',
      bin1Label: 'First Sound',
      bin2Label: 'Second Sound',
      pairs: [
        { word: 'cat', sound: '/k/', bin: 'bin1', emoji: '🐱' },
        { word: 'goat', sound: '/g/', bin: 'bin2', emoji: '🐐' },
        { word: 'fish', sound: '/f/', bin: 'bin1', emoji: '🐟' },
        { word: 'van', sound: '/v/', bin: 'bin2', emoji: '🚐' },
        { word: 'mouse', sound: '/m/', bin: 'bin1', emoji: '🐭' },
        { word: 'nose', sound: '/n/', bin: 'bin2', emoji: '👃' }
      ]
    }
  };

  const currentLevelData = levels[currentLevel];
  const availableItems = currentLevelData?.pairs.filter(item => 
    !sortedItems.bin1.includes(item) && !sortedItems.bin2.includes(item)
  ) || [];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle item drop into bin
  const handleItemDrop = (item, binId) => {
    const isCorrect = item.bin === binId;
    
    if (isCorrect) {
      setSortedItems(prev => ({
        ...prev,
        [binId]: [...prev[binId], item]
      }));
      setScore(prev => prev + 10);
    } else {
      // Wrong bin - show feedback but don't add to bin
      alert(`Oops! "${item.word}" belongs in the ${item.bin === 'bin1' ? currentLevelData.bin1Label : currentLevelData.bin2Label} bin.`);
    }
  };

  // Handle word selection for pronunciation
  const handleWordSelect = (word) => {
    setSelectedWord(word);
    setGameState('speaking');
  };

  // Handle speech recognition result
  const handleSpeechResult = (result) => {
    setSpeechResult(result);
    setGameState('feedback');
    
    if (result.success) {
      setScore(prev => prev + Math.round(result.accuracy / 10));
    }
  };

  // Handle feedback continue
  const handleContinue = () => {
    setSelectedWord(null);
    setGameState('sorting');
    setSpeechResult(null);
    
    // Check if level is complete
    if (sortedItems.bin1.length + sortedItems.bin2.length >= currentLevelData.pairs.length) {
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
    if (currentLevel < 4) {
      setCurrentLevel(prev => prev + 1);
      setSortedItems({ bin1: [], bin2: [] });
      setCompletedPairs([]);
      setGameState('sorting');
      setSpeechResult(null);
      setSelectedWord(null);
    } else {
      navigate('/speech-practice/articulation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-yellow-200">
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
                <h1 className="text-2xl font-bold text-gray-900">🧩 Sound Sorter</h1>
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
            {/* Instructions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-6">
              <p className="text-center text-gray-700">
                <strong>Instructions:</strong> Drag words to the correct sound bins, then click to practice saying them!
              </p>
            </div>

            {/* Sorting Area */}
            {gameState === 'sorting' && (
              <div className="space-y-6">
                {/* Sorting Bins */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Bin 1 */}
                  <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-6 min-h-48">
                    <h3 className="text-lg font-bold text-blue-800 text-center mb-4">
                      {currentLevelData?.bin1Label}
                    </h3>
                    <div className="space-y-2">
                      {sortedItems.bin1.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleWordSelect(item.word)}
                          className="w-full p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex items-center space-x-3"
                        >
                          <span className="text-2xl">{item.emoji}</span>
                          <span className="font-medium">{item.word}</span>
                          <FiCheck className="w-4 h-4 text-green-500 ml-auto" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bin 2 */}
                  <div className="bg-green-100 border-2 border-green-300 rounded-xl p-6 min-h-48">
                    <h3 className="text-lg font-bold text-green-800 text-center mb-4">
                      {currentLevelData?.bin2Label}
                    </h3>
                    <div className="space-y-2">
                      {sortedItems.bin2.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleWordSelect(item.word)}
                          className="w-full p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex items-center space-x-3"
                        >
                          <span className="text-2xl">{item.emoji}</span>
                          <span className="font-medium">{item.word}</span>
                          <FiCheck className="w-4 h-4 text-green-500 ml-auto" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Available Items */}
                <div className="bg-white/90 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
                    Drag these words to the correct bins:
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {availableItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-center cursor-pointer hover:bg-yellow-200 transition-colors"
                      >
                        <div className="text-3xl mb-2">{item.emoji}</div>
                        <div className="font-medium text-gray-800">{item.word}</div>
                        <div className="flex justify-center space-x-2 mt-3">
                          <button
                            onClick={() => handleItemDrop(item, 'bin1')}
                            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                          >
                            {currentLevelData?.bin1Label}
                          </button>
                          <button
                            onClick={() => handleItemDrop(item, 'bin2')}
                            className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                          >
                            {currentLevelData?.bin2Label}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Speech Recognition */}
            {gameState === 'speaking' && selectedWord && (
              <SpeechRecognition
                targetWord={selectedWord}
                onResult={handleSpeechResult}
                isListening={isListening}
                onToggleListening={setIsListening}
                difficulty="beginner"
                showVisualFeedback={true}
              />
            )}

            {/* Feedback */}
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

            {/* Level Complete */}
            {gameState === 'levelComplete' && (
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Complete!</h2>
                <p className="text-gray-600 mb-6">
                  Great job sorting all the {currentLevelData?.name}!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleLevelComplete}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
              maxScore={currentLevelData?.pairs.length * 15}
              timeElapsed={timeElapsed}
              targetsSolved={sortedItems.bin1.length + sortedItems.bin2.length}
              totalTargets={currentLevelData?.pairs.length}
              achievements={[
                { name: 'Sound Detective', description: 'Sorted your first sounds!' },
                { name: 'Perfect Sorter', description: 'No sorting mistakes!' }
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

export default SoundSorter;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiShield, FiZap } from 'react-icons/fi';
import { SpeechRecognition, GameProgress, GameFeedback } from '../shared';

const KnightOfSounds = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuest, setCurrentQuest] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameState, setGameState] = useState('quest'); // 'quest', 'battle', 'feedback', 'levelComplete'
  const [speechResult, setSpeechResult] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [knightHealth, setKnightHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);

  // Quest data for final consonant practice
  const levels = {
    1: {
      name: 'The /t/ Kingdom',
      description: 'Defeat monsters with /t/ ending words',
      finalSound: '/t/',
      quests: [
        { word: 'cat', monster: '🐉', location: 'Dark Cave', reward: 'Golden Coin' },
        { word: 'hat', monster: '👹', location: 'Spooky Forest', reward: 'Magic Potion' },
        { word: 'bat', monster: '🧌', location: 'Haunted Tower', reward: 'Silver Shield' },
        { word: 'rat', monster: '👺', location: 'Underground Lair', reward: 'Crystal Gem' },
        { word: 'mat', monster: '🐲', location: 'Dragon\'s Den', reward: 'Royal Crown' },
        { word: 'sat', monster: '👻', location: 'Ghost Castle', reward: 'Magic Sword' }
      ]
    },
    2: {
      name: 'The /k/ Kingdom',
      description: 'Battle creatures with /k/ ending words',
      finalSound: '/k/',
      quests: [
        { word: 'book', monster: '🐉', location: 'Library Dungeon', reward: 'Wisdom Scroll' },
        { word: 'look', monster: '👹', location: 'Mirror Maze', reward: 'Seeing Stone' },
        { word: 'cook', monster: '🧌', location: 'Kitchen Castle', reward: 'Magic Spoon' },
        { word: 'took', monster: '👺', location: 'Treasure Vault', reward: 'Golden Key' },
        { word: 'hook', monster: '🐲', location: 'Pirate Ship', reward: 'Captain\'s Hat' },
        { word: 'shook', monster: '👻', location: 'Earthquake Cave', reward: 'Stability Ring' }
      ]
    },
    3: {
      name: 'The /n/ Kingdom',
      description: 'Conquer foes with /n/ ending words',
      finalSound: '/n/',
      quests: [
        { word: 'sun', monster: '🐉', location: 'Solar Temple', reward: 'Sun Crystal' },
        { word: 'run', monster: '👹', location: 'Racing Track', reward: 'Speed Boots' },
        { word: 'fun', monster: '🧌', location: 'Playground Fort', reward: 'Joy Bell' },
        { word: 'gun', monster: '👺', location: 'Warrior Camp', reward: 'Battle Horn' },
        { word: 'bun', monster: '🐲', location: 'Bakery Tower', reward: 'Sweet Shield' },
        { word: 'won', monster: '👻', location: 'Victory Arena', reward: 'Champion Medal' }
      ]
    },
    4: {
      name: 'The /d/ Kingdom',
      description: 'Triumph over beasts with /d/ ending words',
      finalSound: '/d/',
      quests: [
        { word: 'red', monster: '🐉', location: 'Crimson Cliffs', reward: 'Ruby Ring' },
        { word: 'bed', monster: '👹', location: 'Sleep Chamber', reward: 'Dream Pillow' },
        { word: 'fed', monster: '🧌', location: 'Feast Hall', reward: 'Golden Plate' },
        { word: 'led', monster: '👺', location: 'Leadership Tower', reward: 'Command Staff' },
        { word: 'shed', monster: '🐲', location: 'Tool Fortress', reward: 'Builder\'s Hammer' },
        { word: 'said', monster: '👻', location: 'Echo Valley', reward: 'Voice Amplifier' }
      ]
    },
    5: {
      name: 'Mixed Final Sounds',
      description: 'Master all final consonants',
      finalSound: 'Mixed',
      quests: [
        { word: 'cat', monster: '🐉', location: 'Final Castle', reward: 'Master Key' },
        { word: 'book', monster: '👹', location: 'Ultimate Tower', reward: 'Wisdom Crown' },
        { word: 'sun', monster: '🧌', location: 'Grand Arena', reward: 'Solar Sword' },
        { word: 'red', monster: '👺', location: 'Royal Palace', reward: 'Noble Cape' },
        { word: 'big', monster: '🐲', location: 'Giant\'s Keep', reward: 'Size Potion' },
        { word: 'top', monster: '👻', location: 'Sky Fortress', reward: 'Flying Boots' }
      ]
    },
    6: {
      name: 'The Final Battle',
      description: 'Face the ultimate challenge',
      finalSound: 'All',
      quests: [
        { word: 'knight', monster: '🐲', location: 'Dragon King\'s Lair', reward: 'Dragon Crown' },
        { word: 'quest', monster: '👑', location: 'Throne Room', reward: 'Kingdom Crown' },
        { word: 'brave', monster: '⚔️', location: 'Hall of Heroes', reward: 'Hero\'s Medal' },
        { word: 'strong', monster: '🏰', location: 'Fortress of Power', reward: 'Strength Amulet' },
        { word: 'smart', monster: '🧙', location: 'Wizard\'s Tower', reward: 'Intelligence Gem' },
        { word: 'kind', monster: '👼', location: 'Angel\'s Garden', reward: 'Heart of Gold' }
      ]
    }
  };

  const currentLevelData = levels[currentLevel];
  const currentQuestData = currentLevelData?.quests[currentQuest];
  const totalQuests = currentLevelData?.quests.length || 0;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Start battle
  const handleStartBattle = () => {
    setMonsterHealth(100);
    setGameState('battle');
  };

  // Handle speech recognition result
  const handleSpeechResult = (result) => {
    setSpeechResult(result);
    setGameState('feedback');
    
    if (result.success) {
      // Knight attacks monster
      const damage = Math.round(result.accuracy);
      setMonsterHealth(prev => Math.max(0, prev - damage));
      setScore(prev => prev + Math.round(result.accuracy / 10));
      
      if (monsterHealth - damage <= 0) {
        setCompletedQuests(prev => [...prev, currentQuest]);
      }
    } else {
      // Monster attacks knight
      const damage = Math.round((100 - result.accuracy) / 2);
      setKnightHealth(prev => Math.max(0, prev - damage));
    }
  };

  // Handle feedback continue
  const handleContinue = () => {
    if (monsterHealth <= 0) {
      // Quest completed
      if (currentQuest < totalQuests - 1) {
        setCurrentQuest(prev => prev + 1);
        setGameState('quest');
        setSpeechResult(null);
      } else {
        setGameState('levelComplete');
      }
    } else if (knightHealth <= 0) {
      // Game over - restart quest
      setKnightHealth(100);
      setMonsterHealth(100);
      setGameState('quest');
      setSpeechResult(null);
    } else {
      // Continue battle
      setGameState('battle');
      setSpeechResult(null);
    }
  };

  // Handle retry
  const handleRetry = () => {
    setGameState('battle');
    setSpeechResult(null);
  };

  // Handle level complete
  const handleLevelComplete = () => {
    if (currentLevel < 6) {
      setCurrentLevel(prev => prev + 1);
      setCurrentQuest(0);
      setCompletedQuests([]);
      setKnightHealth(100);
      setMonsterHealth(100);
      setGameState('quest');
      setSpeechResult(null);
    } else {
      navigate('/speech-practice/articulation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-purple-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm shadow-sm border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/speech-practice/articulation')}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">⚔️ Knight of Sounds</h1>
                <p className="text-gray-300">Level {currentLevel}: {currentLevelData?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <FiShield className="w-4 h-4" />
                <span>Health: {knightHealth}%</span>
              </div>
              <button
                onClick={() => navigate('/home')}
                className="p-2 text-gray-300 hover:text-white transition-colors"
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
            {/* Quest Info */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Quest {currentQuest + 1} of {totalQuests}
                </span>
                <span className="text-sm">{currentLevelData?.description}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 bg-yellow-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuest + 1) / totalQuests) * 100}%` }}
                />
              </div>
            </div>

            {/* Quest Scene */}
            {gameState === 'quest' && (
              <div className="bg-gradient-to-b from-blue-900 to-purple-900 rounded-xl p-8 mb-6 text-white">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">New Quest Available!</h2>
                  <div className="text-6xl mb-4">{currentQuestData?.monster}</div>
                  <h3 className="text-xl font-semibold mb-2">Location: {currentQuestData?.location}</h3>
                  <p className="text-lg mb-4">
                    A {currentQuestData?.monster} blocks your path! 
                    Defeat it by saying "<strong>{currentQuestData?.word}</strong>" clearly.
                  </p>
                  <p className="text-sm text-yellow-300 mb-6">
                    Focus on the final {currentLevelData?.finalSound} sound!
                  </p>
                  <button
                    onClick={handleStartBattle}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
                  >
                    <FiZap className="w-5 h-5 inline mr-2" />
                    Start Battle!
                  </button>
                </div>
              </div>
            )}

            {/* Battle Scene */}
            {gameState === 'battle' && (
              <div className="bg-gradient-to-b from-red-900 to-black rounded-xl p-8 mb-6 text-white">
                <div className="flex justify-between items-center mb-6">
                  {/* Knight */}
                  <div className="text-center">
                    <div className="text-6xl mb-2">🛡️</div>
                    <div className="text-sm">Knight</div>
                    <div className="w-24 bg-gray-700 rounded-full h-3 mt-2">
                      <div
                        className="h-3 bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${knightHealth}%` }}
                      />
                    </div>
                  </div>

                  {/* VS */}
                  <div className="text-4xl font-bold">⚔️</div>

                  {/* Monster */}
                  <div className="text-center">
                    <div className="text-6xl mb-2">{currentQuestData?.monster}</div>
                    <div className="text-sm">Monster</div>
                    <div className="w-24 bg-gray-700 rounded-full h-3 mt-2">
                      <div
                        className="h-3 bg-red-500 rounded-full transition-all duration-300"
                        style={{ width: `${monsterHealth}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Battle in Progress!</h3>
                  <p className="mb-4">
                    Say "<strong>{currentQuestData?.word}</strong>" to attack the {currentQuestData?.monster}!
                  </p>
                </div>
              </div>
            )}

            {/* Speech Recognition */}
            {gameState === 'battle' && (
              <SpeechRecognition
                targetWord={currentQuestData?.word}
                targetSound={currentLevelData?.finalSound}
                onResult={handleSpeechResult}
                isListening={isListening}
                onToggleListening={setIsListening}
                difficulty="intermediate"
                showVisualFeedback={true}
              />
            )}

            {/* Feedback */}
            {gameState === 'feedback' && speechResult && (
              <GameFeedback
                result={speechResult}
                onContinue={handleContinue}
                onRetry={handleRetry}
                showRetryOption={!speechResult.success && knightHealth > 0}
                showContinueOption={true}
                autoAdvanceDelay={speechResult.success ? 3 : null}
                encouragementLevel="enthusiastic"
              />
            )}

            {/* Level Complete */}
            {gameState === 'levelComplete' && (
              <div className="bg-gradient-to-b from-yellow-400 to-orange-500 rounded-xl p-8 text-center text-white">
                <div className="text-6xl mb-4">👑</div>
                <h2 className="text-2xl font-bold mb-2">Kingdom Conquered!</h2>
                <p className="mb-4">
                  Congratulations, brave knight! You have mastered {currentLevelData?.name}!
                </p>
                <p className="text-sm mb-6">
                  Reward: {currentQuestData?.reward}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleLevelComplete}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {currentLevel < 6 ? 'Next Kingdom' : 'Complete Adventure'}
                  </button>
                  <button
                    onClick={() => navigate('/speech-practice/articulation')}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Return to Castle
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <GameProgress
              currentLevel={currentLevel}
              totalLevels={6}
              score={score}
              maxScore={totalQuests * 10 * currentLevel}
              timeElapsed={timeElapsed}
              targetsSolved={completedQuests.length}
              totalTargets={totalQuests}
              achievements={[
                { name: 'First Victory', description: 'Defeated your first monster!' },
                { name: 'Sound Warrior', description: 'Mastered final consonants!' }
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

export default KnightOfSounds;

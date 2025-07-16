import { useState, useEffect } from 'react';
import { FiStar, FiTrendingUp, FiTarget, FiClock, FiAward } from 'react-icons/fi';

const GameProgress = ({ 
  currentLevel = 1, 
  totalLevels = 5, 
  score = 0, 
  maxScore = 100,
  timeElapsed = 0,
  targetsSolved = 0,
  totalTargets = 10,
  achievements = [],
  onLevelComplete,
  showDetailedStats = true 
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);

  // Animate score changes
  useEffect(() => {
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = (score - animatedScore) / steps;
    
    if (increment !== 0) {
      const timer = setInterval(() => {
        setAnimatedScore(prev => {
          const next = prev + increment;
          if ((increment > 0 && next >= score) || (increment < 0 && next <= score)) {
            clearInterval(timer);
            return score;
          }
          return next;
        });
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score, animatedScore]);

  // Level up animation
  useEffect(() => {
    if (currentLevel > 1) {
      setShowLevelUpAnimation(true);
      const timer = setTimeout(() => setShowLevelUpAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentLevel]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return Math.min((score / maxScore) * 100, 100);
  };

  const getLevelProgressPercentage = () => {
    return Math.min((targetsSolved / totalTargets) * 100, 100);
  };

  const getScoreColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Level Up Animation */}
      {showLevelUpAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-xl p-8 text-center animate-bounce">
            <FiStar className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Up!</h2>
            <p className="text-gray-600">You've reached Level {currentLevel}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Game Progress</h3>
        <div className="flex items-center space-x-2">
          <FiTrendingUp className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Level {currentLevel} of {totalLevels}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Score */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className={`text-2xl font-bold ${getScoreColor()}`}>
            {Math.round(animatedScore)}
          </div>
          <div className="text-sm text-gray-600">Score</div>
        </div>

        {/* Level Progress */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {targetsSolved}/{totalTargets}
          </div>
          <div className="text-sm text-gray-600">Targets</div>
        </div>

        {/* Time */}
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {formatTime(timeElapsed)}
          </div>
          <div className="text-sm text-gray-600">Time</div>
        </div>

        {/* Accuracy */}
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {targetsSolved > 0 ? Math.round((score / (targetsSolved * 10)) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 mb-6">
        {/* Overall Score Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Score</span>
            <span className="text-sm text-gray-600">{Math.round(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor()}`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Level Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Level {currentLevel} Progress</span>
            <span className="text-sm text-gray-600">{Math.round(getLevelProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${getLevelProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FiAward className="w-4 h-4 mr-2" />
            Recent Achievements
          </h4>
          <div className="space-y-2">
            {achievements.slice(-3).map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <FiStar className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-sm font-medium text-yellow-800">{achievement.name}</div>
                  <div className="text-xs text-yellow-700">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Stats */}
      {showDetailedStats && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Session Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Best Streak:</span>
              <span className="font-medium">5 correct</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Response Time:</span>
              <span className="font-medium">2.3s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sounds Practiced:</span>
              <span className="font-medium">8 different</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Difficulty Level:</span>
              <span className="font-medium">Beginner</span>
            </div>
          </div>
        </div>
      )}

      {/* Level Complete Check */}
      {targetsSolved >= totalTargets && currentLevel < totalLevels && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-green-800 font-medium">Level Complete!</h4>
              <p className="text-green-700 text-sm">Ready to advance to Level {currentLevel + 1}?</p>
            </div>
            <button
              onClick={onLevelComplete}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Next Level
            </button>
          </div>
        </div>
      )}

      {/* Game Complete */}
      {currentLevel >= totalLevels && targetsSolved >= totalTargets && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <FiStar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h4 className="text-blue-800 font-medium mb-1">Congratulations!</h4>
          <p className="text-blue-700 text-sm">You've completed all levels of this game!</p>
        </div>
      )}
    </div>
  );
};

export default GameProgress;

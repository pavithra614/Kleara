import { useState, useEffect } from 'react';
import { FiHeadphones, FiTrendingUp, FiTarget, FiClock, FiAward, FiVolume2 } from 'react-icons/fi';

const HearingProgress = ({ 
  currentLevel = 1, 
  totalLevels = 4, 
  score = 0, 
  maxScore = 100,
  timeElapsed = 0,
  soundsDetected = 0,
  totalSounds = 10,
  achievements = [],
  onLevelComplete,
  showDetailedStats = true,
  hearingSkillType = 'detection' // 'detection', 'discrimination', 'identification', 'comprehension'
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);

  // Animate score changes
  useEffect(() => {
    const duration = 1000;
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
    return Math.min((soundsDetected / totalSounds) * 100, 100);
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

  const getSkillTypeInfo = () => {
    const skillTypes = {
      detection: {
        name: 'Sound Detection',
        description: 'Recognizing presence/absence of sounds',
        icon: FiHeadphones,
        color: 'blue'
      },
      discrimination: {
        name: 'Sound Discrimination',
        description: 'Distinguishing between different sounds',
        icon: FiVolume2,
        color: 'purple'
      },
      identification: {
        name: 'Sound Identification',
        description: 'Recognizing specific sounds and sources',
        icon: FiTarget,
        color: 'green'
      },
      comprehension: {
        name: 'Auditory Comprehension',
        description: 'Understanding meaning from sounds',
        icon: FiTrendingUp,
        color: 'orange'
      }
    };
    return skillTypes[hearingSkillType] || skillTypes.detection;
  };

  const skillInfo = getSkillTypeInfo();
  const SkillIcon = skillInfo.icon;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Level Up Animation */}
      {showLevelUpAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-xl p-8 text-center animate-bounce">
            <FiHeadphones className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Up!</h2>
            <p className="text-gray-600">You've reached Level {currentLevel}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Hearing Progress</h3>
        <div className="flex items-center space-x-2">
          <SkillIcon className={`w-5 h-5 text-${skillInfo.color}-600`} />
          <span className="text-sm text-gray-600">Level {currentLevel} of {totalLevels}</span>
        </div>
      </div>

      {/* Skill Type Info */}
      <div className={`bg-${skillInfo.color}-50 border border-${skillInfo.color}-200 rounded-lg p-3 mb-6`}>
        <div className="flex items-center space-x-2 mb-1">
          <SkillIcon className={`w-4 h-4 text-${skillInfo.color}-600`} />
          <span className={`text-sm font-medium text-${skillInfo.color}-800`}>{skillInfo.name}</span>
        </div>
        <p className={`text-xs text-${skillInfo.color}-700`}>{skillInfo.description}</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Score */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className={`text-2xl font-bold ${getScoreColor()}`}>
            {Math.round(animatedScore)}
          </div>
          <div className="text-sm text-gray-600">Score</div>
        </div>

        {/* Sounds Detected */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {soundsDetected}/{totalSounds}
          </div>
          <div className="text-sm text-gray-600">Detected</div>
        </div>

        {/* Time */}
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {formatTime(timeElapsed)}
          </div>
          <div className="text-sm text-gray-600">Time</div>
        </div>

        {/* Detection Rate */}
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {soundsDetected > 0 ? Math.round((score / (soundsDetected * 10)) * 100) : 0}%
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
              className={`h-3 bg-${skillInfo.color}-500 rounded-full transition-all duration-500`}
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
                <FiHeadphones className="w-5 h-5 text-yellow-500" />
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
              <span className="font-medium">4 correct</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Response Time:</span>
              <span className="font-medium">1.8s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sounds Practiced:</span>
              <span className="font-medium">6 different</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Detection Rate:</span>
              <span className="font-medium">
                {soundsDetected > 0 ? Math.round((soundsDetected / totalSounds) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Level Complete Check */}
      {soundsDetected >= totalSounds && currentLevel < totalLevels && (
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

      {/* Activity Complete */}
      {currentLevel >= totalLevels && soundsDetected >= totalSounds && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <FiHeadphones className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h4 className="text-blue-800 font-medium mb-1">Congratulations!</h4>
          <p className="text-blue-700 text-sm">You've completed all levels of this hearing activity!</p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-800 mb-2">💡 Hearing Tips:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Use headphones for better sound quality</li>
          <li>• Find a quiet environment to practice</li>
          <li>• Take breaks if you feel tired</li>
          <li>• Focus on one sound at a time</li>
        </ul>
      </div>
    </div>
  );
};

export default HearingProgress;

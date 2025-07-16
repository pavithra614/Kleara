import { useState, useEffect } from 'react';
import { FiStar, FiCheck, FiX, FiRefreshCw, FiThumbsUp, FiZap } from 'react-icons/fi';

const GameFeedback = ({ 
  result, 
  onContinue, 
  onRetry, 
  showRetryOption = true,
  showContinueOption = true,
  autoAdvanceDelay = null,
  encouragementLevel = 'normal' // 'minimal', 'normal', 'enthusiastic'
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (result) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 1000);
      
      // Auto-advance countdown
      if (autoAdvanceDelay && result.success) {
        setCountdown(autoAdvanceDelay);
        const countdownTimer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownTimer);
              onContinue && onContinue();
              return null;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => {
          clearTimeout(timer);
          clearInterval(countdownTimer);
        };
      }
      
      return () => clearTimeout(timer);
    }
  }, [result, autoAdvanceDelay, onContinue]);

  if (!result) return null;

  const getFeedbackConfig = () => {
    const { accuracy, success } = result;
    
    if (accuracy >= 90) {
      return {
        type: 'perfect',
        icon: FiStar,
        color: 'green',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        iconColor: 'text-green-600',
        title: 'Perfect!',
        message: getEncouragementMessage('perfect'),
        animation: 'animate-bounce'
      };
    } else if (accuracy >= 75) {
      return {
        type: 'great',
        icon: FiThumbsUp,
        color: 'blue',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-600',
        title: 'Great Job!',
        message: getEncouragementMessage('great'),
        animation: 'animate-pulse'
      };
    } else if (accuracy >= 60) {
      return {
        type: 'good',
        icon: FiCheck,
        color: 'yellow',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        iconColor: 'text-yellow-600',
        title: 'Good Try!',
        message: getEncouragementMessage('good'),
        animation: 'animate-pulse'
      };
    } else if (accuracy >= 40) {
      return {
        type: 'retry',
        icon: FiRefreshCw,
        color: 'orange',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800',
        iconColor: 'text-orange-600',
        title: 'Try Again!',
        message: getEncouragementMessage('retry'),
        animation: 'animate-pulse'
      };
    } else {
      return {
        type: 'practice',
        icon: FiZap,
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        iconColor: 'text-red-600',
        title: 'Keep Practicing!',
        message: getEncouragementMessage('practice'),
        animation: 'animate-pulse'
      };
    }
  };

  const getEncouragementMessage = (type) => {
    const messages = {
      perfect: {
        minimal: ['Excellent pronunciation!'],
        normal: ['Amazing work! Your pronunciation was spot on!', 'Fantastic! You nailed that sound!'],
        enthusiastic: ['WOW! That was absolutely perfect!', 'Outstanding! You\'re a speech superstar!', 'Incredible! Your pronunciation was flawless!']
      },
      great: {
        minimal: ['Well done!'],
        normal: ['Great job! You\'re getting really good at this!', 'Nice work! Your speech is improving!'],
        enthusiastic: ['Awesome! You\'re doing fantastic!', 'Brilliant work! Keep up the great progress!', 'Wonderful! You\'re becoming a speech champion!']
      },
      good: {
        minimal: ['Good effort!'],
        normal: ['Good try! You\'re on the right track!', 'Nice attempt! Keep practicing!'],
        enthusiastic: ['Great effort! You\'re learning so well!', 'Good job! Every practice makes you better!', 'Well done! You\'re improving with each try!']
      },
      retry: {
        minimal: ['Try once more!'],
        normal: ['Almost there! Give it another try!', 'You\'re close! Let\'s try again!'],
        enthusiastic: ['So close! You can do this!', 'Almost perfect! One more try!', 'You\'re getting there! Don\'t give up!']
      },
      practice: {
        minimal: ['Keep trying!'],
        normal: ['Let\'s practice this sound together!', 'No worries! Practice makes perfect!'],
        enthusiastic: ['That\'s okay! Every expert was once a beginner!', 'Don\'t worry! You\'re learning and that\'s what matters!', 'Keep going! You\'re braver than you believe!']
      }
    };

    const levelMessages = messages[type][encouragementLevel] || messages[type].normal;
    return levelMessages[Math.floor(Math.random() * levelMessages.length)];
  };

  const config = getFeedbackConfig();
  const Icon = config.icon;

  return (
    <div className={`border rounded-xl p-6 ${config.bgColor} ${config.borderColor}`}>
      {/* Animated Icon */}
      <div className="text-center mb-4">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/50 mb-3 ${showAnimation ? config.animation : ''}`}>
          <Icon className={`w-8 h-8 ${config.iconColor}`} />
        </div>
        <h3 className={`text-xl font-bold ${config.textColor}`}>{config.title}</h3>
      </div>

      {/* Feedback Message */}
      <div className="text-center mb-4">
        <p className={`text-lg ${config.textColor} mb-2`}>{config.message}</p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className={config.textColor}>
            Accuracy: <strong>{Math.round(result.accuracy)}%</strong>
          </span>
          {result.attempts && (
            <span className={config.textColor}>
              Attempt: <strong>{result.attempts}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-white/50 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              result.accuracy >= 80 ? 'bg-green-500' :
              result.accuracy >= 60 ? 'bg-blue-500' :
              result.accuracy >= 40 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(result.accuracy, 100)}%` }}
          />
        </div>
      </div>

      {/* Specific Feedback */}
      {result.targetSound && (
        <div className={`p-3 bg-white/30 rounded-lg mb-4 ${config.textColor}`}>
          <div className="text-sm">
            <strong>Target Sound:</strong> {result.targetSound}
          </div>
          {result.targetWord && (
            <div className="text-sm">
              <strong>Word:</strong> {result.targetWord}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {showRetryOption && !result.success && onRetry && (
          <button
            onClick={onRetry}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-white/50 hover:bg-white/70 ${config.textColor} rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${config.color}-500`}
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
        
        {showContinueOption && onContinue && (
          <button
            onClick={onContinue}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-white hover:bg-white/90 ${config.textColor} rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${config.color}-500`}
          >
            <FiCheck className="w-4 h-4" />
            <span>
              {countdown ? `Continue (${countdown})` : 'Continue'}
            </span>
          </button>
        )}
      </div>

      {/* Tips for Improvement */}
      {!result.success && result.accuracy < 60 && (
        <div className="mt-4 p-3 bg-white/30 rounded-lg">
          <h4 className={`text-sm font-medium ${config.textColor} mb-2`}>💡 Tips to improve:</h4>
          <ul className={`text-sm ${config.textColor} space-y-1`}>
            <li>• Speak slowly and clearly</li>
            <li>• Make sure you're in a quiet place</li>
            <li>• Focus on the target sound</li>
            {result.targetSound && (
              <li>• Practice the <strong>{result.targetSound}</strong> sound by itself first</li>
            )}
          </ul>
        </div>
      )}

      {/* Celebration for Perfect Scores */}
      {result.accuracy >= 95 && showAnimation && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 20}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameFeedback;

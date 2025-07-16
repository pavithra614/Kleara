import { useState, useEffect } from 'react';
import { FiVolume2, FiCheck, FiX, FiClock, FiZap } from 'react-icons/fi';

const SoundDetection = ({
  expectedSound = 'bark',
  soundType = 'animal',
  detectionMode = 'presence', // 'presence', 'direction', 'matching'
  timeLimit = 5000, // milliseconds
  onDetectionResult,
  showVisualCues = false,
  difficulty = 'easy' // 'easy', 'medium', 'hard'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit / 1000);
  const [isActive, setIsActive] = useState(false);
  const [userResponse, setUserResponse] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Mock sound detection scenarios
  const detectionScenarios = {
    easy: {
      successRate: 0.8,
      responseTime: 1500,
      falsePositiveRate: 0.1
    },
    medium: {
      successRate: 0.7,
      responseTime: 2000,
      falsePositiveRate: 0.15
    },
    hard: {
      successRate: 0.6,
      responseTime: 2500,
      falsePositiveRate: 0.2
    }
  };

  const currentScenario = detectionScenarios[difficulty];

  // Start detection session
  const startDetection = () => {
    setIsListening(true);
    setIsActive(true);
    setTimeRemaining(timeLimit / 1000);
    setDetectionResult(null);
    setUserResponse(null);
    setShowFeedback(false);

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0.1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  };

  // Handle user response
  const handleUserResponse = (response) => {
    if (!isActive) return;

    setUserResponse(response);
    setIsListening(false);
    setIsActive(false);

    // Simulate detection processing
    setTimeout(() => {
      const result = processDetection(response);
      setDetectionResult(result);
      setShowFeedback(true);
      
      if (onDetectionResult) {
        onDetectionResult(result);
      }
    }, 500);
  };

  // Process detection result
  const processDetection = (response) => {
    const random = Math.random();
    const isCorrectSound = random < currentScenario.successRate;
    const responseTime = currentScenario.responseTime + (Math.random() * 1000 - 500);

    let result = {
      success: false,
      accuracy: 0,
      responseTime: responseTime,
      expectedSound,
      detectedSound: response,
      feedback: '',
      detectionMode
    };

    switch (detectionMode) {
      case 'presence':
        if (response === 'heard' && isCorrectSound) {
          result.success = true;
          result.accuracy = 85 + Math.random() * 15;
          result.feedback = 'Great! You detected the sound correctly!';
        } else if (response === 'not_heard' && !isCorrectSound) {
          result.success = true;
          result.accuracy = 80 + Math.random() * 15;
          result.feedback = 'Perfect! You correctly identified no sound!';
        } else {
          result.accuracy = 30 + Math.random() * 30;
          result.feedback = response === 'heard' ? 
            'Oops! There was no sound this time.' : 
            'You missed it! There was a sound.';
        }
        break;

      case 'direction':
        const correctDirection = ['left', 'right', 'center'][Math.floor(Math.random() * 3)];
        if (response === correctDirection) {
          result.success = true;
          result.accuracy = 80 + Math.random() * 20;
          result.feedback = `Excellent! The sound came from the ${correctDirection}.`;
        } else {
          result.accuracy = 25 + Math.random() * 40;
          result.feedback = `Not quite. The sound came from the ${correctDirection}.`;
        }
        result.correctDirection = correctDirection;
        break;

      case 'matching':
        if (response === expectedSound) {
          result.success = true;
          result.accuracy = 75 + Math.random() * 25;
          result.feedback = `Perfect! That was indeed a ${expectedSound} sound!`;
        } else {
          result.accuracy = 20 + Math.random() * 50;
          result.feedback = `Not quite. That was a ${expectedSound} sound, not ${response}.`;
        }
        break;
    }

    return result;
  };

  // Handle timeout
  const handleTimeout = () => {
    setIsListening(false);
    setIsActive(false);
    
    const result = {
      success: false,
      accuracy: 0,
      responseTime: timeLimit,
      expectedSound,
      detectedSound: 'timeout',
      feedback: 'Time\'s up! Try to respond more quickly next time.',
      detectionMode,
      timeout: true
    };

    setDetectionResult(result);
    setShowFeedback(true);
    
    if (onDetectionResult) {
      onDetectionResult(result);
    }
  };

  // Reset detection
  const resetDetection = () => {
    setIsListening(false);
    setIsActive(false);
    setDetectionResult(null);
    setUserResponse(null);
    setShowFeedback(false);
    setTimeRemaining(timeLimit / 1000);
  };

  const getDetectionModeInstructions = () => {
    switch (detectionMode) {
      case 'presence':
        return 'Listen carefully and click "I heard it!" if you detect a sound, or "No sound" if you don\'t hear anything.';
      case 'direction':
        return 'Listen for the sound and click the direction it came from: Left, Center, or Right.';
      case 'matching':
        return `Listen for the ${expectedSound} sound and click "Match" if you hear it, or "Different" if it\'s a different sound.`;
      default:
        return 'Listen carefully and respond when you detect the sound.';
    }
  };

  const getFeedbackColor = () => {
    if (!detectionResult) return 'blue';
    if (detectionResult.success) return 'green';
    if (detectionResult.timeout) return 'yellow';
    return 'red';
  };

  const getFeedbackIcon = () => {
    if (!detectionResult) return FiVolume2;
    if (detectionResult.success) return FiCheck;
    if (detectionResult.timeout) return FiClock;
    return FiX;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sound Detection Challenge</h3>
        <p className="text-sm text-gray-600 mb-4">{getDetectionModeInstructions()}</p>
        
        {/* Difficulty Indicator */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
          difficulty === 'easy' ? 'bg-green-100 text-green-700' :
          difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
        </div>
      </div>

      {/* Timer */}
      {isActive && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {timeRemaining.toFixed(1)}s
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-100 ${
                timeRemaining > 2 ? 'bg-green-500' :
                timeRemaining > 1 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${(timeRemaining / (timeLimit / 1000)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Visual Listening Indicator */}
      {isListening && showVisualCues && (
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
              <FiVolume2 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="absolute inset-0 border-4 border-blue-300 rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      {/* Response Buttons */}
      {isActive && (
        <div className="space-y-4">
          {detectionMode === 'presence' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleUserResponse('heard')}
                className="py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <FiCheck className="w-5 h-5 inline mr-2" />
                I heard it!
              </button>
              <button
                onClick={() => handleUserResponse('not_heard')}
                className="py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <FiX className="w-5 h-5 inline mr-2" />
                No sound
              </button>
            </div>
          )}

          {detectionMode === 'direction' && (
            <div className="grid grid-cols-3 gap-3">
              {['left', 'center', 'right'].map((direction) => (
                <button
                  key={direction}
                  onClick={() => handleUserResponse(direction)}
                  className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {direction === 'left' ? '← Left' : direction === 'right' ? 'Right →' : 'Center'}
                </button>
              ))}
            </div>
          )}

          {detectionMode === 'matching' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleUserResponse(expectedSound)}
                className="py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <FiCheck className="w-5 h-5 inline mr-2" />
                Match!
              </button>
              <button
                onClick={() => handleUserResponse('different')}
                className="py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <FiX className="w-5 h-5 inline mr-2" />
                Different
              </button>
            </div>
          )}
        </div>
      )}

      {/* Start Button */}
      {!isActive && !showFeedback && (
        <div className="text-center">
          <button
            onClick={startDetection}
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiZap className="w-5 h-5 inline mr-2" />
            Start Detection
          </button>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && detectionResult && (
        <div className={`border rounded-lg p-4 ${
          getFeedbackColor() === 'green' ? 'bg-green-50 border-green-200' :
          getFeedbackColor() === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
          getFeedbackColor() === 'red' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-3">
            {React.createElement(getFeedbackIcon(), { 
              className: `w-6 h-6 ${
                getFeedbackColor() === 'green' ? 'text-green-600' :
                getFeedbackColor() === 'yellow' ? 'text-yellow-600' :
                getFeedbackColor() === 'red' ? 'text-red-600' :
                'text-blue-600'
              }` 
            })}
            <span className={`text-lg font-semibold ${
              getFeedbackColor() === 'green' ? 'text-green-800' :
              getFeedbackColor() === 'yellow' ? 'text-yellow-800' :
              getFeedbackColor() === 'red' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {detectionResult.feedback}
            </span>
          </div>
          
          <div className="text-center space-y-2">
            <div className={`text-sm ${
              getFeedbackColor() === 'green' ? 'text-green-700' :
              getFeedbackColor() === 'yellow' ? 'text-yellow-700' :
              getFeedbackColor() === 'red' ? 'text-red-700' :
              'text-blue-700'
            }`}>
              Accuracy: {Math.round(detectionResult.accuracy)}%
            </div>
            <div className={`text-sm ${
              getFeedbackColor() === 'green' ? 'text-green-700' :
              getFeedbackColor() === 'yellow' ? 'text-yellow-700' :
              getFeedbackColor() === 'red' ? 'text-red-700' :
              'text-blue-700'
            }`}>
              Response Time: {(detectionResult.responseTime / 1000).toFixed(1)}s
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={resetDetection}
              className="py-2 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundDetection;

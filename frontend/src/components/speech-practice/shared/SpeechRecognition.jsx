import { useState, useEffect } from 'react';
import { FiMic, FiMicOff, FiVolume2, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';

const SpeechRecognition = ({ 
  targetWord, 
  targetSound, 
  onResult, 
  isListening, 
  onToggleListening,
  difficulty = 'beginner',
  showVisualFeedback = true 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Mock speech recognition results for prototype
  const mockSpeechRecognition = (target) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const scenarios = [
        { accuracy: 95, feedback: 'Perfect!', icon: 'perfect', color: 'green' },
        { accuracy: 85, feedback: 'Great job!', icon: 'good', color: 'blue' },
        { accuracy: 70, feedback: 'Good try!', icon: 'okay', color: 'yellow' },
        { accuracy: 50, feedback: 'Try again!', icon: 'retry', color: 'orange' },
        { accuracy: 30, feedback: 'Let\'s practice more', icon: 'practice', color: 'red' }
      ];

      // Simulate different accuracy based on difficulty and attempts
      let baseAccuracy = 70;
      if (difficulty === 'beginner') baseAccuracy = 80;
      if (difficulty === 'intermediate') baseAccuracy = 70;
      if (difficulty === 'advanced') baseAccuracy = 60;

      // Improve accuracy with attempts (learning simulation)
      const improvementBonus = Math.min(attempts * 5, 20);
      const randomVariation = Math.random() * 30 - 15; // ±15%
      const finalAccuracy = Math.max(30, Math.min(95, baseAccuracy + improvementBonus + randomVariation));

      const result = scenarios.find(s => finalAccuracy >= s.accuracy) || scenarios[scenarios.length - 1];
      
      setConfidence(finalAccuracy);
      setFeedback(result);
      setIsProcessing(false);
      setAttempts(prev => prev + 1);

      // Call parent callback with results
      if (onResult) {
        onResult({
          accuracy: finalAccuracy,
          feedback: result.feedback,
          targetWord,
          targetSound,
          attempts: attempts + 1,
          success: finalAccuracy >= 70
        });
      }
    }, 1500 + Math.random() * 1000); // 1.5-2.5 second delay
  };

  const handleMicClick = () => {
    if (isListening) {
      // Stop listening and process
      onToggleListening(false);
      mockSpeechRecognition(targetWord || targetSound);
    } else {
      // Start listening
      setFeedback(null);
      onToggleListening(true);
    }
  };

  const getFeedbackIcon = (iconType) => {
    switch (iconType) {
      case 'perfect': return <FiCheck className="w-6 h-6" />;
      case 'good': return <FiCheck className="w-6 h-6" />;
      case 'okay': return <FiVolume2 className="w-6 h-6" />;
      case 'retry': return <FiRefreshCw className="w-6 h-6" />;
      case 'practice': return <FiX className="w-6 h-6" />;
      default: return <FiMic className="w-6 h-6" />;
    }
  };

  const getFeedbackColors = (color) => {
    const colorMap = {
      green: 'bg-green-100 text-green-700 border-green-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      red: 'bg-red-100 text-red-700 border-red-200'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Target Display */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {targetWord ? 'Say the word:' : 'Make the sound:'}
        </h3>
        <div className="text-3xl font-bold text-blue-600 mb-2">
          {targetWord || targetSound}
        </div>
        {targetWord && targetSound && (
          <div className="text-sm text-gray-600">
            Focus on the <span className="font-medium text-blue-600">{targetSound}</span> sound
          </div>
        )}
      </div>

      {/* Microphone Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleMicClick}
          disabled={isProcessing}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500 animate-pulse'
              : isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isListening ? (
            <FiMicOff className="w-8 h-8 text-white" />
          ) : (
            <FiMic className="w-8 h-8 text-white" />
          )}
        </button>
      </div>

      {/* Status Text */}
      <div className="text-center mb-4">
        {isProcessing && (
          <p className="text-gray-600">Processing your speech...</p>
        )}
        {isListening && !isProcessing && (
          <p className="text-red-600 font-medium">Listening... Click to stop</p>
        )}
        {!isListening && !isProcessing && !feedback && (
          <p className="text-gray-600">Click the microphone to start</p>
        )}
      </div>

      {/* Visual Feedback */}
      {showVisualFeedback && isListening && (
        <div className="flex justify-center mb-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 bg-red-400 rounded-full animate-pulse`}
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Feedback Display */}
      {feedback && (
        <div className={`border rounded-lg p-4 ${getFeedbackColors(feedback.color)}`}>
          <div className="flex items-center justify-center space-x-3 mb-2">
            {getFeedbackIcon(feedback.icon)}
            <span className="text-lg font-semibold">{feedback.feedback}</span>
          </div>
          <div className="text-center">
            <div className="text-sm mb-2">Accuracy: {Math.round(confidence)}%</div>
            <div className="w-full bg-white/50 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  confidence >= 80 ? 'bg-green-500' :
                  confidence >= 60 ? 'bg-blue-500' :
                  confidence >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Attempts Counter */}
      {attempts > 0 && (
        <div className="text-center mt-4 text-sm text-gray-500">
          Attempt {attempts} • Keep practicing!
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Tips for better results:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Speak clearly and at normal volume</li>
          <li>• Make sure you're in a quiet environment</li>
          <li>• Take your time with each sound</li>
          {targetSound && <li>• Focus on the <strong>{targetSound}</strong> sound</li>}
        </ul>
      </div>
    </div>
  );
};

export default SpeechRecognition;

import React, { useState, useEffect, useRef } from 'react';
import { 
  FiPlay, 
  FiPause, 
  FiSkipBack, 
  FiSkipForward,
  FiRotateCcw,
  FiSettings,
  FiDownload,
  FiMaximize2
} from 'react-icons/fi';

const SignLanguageAvatar = ({ 
  text = '', 
  isPlaying = false, 
  onPlayStateChange,
  speed = 1,
  onSpeedChange,
  avatarStyle = 'modern',
  showControls = true,
  className = ""
}) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [words, setWords] = useState([]);
  const animationRef = useRef(null);

  // Avatar animations for different signs
  const signAnimations = {
    'hello': '👋',
    'thank': '🙏',
    'you': '👉',
    'please': '🤲',
    'sorry': '😔',
    'yes': '👍',
    'no': '👎',
    'good': '👌',
    'bad': '👎',
    'help': '🆘',
    'water': '💧',
    'food': '🍽️',
    'home': '🏠',
    'family': '👨‍👩‍👧‍👦',
    'friend': '👫',
    'love': '❤️',
    'happy': '😊',
    'sad': '😢',
    'angry': '😠',
    'tired': '😴',
    'default': '🤟'
  };

  // Get animation for word
  const getSignAnimation = (word) => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    return signAnimations[cleanWord] || signAnimations.default;
  };

  // Parse text into words
  useEffect(() => {
    if (text) {
      const wordList = text.split(/\s+/).filter(word => word.length > 0);
      setWords(wordList);
      setCurrentIndex(0);
      setAnimationProgress(0);
    }
  }, [text]);

  // Animation loop
  const animate = () => {
    if (!isPlaying || words.length === 0) return;

    const wordDuration = 2000 / speed; // 2 seconds per word adjusted by speed
    const startTime = Date.now();

    const animateWord = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / wordDuration, 1);
      
      setAnimationProgress(progress);
      setCurrentWord(words[currentIndex]);
      setIsAnimating(true);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateWord);
      } else {
        // Move to next word
        if (currentIndex < words.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setTimeout(() => {
            animate();
          }, 200 / speed); // Brief pause between words
        } else {
          // Animation complete
          setIsAnimating(false);
          setAnimationProgress(0);
          if (onPlayStateChange) onPlayStateChange(false);
        }
      }
    };

    animateWord();
  };

  // Start/stop animation
  useEffect(() => {
    if (isPlaying) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsAnimating(false);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentIndex, speed]);

  // Control handlers
  const handlePlay = () => {
    if (onPlayStateChange) onPlayStateChange(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnimationProgress(0);
    setCurrentWord('');
    if (onPlayStateChange) onPlayStateChange(true);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setAnimationProgress(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnimationProgress(0);
    }
  };

  const handleSpeedChange = (newSpeed) => {
    if (onSpeedChange) onSpeedChange(newSpeed);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-gray-900">Sign Language Avatar</h3>
        <div className="flex items-center space-x-2">
          <select
            value={speed}
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
          <button className="p-1 text-gray-600 hover:text-gray-900 rounded">
            <FiSettings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Avatar Display */}
      <div className="p-6">
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-6">
          {/* 3D Avatar Representation */}
          <div className="text-center">
            <div className={`text-8xl mb-4 transition-transform duration-300 ${
              isAnimating ? 'scale-110 animate-pulse' : 'scale-100'
            }`}>
              {currentWord ? getSignAnimation(currentWord) : '🤟'}
            </div>
            
            {/* Current Word Display */}
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm mb-4">
              <p className="text-lg font-semibold text-gray-900">
                {currentWord || 'Ready to sign'}
              </p>
              {words.length > 0 && (
                <p className="text-sm text-gray-600">
                  {currentIndex + 1} of {words.length}
                </p>
              )}
            </div>

            {/* Progress Bar */}
            {words.length > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                  style={{ 
                    width: `${((currentIndex + animationProgress) / words.length) * 100}%` 
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Animation Indicators */}
          {isAnimating && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Signing</span>
              </div>
            </div>
          )}
        </div>

        {/* Text Display */}
        {text && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Text to Sign:</h4>
            <p className="text-gray-700 leading-relaxed">
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`${
                    index === currentIndex
                      ? 'bg-blue-200 text-blue-900 font-semibold'
                      : index < currentIndex
                      ? 'text-gray-500'
                      : 'text-gray-700'
                  } px-1 rounded transition-colors duration-200`}
                >
                  {word}
                  {index < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Controls */}
        {showControls && words.length > 0 && (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
            >
              <FiSkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handleRestart}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <FiRotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlay}
              className={`p-3 rounded-full text-white transition-colors ${
                isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isPlaying ? <FiPause className="w-6 h-6" /> : <FiPlay className="w-6 h-6" />}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === words.length - 1}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
            >
              <FiSkipForward className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Additional Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <FiDownload className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <FiMaximize2 className="w-4 h-4" />
              <span className="text-sm">Fullscreen</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            Duration: {Math.ceil((words.length * 2) / speed)}s
          </div>
        </div>
      </div>

      {/* No Text State */}
      {!text && (
        <div className="p-8 text-center text-gray-500">
          <div className="text-6xl mb-4">🤟</div>
          <p className="text-lg mb-2">Ready to translate</p>
          <p className="text-sm">Enter text to see sign language animation</p>
        </div>
      )}
    </div>
  );
};

export default SignLanguageAvatar;

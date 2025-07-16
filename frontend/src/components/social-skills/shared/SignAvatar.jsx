import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaVolumeUp } from 'react-icons/fa';

const SignAvatar = ({ text, speed = 1, autoPlay = false, showControls = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [progress, setProgress] = useState(0);
  const [avatarPose, setAvatarPose] = useState('neutral');

  const words = text ? text.split(' ') : [];
  const totalWords = words.length;

  useEffect(() => {
    if (autoPlay && text) {
      playAnimation();
    }
  }, [text, autoPlay]);

  useEffect(() => {
    if (isPlaying && words.length > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const nextProgress = prev + 1;
          if (nextProgress >= totalWords) {
            setIsPlaying(false);
            setCurrentWord('');
            setAvatarPose('neutral');
            return 0;
          } else {
            setCurrentWord(words[nextProgress]);
            setAvatarPose(getSignPose(words[nextProgress]));
            return nextProgress;
          }
        });
      }, 1000 / speed);

      return () => clearInterval(interval);
    }
  }, [isPlaying, words, speed, totalWords]);

  const getSignPose = (word) => {
    // Simulate different sign poses based on word
    const poses = {
      'hello': 'wave',
      'thank': 'gratitude',
      'you': 'point',
      'please': 'polite',
      'sorry': 'apologetic',
      'yes': 'nod',
      'no': 'shake',
      'help': 'assistance',
      'more': 'increase',
      'love': 'heart',
      'family': 'group',
      'friend': 'connection',
      'happy': 'smile',
      'sad': 'down',
      'angry': 'frustrated',
      'excited': 'energetic'
    };
    
    return poses[word.toLowerCase()] || 'neutral';
  };

  const playAnimation = () => {
    if (!isPlaying && words.length > 0) {
      setIsPlaying(true);
      setProgress(0);
      setCurrentWord(words[0]);
      setAvatarPose(getSignPose(words[0]));
    }
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentWord('');
    setAvatarPose('neutral');
  };

  const getAvatarStyle = () => {
    const baseStyle = "w-64 h-64 mx-auto rounded-full flex items-center justify-center text-6xl transition-all duration-500";
    
    switch (avatarPose) {
      case 'wave':
        return `${baseStyle} bg-gradient-to-br from-blue-400 to-blue-600 animate-bounce`;
      case 'gratitude':
        return `${baseStyle} bg-gradient-to-br from-green-400 to-green-600`;
      case 'point':
        return `${baseStyle} bg-gradient-to-br from-purple-400 to-purple-600`;
      case 'polite':
        return `${baseStyle} bg-gradient-to-br from-pink-400 to-pink-600`;
      case 'apologetic':
        return `${baseStyle} bg-gradient-to-br from-orange-400 to-orange-600`;
      case 'nod':
        return `${baseStyle} bg-gradient-to-br from-green-500 to-green-700 animate-pulse`;
      case 'shake':
        return `${baseStyle} bg-gradient-to-br from-red-400 to-red-600`;
      case 'assistance':
        return `${baseStyle} bg-gradient-to-br from-yellow-400 to-yellow-600`;
      case 'increase':
        return `${baseStyle} bg-gradient-to-br from-indigo-400 to-indigo-600`;
      case 'heart':
        return `${baseStyle} bg-gradient-to-br from-red-400 to-pink-600 animate-pulse`;
      case 'smile':
        return `${baseStyle} bg-gradient-to-br from-yellow-400 to-orange-500`;
      case 'energetic':
        return `${baseStyle} bg-gradient-to-br from-lime-400 to-green-500 animate-bounce`;
      default:
        return `${baseStyle} bg-gradient-to-br from-gray-400 to-gray-600`;
    }
  };

  const getAvatarEmoji = () => {
    switch (avatarPose) {
      case 'wave': return '👋';
      case 'gratitude': return '🙏';
      case 'point': return '👉';
      case 'polite': return '🤝';
      case 'apologetic': return '😔';
      case 'nod': return '✅';
      case 'shake': return '❌';
      case 'assistance': return '🤲';
      case 'increase': return '📈';
      case 'heart': return '❤️';
      case 'group': return '👨‍👩‍👧‍👦';
      case 'connection': return '🤝';
      case 'smile': return '😊';
      case 'down': return '😢';
      case 'frustrated': return '😠';
      case 'energetic': return '🎉';
      default: return '🧑';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign Language Avatar</h3>
        <p className="text-sm text-gray-600">Watch the avatar perform sign language</p>
      </div>

      {/* Avatar Display */}
      <div className="mb-6">
        <div className={getAvatarStyle()}>
          <span className="select-none">{getAvatarEmoji()}</span>
        </div>
        
        {/* Current Word Display */}
        <div className="text-center mt-4">
          <div className="text-2xl font-bold text-gray-800 mb-2">
            {currentWord || 'Ready to sign...'}
          </div>
          {isPlaying && (
            <div className="text-sm text-gray-600">
              Word {progress + 1} of {totalWords}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {words.length > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress / Math.max(totalWords - 1, 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Text Display */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-2">Text to Sign:</div>
        <div className="text-gray-800">
          {words.map((word, index) => (
            <span
              key={index}
              className={`mr-2 px-2 py-1 rounded ${
                index === progress && isPlaying
                  ? 'bg-blue-500 text-white'
                  : index < progress
                  ? 'bg-green-200 text-green-800'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={isPlaying ? pauseAnimation : playAnimation}
            disabled={!text || words.length === 0}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isPlaying ? (
              <>
                <FaPause className="mr-2" />
                Pause
              </>
            ) : (
              <>
                <FaPlay className="mr-2" />
                Play
              </>
            )}
          </button>

          <button
            onClick={resetAnimation}
            disabled={!text || words.length === 0}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FaRedo className="mr-2" />
            Reset
          </button>

          <button
            onClick={() => {
              // Simulate text-to-speech
              if (text && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utterance);
              }
            }}
            disabled={!text}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FaVolumeUp className="mr-2" />
            Speak
          </button>
        </div>
      )}

      {/* Speed Control */}
      <div className="mt-4 flex items-center justify-center space-x-4">
        <label className="text-sm text-gray-600">Speed:</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-24"
        />
        <span className="text-sm text-gray-600">{speed}x</span>
      </div>
    </div>
  );
};

export default SignAvatar;

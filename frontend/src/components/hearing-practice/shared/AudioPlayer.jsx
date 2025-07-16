import { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiRotateCcw, FiHeadphones } from 'react-icons/fi';

const AudioPlayer = ({ 
  soundType = 'animal', // 'animal', 'toy', 'environmental', 'speech'
  soundName = 'bark',
  volume = 0.7,
  autoPlay = false,
  showControls = true,
  onPlay,
  onPause,
  onEnd,
  direction = 'center', // 'left', 'right', 'center' for spatial audio simulation
  backgroundNoise = false,
  visualFeedback = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  // Mock audio data - in real app, these would be actual audio files
  const audioLibrary = {
    animal: {
      bark: { duration: 1.2, description: 'Dog barking' },
      meow: { duration: 0.8, description: 'Cat meowing' },
      moo: { duration: 1.5, description: 'Cow mooing' },
      chirp: { duration: 0.6, description: 'Bird chirping' },
      roar: { duration: 2.0, description: 'Lion roaring' }
    },
    toy: {
      car: { duration: 1.0, description: 'Car engine sound' },
      bell: { duration: 0.5, description: 'Bell ringing' },
      drum: { duration: 0.8, description: 'Drum beating' },
      whistle: { duration: 1.2, description: 'Whistle blowing' },
      rattle: { duration: 0.7, description: 'Baby rattle' }
    },
    environmental: {
      rain: { duration: 3.0, description: 'Rain falling' },
      wind: { duration: 2.5, description: 'Wind blowing' },
      door: { duration: 0.8, description: 'Door closing' },
      phone: { duration: 1.5, description: 'Phone ringing' },
      clock: { duration: 1.0, description: 'Clock ticking' }
    },
    speech: {
      hello: { duration: 0.8, description: 'Hello greeting' },
      bye: { duration: 0.6, description: 'Goodbye' },
      yes: { duration: 0.4, description: 'Yes response' },
      no: { duration: 0.4, description: 'No response' },
      name: { duration: 1.0, description: 'Name calling' }
    }
  };

  const currentSound = audioLibrary[soundType]?.[soundName] || { duration: 1.0, description: 'Unknown sound' };

  // Mock audio playback simulation
  const simulateAudioPlayback = () => {
    setIsLoading(true);
    setIsPlaying(true);
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setDuration(currentSound.duration);
      
      // Simulate playback progress
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSound.duration) {
            clearInterval(interval);
            setIsPlaying(false);
            setCurrentTime(0);
            onEnd && onEnd();
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);

      onPlay && onPlay();
      
      return () => clearInterval(interval);
    }, 200);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      simulateAudioPlayback();
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      onPause && onPause();
    }
  };

  const handleVolumeChange = (newVolume) => {
    setCurrentVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleReplay = () => {
    setCurrentTime(0);
    if (!isPlaying) {
      simulateAudioPlayback();
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay) {
      setTimeout(() => simulateAudioPlayback(), 500);
    }
  }, [autoPlay, soundName]);

  // Spatial audio simulation (visual indication)
  const getSpatialIndicator = () => {
    if (direction === 'left') return '← ';
    if (direction === 'right') return ' →';
    return '';
  };

  const getVolumeIcon = () => {
    if (isMuted || currentVolume === 0) return FiVolumeX;
    return FiVolume2;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Audio Info */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <FiHeadphones className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {getSpatialIndicator()}{currentSound.description}{getSpatialIndicator()}
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          {soundType.charAt(0).toUpperCase() + soundType.slice(1)} Sound • {currentSound.duration}s
        </p>
        {backgroundNoise && (
          <div className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full mt-2">
            Background noise included
          </div>
        )}
      </div>

      {/* Visual Feedback */}
      {visualFeedback && isPlaying && (
        <div className="flex justify-center mb-4">
          <div className="flex space-x-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-blue-400 rounded-full animate-pulse ${
                  direction === 'left' && i < 3 ? 'bg-blue-600' :
                  direction === 'right' && i > 4 ? 'bg-blue-600' : ''
                }`}
                style={{
                  height: `${Math.random() * 30 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Play Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handlePlay}
          disabled={isLoading}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
              : isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 hover:scale-105'
          }`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <FiPause className="w-6 h-6 text-white" />
          ) : (
            <FiPlay className="w-6 h-6 text-white ml-1" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {duration > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{currentTime.toFixed(1)}s</span>
            <span>{duration.toFixed(1)}s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-center space-x-4">
          {/* Replay Button */}
          <button
            onClick={handleReplay}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            title="Replay"
          >
            <FiRotateCcw className="w-4 h-4" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMute}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            >
              {React.createElement(getVolumeIcon(), { className: "w-4 h-4" })}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : currentVolume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Sound Direction Indicator */}
      {direction !== 'center' && (
        <div className="mt-4 text-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            direction === 'left' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}>
            {direction === 'left' ? '← Left Side' : 'Right Side →'}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 text-center">
          {isPlaying ? 'Listen carefully to the sound!' : 'Click the play button to hear the sound'}
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;

import React, { useRef, useEffect, useState } from 'react';
import { 
  FiVideo, 
  FiVideoOff, 
  FiMic, 
  FiMicOff, 
  FiSettings,
  FiMaximize2,
  FiMinimize2,
  FiRotateCcw,
  FiCamera
} from 'react-icons/fi';

const VideoCapture = ({ 
  isActive, 
  onVideoToggle, 
  onAudioToggle, 
  onFrameCapture,
  width = 640,
  height = 480,
  showControls = true,
  className = ""
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [devices, setDevices] = useState({ video: [], audio: [] });
  const [selectedVideoDevice, setSelectedVideoDevice] = useState('');
  const [selectedAudioDevice, setSelectedAudioDevice] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get available media devices
  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const audioDevices = devices.filter(device => device.kind === 'audioinput');
      
      setDevices({ video: videoDevices, audio: audioDevices });
      
      if (videoDevices.length > 0 && !selectedVideoDevice) {
        setSelectedVideoDevice(videoDevices[0].deviceId);
      }
      if (audioDevices.length > 0 && !selectedAudioDevice) {
        setSelectedAudioDevice(audioDevices[0].deviceId);
      }
    } catch (error) {
      console.error('Error getting devices:', error);
      setError('Unable to access media devices');
    }
  };

  // Start video capture
  const startCapture = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const constraints = {
        video: {
          deviceId: selectedVideoDevice ? { exact: selectedVideoDevice } : undefined,
          width: { ideal: width },
          height: { ideal: height },
          facingMode: 'user'
        },
        audio: isAudioOn ? {
          deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined,
          echoCancellation: true,
          noiseSuppression: true
        } : false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsVideoOn(true);
        
        // Start frame capture for processing
        if (onFrameCapture) {
          startFrameCapture();
        }
      }
    } catch (error) {
      console.error('Error starting capture:', error);
      setError('Unable to access camera or microphone');
    } finally {
      setIsLoading(false);
    }
  };

  // Stop video capture
  const stopCapture = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsVideoOn(false);
  };

  // Capture frames for processing
  const startFrameCapture = () => {
    const captureFrame = () => {
      if (videoRef.current && canvasRef.current && isVideoOn) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Get image data for processing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (onFrameCapture) {
          onFrameCapture(imageData, canvas.toDataURL('image/jpeg', 0.8));
        }
      }
      
      if (isVideoOn) {
        requestAnimationFrame(captureFrame);
      }
    };
    
    requestAnimationFrame(captureFrame);
  };

  // Toggle video
  const handleVideoToggle = () => {
    if (isVideoOn) {
      stopCapture();
    } else {
      startCapture();
    }
    if (onVideoToggle) onVideoToggle(!isVideoOn);
  };

  // Toggle audio
  const handleAudioToggle = () => {
    setIsAudioOn(!isAudioOn);
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isAudioOn;
      });
    }
    if (onAudioToggle) onAudioToggle(!isAudioOn);
  };

  // Switch camera
  const switchCamera = async () => {
    const videoDevices = devices.video;
    if (videoDevices.length > 1) {
      const currentIndex = videoDevices.findIndex(device => device.deviceId === selectedVideoDevice);
      const nextIndex = (currentIndex + 1) % videoDevices.length;
      setSelectedVideoDevice(videoDevices[nextIndex].deviceId);
      
      if (isVideoOn) {
        stopCapture();
        setTimeout(startCapture, 100);
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    getDevices();
    
    // Listen for device changes
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    
    return () => {
      stopCapture();
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, []);

  useEffect(() => {
    if (isActive && !isVideoOn) {
      startCapture();
    } else if (!isActive && isVideoOn) {
      stopCapture();
    }
  }, [isActive]);

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`w-full h-full object-cover ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
        style={{ aspectRatio: `${width}/${height}` }}
      />
      
      {/* Hidden Canvas for Frame Capture */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Overlay when video is off */}
      {!isVideoOn && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-center text-gray-400">
            <FiVideoOff className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg mb-4">Camera is off</p>
            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}
            <button
              onClick={handleVideoToggle}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Starting...' : 'Turn on Camera'}
            </button>
          </div>
        </div>
      )}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Starting camera...</p>
          </div>
        </div>
      )}
      
      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-3 bg-black bg-opacity-50 rounded-full px-4 py-2">
            <button
              onClick={handleVideoToggle}
              className={`p-2 rounded-full transition-colors ${
                isVideoOn ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isVideoOn ? <FiVideo className="w-5 h-5" /> : <FiVideoOff className="w-5 h-5" />}
            </button>
            
            <button
              onClick={handleAudioToggle}
              className={`p-2 rounded-full transition-colors ${
                isAudioOn ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isAudioOn ? <FiMic className="w-5 h-5" /> : <FiMicOff className="w-5 h-5" />}
            </button>
            
            {devices.video.length > 1 && (
              <button
                onClick={switchCamera}
                className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                <FiRotateCcw className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            >
              {isFullscreen ? <FiMinimize2 className="w-5 h-5" /> : <FiMaximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
      
      {/* Device Selection */}
      {showControls && devices.video.length > 0 && (
        <div className="absolute top-4 right-4">
          <select
            value={selectedVideoDevice}
            onChange={(e) => setSelectedVideoDevice(e.target.value)}
            className="bg-black bg-opacity-50 text-white text-sm rounded px-2 py-1 border-none"
          >
            {devices.video.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* Recording Indicator */}
      {isVideoOn && isActive && (
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live</span>
        </div>
      )}
    </div>
  );
};

export default VideoCapture;

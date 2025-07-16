import { useState, useEffect, useRef } from 'react';
import { FiCamera, FiCameraOff, FiMove, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

const GestureRecognition = ({
  targetSign,
  onRecognitionResult,
  isActive = false,
  showHandTracking = true,
  confidenceThreshold = 0.8,
  recognitionTimeout = 5000
}) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [handDetected, setHandDetected] = useState(false);
  const [recognitionProgress, setRecognitionProgress] = useState(0);
  const [error, setError] = useState(null);
  const [handLandmarks, setHandLandmarks] = useState([]);
  const [cameraPermission, setCameraPermission] = useState('prompt'); // 'granted', 'denied', 'prompt'
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Mock hand tracking points for visualization
  const mockHandLandmarks = [
    { x: 150, y: 100, label: 'wrist' },
    { x: 140, y: 80, label: 'thumb_tip' },
    { x: 160, y: 70, label: 'index_tip' },
    { x: 170, y: 75, label: 'middle_tip' },
    { x: 175, y: 80, label: 'ring_tip' },
    { x: 180, y: 85, label: 'pinky_tip' }
  ];

  // Initialize camera
  const startCamera = async () => {
    try {
      setError(null);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user' // Front-facing camera
        },
        audio: false
      });

      // Set video stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setCameraActive(true);
      setCameraPermission('granted');

      // Simulate hand detection after camera starts
      setTimeout(() => {
        setHandDetected(true);
        if (showHandTracking) {
          setHandLandmarks(mockHandLandmarks);
        }
      }, 1000);

    } catch (err) {
      console.error('Camera access error:', err);
      setCameraPermission('denied');

      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions in your browser settings and refresh the page.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please connect a camera and try again.');
      } else if (err.name === 'NotReadableError') {
        setError('Camera is already in use by another application.');
      } else {
        setError('Unable to access camera. Please check your browser settings and try again.');
      }

      setCameraActive(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    // Stop video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
    setHandDetected(false);
    setHandLandmarks([]);
    setIsProcessing(false);
    setRecognitionProgress(0);
  };

  // Mock gesture recognition process
  const processGesture = async () => {
    if (!handDetected || !targetSign) return;

    setIsProcessing(true);
    setRecognitionProgress(0);

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setRecognitionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate AI processing delay
    setTimeout(() => {
      clearInterval(progressInterval);
      
      // Mock recognition results
      const accuracy = 60 + Math.random() * 40; // 60-100%
      const confidence = accuracy / 100;
      const isCorrect = confidence >= confidenceThreshold;
      
      const result = {
        targetSign,
        recognized: isCorrect,
        confidence: confidence,
        accuracy: Math.round(accuracy),
        timestamp: Date.now(),
        feedback: generateFeedback(isCorrect, accuracy, targetSign),
        handPosition: {
          detected: handDetected,
          landmarks: handLandmarks.length > 0
        }
      };

      setIsProcessing(false);
      setRecognitionProgress(0);
      
      if (onRecognitionResult) {
        onRecognitionResult(result);
      }
    }, recognitionTimeout);
  };

  // Generate contextual feedback
  const generateFeedback = (isCorrect, accuracy, sign) => {
    if (isCorrect) {
      if (accuracy >= 95) return `Perfect! Your "${sign}" sign was excellent!`;
      if (accuracy >= 85) return `Great job! Your "${sign}" sign was recognized correctly!`;
      return `Good work! Your "${sign}" sign was recognized!`;
    } else {
      if (accuracy >= 70) return `Close! Your "${sign}" sign needs minor adjustments.`;
      if (accuracy >= 50) return `Getting there! Keep practicing your "${sign}" sign.`;
      return `Let's try again! Focus on the key points for "${sign}".`;
    }
  };

  // Auto-start processing when active
  useEffect(() => {
    if (isActive && cameraActive && handDetected && !isProcessing) {
      const timer = setTimeout(() => {
        processGesture();
      }, 1000); // 1 second delay before processing
      
      return () => clearTimeout(timer);
    }
  }, [isActive, cameraActive, handDetected, targetSign]);

  // Check camera permissions on mount
  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const permission = await navigator.permissions.query({ name: 'camera' });
        setCameraPermission(permission.state);

        permission.addEventListener('change', () => {
          setCameraPermission(permission.state);
        });
      } catch (err) {
        console.log('Permission API not supported');
      }
    };

    checkCameraPermission();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">AI Gesture Recognition</h3>
        <div className="flex items-center space-x-4">
          {/* Camera Status */}
          {cameraActive ? (
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Camera Active</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm">Camera Inactive</span>
            </div>
          )}

          {/* Permission Status */}
          {cameraPermission === 'denied' && (
            <div className="flex items-center space-x-2 text-red-600">
              <FiX className="w-4 h-4" />
              <span className="text-sm">Permission Denied</span>
            </div>
          )}
        </div>
      </div>

      {/* Camera View */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
        {/* Real camera feed */}
        {cameraActive ? (
          <div className="relative w-full h-full">
            {/* Video element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />

            {/* Canvas for overlays */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <FiCameraOff className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Camera Not Active</p>
              <p className="text-sm">Click "Start Camera" to begin gesture recognition</p>
            </div>
            </div>
          )}
  
          {/* Hand tracking overlay */}
          {showHandTracking && handLandmarks.length > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Hand skeleton */}
              <g stroke="#10B981" strokeWidth="3" fill="none">
                {/* Connecting lines between landmarks */}
                <line x1="150" y1="100" x2="140" y2="80" />
                <line x1="150" y1="100" x2="160" y2="70" />
                <line x1="150" y1="100" x2="170" y2="75" />
                <line x1="150" y1="100" x2="175" y2="80" />
                <line x1="150" y1="100" x2="180" y2="85" />
              </g>
  
              {/* Landmark points */}
              {handLandmarks.map((landmark, index) => (
                <circle
                  key={index}
                  cx={landmark.x}
                  cy={landmark.y}
                  r="5"
                  fill="#10B981"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              ))}
            </svg>
          )}
  
          {/* Hand detection indicator */}
          {handDetected && (
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
              <FiMove className="w-4 h-4" />
              <span>Hand Detected</span>
            </div>
          )}
  
          {/* Processing indicator */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-900 font-medium mb-2">Analyzing Gesture...</p>
                <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${recognitionProgress}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 text-sm">{recognitionProgress}% complete</p>
              </div>
            </div>
          )}
        </div>

        {targetSign && cameraActive && (
          <div className="absolute top-4 right-4 bg-blue-500/80 text-white px-3 py-2 rounded-lg text-sm">
            <p className="font-medium">Target Sign:</p>
            <p className="text-lg">{targetSign}</p>
          </div>
        )}
      {/* Controls */}
      <div className="flex flex-col items-center space-y-4 mb-6">
        <div className="flex items-center justify-center space-x-4">
          {!cameraActive ? (
            <button
              onClick={startCamera}
              disabled={cameraPermission === 'denied'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCamera className="w-5 h-5 inline mr-2" />
              {cameraPermission === 'denied' ? 'Camera Access Denied' : 'Start Camera'}
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <FiCameraOff className="w-5 h-5 inline mr-2" />
              Stop Camera
            </button>
          )}

          {cameraActive && !isProcessing && (
            <button
              onClick={processGesture}
              disabled={!handDetected || !targetSign}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiMove className="w-5 h-5 inline mr-2" />
              Recognize Gesture
            </button>
          )}
        </div>

        {/* Permission Instructions */}
        {cameraPermission === 'denied' && (
          <div className="text-center text-sm text-gray-600 max-w-md">
            <p>Camera access is required for gesture recognition.</p>
            <p className="mt-1">Please enable camera permissions in your browser settings and refresh the page.</p>
          </div>
        )}

        {cameraPermission === 'prompt' && !cameraActive && (
          <div className="text-center text-sm text-gray-600 max-w-md">
            <p>Click "Start Camera" and allow camera access when prompted.</p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <FiAlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Error</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Status Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Recognition Status</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Camera:</span>
            <span className={`font-medium ${cameraActive ? 'text-green-600' : 'text-red-600'}`}>
              {cameraActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hand Detection:</span>
            <span className={`font-medium ${handDetected ? 'text-green-600' : 'text-gray-600'}`}>
              {handDetected ? 'Detected' : 'Not Detected'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Target Sign:</span>
            <span className="font-medium text-gray-900">{targetSign || 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Processing:</span>
            <span className={`font-medium ${isProcessing ? 'text-blue-600' : 'text-gray-600'}`}>
              {isProcessing ? 'Active' : 'Idle'}
            </span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Tips for Better Recognition</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Ensure good lighting and clear background</li>
          <li>• Keep your hands within the camera frame</li>
          <li>• Make clear, deliberate gestures</li>
          <li>• Hold the sign for 2-3 seconds for better recognition</li>
        </ul>
      </div>
    </div>
  );
};

export default GestureRecognition;

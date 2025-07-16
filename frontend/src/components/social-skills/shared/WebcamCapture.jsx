import React, { useRef, useEffect, useState } from 'react';
import { FaCamera, FaStop, FaPlay, FaRedo } from 'react-icons/fa';

const WebcamCapture = ({ onCapture, onSignDetected, isRecording, onRecordingChange }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [detectedSign, setDetectedSign] = useState(null);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && videoRef.current) {
      const interval = setInterval(() => {
        simulateSignDetection();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      setError('Camera access denied or not available');
      console.error('Error accessing camera:', err);
    }
  };

  const simulateSignDetection = () => {
    // Simulate AI sign detection (replace with actual AI integration)
    const signs = ['Hello', 'Thank you', 'Please', 'Sorry', 'Yes', 'No', 'Help', 'More'];
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    const randomConfidence = Math.random() * 0.4 + 0.6; // 60-100% confidence
    
    setDetectedSign(randomSign);
    setConfidence(randomConfidence);
    
    if (onSignDetected) {
      onSignDetected({
        sign: randomSign,
        confidence: randomConfidence,
        timestamp: Date.now()
      });
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/png');
      if (onCapture) {
        onCapture(imageData);
      }
    }
  };

  const toggleRecording = () => {
    if (onRecordingChange) {
      onRecordingChange(!isRecording);
    }
  };

  const restartCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    startCamera();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign Language Capture</h3>
        <p className="text-sm text-gray-600">Position yourself in front of the camera and start signing</p>
      </div>

      {/* Video Display */}
      <div className="relative mb-4">
        {error ? (
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <FaCamera className="text-4xl text-gray-400 mb-2 mx-auto" />
              <p className="text-gray-600">{error}</p>
              <button
                onClick={restartCamera}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaRedo className="inline mr-2" />
                Retry Camera
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover rounded-lg bg-black"
            />
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Recording
              </div>
            )}

            {/* Sign Detection Overlay */}
            {isRecording && detectedSign && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-3 py-2 rounded">
                <div className="text-sm font-semibold">{detectedSign}</div>
                <div className="text-xs">
                  Confidence: {(confidence * 100).toFixed(1)}%
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleRecording}
          disabled={!!error}
          className={`px-6 py-2 rounded-lg font-medium flex items-center ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          } disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          {isRecording ? (
            <>
              <FaStop className="mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <FaPlay className="mr-2" />
              Start Recording
            </>
          )}
        </button>

        <button
          onClick={captureFrame}
          disabled={!!error}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FaCamera className="mr-2" />
          Capture Frame
        </button>
      </div>

      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Detection Results */}
      {detectedSign && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Latest Detection:</h4>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-blue-900">{detectedSign}</span>
            <div className="text-sm text-blue-700">
              {(confidence * 100).toFixed(1)}% confident
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;

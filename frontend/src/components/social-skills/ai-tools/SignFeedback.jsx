import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCamera, 
  FaPlay, 
  FaStop, 
  FaRedo,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaLightbulb,
  FaTrophy
} from 'react-icons/fa';

const SignFeedback = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [targetSign, setTargetSign] = useState('Hello');
  const [accuracy, setAccuracy] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const availableSigns = [
    'Hello', 'Thank you', 'Please', 'Sorry', 'Yes', 'No', 
    'Help', 'Love', 'Family', 'Friend', 'Good', 'Bad'
  ];

  const feedbackTypes = {
    excellent: { color: 'green', icon: FaCheckCircle, threshold: 90 },
    good: { color: 'blue', icon: FaCheckCircle, threshold: 70 },
    needs_improvement: { color: 'yellow', icon: FaExclamationTriangle, threshold: 50 },
    incorrect: { color: 'red', icon: FaTimes, threshold: 0 }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setFeedback(null);
    setAccuracy(0);
    
    // Simulate real-time analysis
    const analysisInterval = setInterval(() => {
      if (!isRecording) {
        clearInterval(analysisInterval);
        return;
      }
      
      // Simulate AI analysis with random accuracy
      const currentAccuracy = Math.random() * 100;
      setAccuracy(currentAccuracy);
      
      // Generate real-time feedback
      generateRealTimeFeedback(currentAccuracy);
    }, 500);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsAnalyzing(true);
    
    // Simulate final analysis
    setTimeout(() => {
      const finalAccuracy = Math.random() * 100;
      setAccuracy(finalAccuracy);
      generateDetailedFeedback(finalAccuracy);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateRealTimeFeedback = (currentAccuracy) => {
    const feedbackMessages = {
      excellent: [
        "Perfect hand position! 🎯",
        "Excellent form! Keep it up! ⭐",
        "Outstanding execution! 🏆"
      ],
      good: [
        "Good job! Minor adjustments needed 👍",
        "Nice work! Almost there! 💪",
        "Well done! Small improvements possible 🎯"
      ],
      needs_improvement: [
        "Adjust your hand position slightly 🤏",
        "Try to be more precise with finger placement 👆",
        "Good effort! Focus on hand shape 🖐️"
      ],
      incorrect: [
        "Let's try again - check the reference 🔄",
        "Different sign detected - keep practicing 📚",
        "Not quite right - review the instructions 📖"
      ]
    };

    let feedbackType = 'incorrect';
    if (currentAccuracy >= 90) feedbackType = 'excellent';
    else if (currentAccuracy >= 70) feedbackType = 'good';
    else if (currentAccuracy >= 50) feedbackType = 'needs_improvement';

    const messages = feedbackMessages[feedbackType];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    setFeedback({
      type: feedbackType,
      message: randomMessage,
      accuracy: currentAccuracy,
      isRealTime: true
    });
  };

  const generateDetailedFeedback = (finalAccuracy) => {
    let feedbackType = 'incorrect';
    if (finalAccuracy >= 90) feedbackType = 'excellent';
    else if (finalAccuracy >= 70) feedbackType = 'good';
    else if (finalAccuracy >= 50) feedbackType = 'needs_improvement';

    const detailedFeedback = {
      excellent: {
        message: "Excellent work! Your sign was performed with great accuracy.",
        tips: [
          "Your hand position was perfect",
          "Facial expression was appropriate",
          "Movement timing was excellent",
          "Overall form was outstanding"
        ],
        nextSteps: [
          "Try practicing at different speeds",
          "Practice in different lighting conditions",
          "Move on to more complex signs"
        ]
      },
      good: {
        message: "Good job! Your sign was mostly correct with minor areas for improvement.",
        tips: [
          "Hand position was mostly accurate",
          "Consider refining finger placement",
          "Movement was good but could be smoother",
          "Facial expression could be more expressive"
        ],
        nextSteps: [
          "Practice the hand shape more",
          "Focus on smooth movements",
          "Watch reference videos again"
        ]
      },
      needs_improvement: {
        message: "Keep practicing! There are several areas where you can improve.",
        tips: [
          "Hand position needs adjustment",
          "Finger placement could be more precise",
          "Movement timing needs work",
          "Review the basic hand shape"
        ],
        nextSteps: [
          "Practice basic hand shapes first",
          "Slow down your movements",
          "Use a mirror for self-correction",
          "Review instructional materials"
        ]
      },
      incorrect: {
        message: "This doesn't match the target sign. Let's review and try again.",
        tips: [
          "Review the sign instructions carefully",
          "Check hand position and shape",
          "Ensure proper movement direction",
          "Practice basic components first"
        ],
        nextSteps: [
          "Watch the reference video again",
          "Practice individual components",
          "Start with simpler signs",
          "Ask for help if needed"
        ]
      }
    };

    setFeedback({
      type: feedbackType,
      message: detailedFeedback[feedbackType].message,
      accuracy: finalAccuracy,
      tips: detailedFeedback[feedbackType].tips,
      nextSteps: detailedFeedback[feedbackType].nextSteps,
      isRealTime: false
    });
  };

  const getFeedbackColor = (type) => {
    const colors = {
      excellent: 'text-green-600 bg-green-50 border-green-200',
      good: 'text-blue-600 bg-blue-50 border-blue-200',
      needs_improvement: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      incorrect: 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[type] || colors.incorrect;
  };

  const getFeedbackIcon = (type) => {
    const icons = {
      excellent: FaTrophy,
      good: FaCheckCircle,
      needs_improvement: FaExclamationTriangle,
      incorrect: FaTimes
    };
    const IconComponent = icons[type] || FaTimes;
    return <IconComponent />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-green-600 hover:text-green-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Sign Accuracy Feedback</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Camera and Controls */}
          <div className="space-y-6">
            {/* Sign Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Sign to Practice</h3>
              <select
                value={targetSign}
                onChange={(e) => setTargetSign(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {availableSigns.map(sign => (
                  <option key={sign} value={sign}>{sign}</option>
                ))}
              </select>
              <p className="text-sm text-gray-600 mt-2">
                Practice signing "{targetSign}" and get real-time feedback
              </p>
            </div>

            {/* Camera Feed */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Camera Feed</h3>
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
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    Recording
                  </div>
                )}

                {/* Real-time Accuracy */}
                {isRecording && accuracy > 0 && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-3 py-2 rounded">
                    <div className="text-sm font-semibold">Accuracy</div>
                    <div className="text-lg">{accuracy.toFixed(1)}%</div>
                  </div>
                )}

                {/* Analysis Overlay */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <div>Analyzing your sign...</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isAnalyzing}
                  className={`px-6 py-2 rounded-lg font-medium flex items-center ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  {isRecording ? (
                    <>
                      <FaStop className="mr-2" />
                      Stop & Analyze
                    </>
                  ) : (
                    <>
                      <FaPlay className="mr-2" />
                      Start Practice
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setFeedback(null);
                    setAccuracy(0);
                  }}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center"
                >
                  <FaRedo className="mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Feedback and Tips */}
          <div className="space-y-6">
            {/* Real-time Feedback */}
            {feedback && (
              <div className={`rounded-lg shadow-lg p-6 border-2 ${getFeedbackColor(feedback.type)}`}>
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">
                    {getFeedbackIcon(feedback.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {feedback.isRealTime ? 'Real-time Feedback' : 'Analysis Complete'}
                    </h3>
                    <div className="text-sm opacity-75">
                      Accuracy: {feedback.accuracy.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">{feedback.message}</p>

                {/* Detailed Feedback */}
                {!feedback.isRealTime && feedback.tips && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FaLightbulb className="mr-2" />
                        Tips for Improvement:
                      </h4>
                      <ul className="space-y-1">
                        {feedback.tips.map((tip, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <span className="mr-2">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <ul className="space-y-1">
                        {feedback.nextSteps.map((step, index) => (
                          <li key={index} className="text-sm flex items-start">
                            <span className="mr-2">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Use</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-semibold text-xs">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Select a sign</div>
                    <div>Choose the sign you want to practice from the dropdown</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-semibold text-xs">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Position yourself</div>
                    <div>Make sure you're clearly visible in the camera frame</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-semibold text-xs">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Start practicing</div>
                    <div>Click "Start Practice" and perform the sign</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 font-semibold text-xs">4</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Get feedback</div>
                    <div>Receive real-time accuracy scores and improvement tips</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Practice Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Today's practice sessions:</span>
                  <span className="font-semibold text-green-600">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average accuracy:</span>
                  <span className="font-semibold text-blue-600">78.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Signs practiced:</span>
                  <span className="font-semibold text-purple-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Improvement streak:</span>
                  <span className="font-semibold text-orange-600">3 days 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignFeedback;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiVolume2,
  FiVolumeX,
  FiSettings,
  FiUsers,
  FiShare2,
  FiDownload,
  FiPlay,
  FiPause,
  FiRefreshCw,
  FiMessageSquare,
  FiMonitor,
  FiZap
} from 'react-icons/fi';
import VideoCapture from '../components/translation/VideoCapture';
import SignLanguageAvatar from '../components/translation/SignLanguageAvatar';
import RealTimeTranslator from '../components/translation/RealTimeTranslator';
import LiveVideoChat from '../components/translation/LiveVideoChat';
import translationEngine from '../services/translationEngine';

const AITranslationHub = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState('speech-to-text');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [translationText, setTranslationText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [showVideoChat, setShowVideoChat] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}`);
  const [translationResults, setTranslationResults] = useState([]);
  const [isAvatarPlaying, setIsAvatarPlaying] = useState(false);
  const [avatarSpeed, setAvatarSpeed] = useState(1);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const translationModes = [
    {
      id: 'speech-to-text',
      title: 'Speech to Text',
      description: 'Convert spoken words into written text',
      icon: <FiMic className="w-6 h-6" />,
      color: 'blue',
      features: ['Real-time transcription', 'Multi-language support', 'Noise cancellation']
    },
    {
      id: 'sign-to-speech',
      title: 'Sign to Speech',
      description: 'Convert sign language gestures to spoken words',
      icon: <FiVideo className="w-6 h-6" />,
      color: 'green',
      features: ['Gesture recognition', 'Natural voice synthesis', 'Context awareness']
    },
    {
      id: 'text-to-sign',
      title: 'Text to Sign',
      description: 'Convert written text to sign language animation',
      icon: <FiPlay className="w-6 h-6" />,
      color: 'purple',
      features: ['3D avatar animation', 'Cultural variations', 'Speed control']
    }
  ];

  const getCurrentMode = () => {
    return translationModes.find(mode => mode.id === activeMode);
  };

  const startVideoCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: isAudioOn
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
        setIsVideoOn(true);
        setConnectionStatus('connected');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setConnectionStatus('error');
    }
  };

  const stopVideoCapture = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsVideoOn(false);
    setConnectionStatus('disconnected');
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setTranslationText('Hello, how are you today? I hope you are doing well.');
      }, 2000);
    } else {
      setIsRecording(true);
      setTranslationText('');
    }
  };

  const toggleVideo = () => {
    if (isVideoOn) {
      stopVideoCapture();
    } else {
      startVideoCapture();
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (mediaStreamRef.current) {
      const audioTracks = mediaStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isAudioOn;
      });
    }
  };

  const getColorClasses = (color, variant = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600',
        border: 'border-blue-200',
        light: 'bg-blue-50'
      },
      green: {
        bg: 'bg-green-600 hover:bg-green-700',
        text: 'text-green-600',
        border: 'border-green-200',
        light: 'bg-green-50'
      },
      purple: {
        bg: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600',
        border: 'border-purple-200',
        light: 'bg-purple-50'
      }
    };
    return colors[color]?.[variant] || colors.blue[variant];
  };

  useEffect(() => {
    return () => {
      stopVideoCapture();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">AI Translation Hub</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                connectionStatus === 'connected' ? 'bg-green-100 text-green-700' :
                connectionStatus === 'error' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {connectionStatus === 'connected' ? '● Connected' :
                 connectionStatus === 'error' ? '● Error' : '● Disconnected'}
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                <FiSettings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Translation Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {translationModes.map((mode) => (
              <div
                key={mode.id}
                className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${
                  activeMode === mode.id
                    ? `${getColorClasses(mode.color, 'border')} ${getColorClasses(mode.color, 'light')}`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                onClick={() => setActiveMode(mode.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    activeMode === mode.id ? getColorClasses(mode.color, 'bg') + ' text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {mode.icon}
                  </div>
                  {activeMode === mode.id && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{mode.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{mode.description}</p>
                <div className="space-y-1">
                  {mode.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-500">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features Toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <FiZap className="w-5 h-5" />
                <span>Advanced AI Features</span>
              </button>
              <button
                onClick={() => setShowVideoChat(!showVideoChat)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <FiVideo className="w-5 h-5" />
                <span>Live Video Chat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Video Chat */}
        {showVideoChat && (
          <div className="mb-8">
            <LiveVideoChat
              sessionId={sessionId}
              onTranslationReceived={(result) => setTranslationResults(prev => [result, ...prev])}
            />
          </div>
        )}

        {/* Main Translation Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video/Input Section */}
          <div className="space-y-6">
            {activeMode === 'speech-to-text' && (
              <RealTimeTranslator
                mode="speech-to-text"
                onTranslationResult={(result) => {
                  setTranslationText(result.translated);
                  setTranslationResults(prev => [result, ...prev.slice(0, 4)]);
                }}
              />
            )}

            {(activeMode === 'sign-to-speech' || activeMode === 'text-to-sign') && (
              <VideoCapture
                isActive={isRecording}
                onVideoToggle={setIsVideoOn}
                onAudioToggle={setIsAudioOn}
                onFrameCapture={(imageData, dataUrl) => {
                  if (activeMode === 'sign-to-speech') {
                    // Process sign language recognition
                    translationEngine.recognizeSignLanguage(imageData, (result) => {
                      setTranslationText(result.text);
                      setTranslationResults(prev => [{
                        id: Date.now(),
                        original: `[Sign: ${result.gesture}]`,
                        translated: result.text,
                        confidence: result.confidence,
                        timestamp: new Date()
                      }, ...prev.slice(0, 4)]);
                    });
                  }
                }}
                showControls={true}
                className="h-80"
              />
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Sign Language Avatar for Text-to-Sign */}
            {activeMode === 'text-to-sign' && (
              <SignLanguageAvatar
                text={translationText}
                isPlaying={isAvatarPlaying}
                onPlayStateChange={setIsAvatarPlaying}
                speed={avatarSpeed}
                onSpeedChange={setAvatarSpeed}
              />
            )}

            {/* Translation Results */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Translation Results</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => translationEngine.textToSpeech(translationText)}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <FiVolume2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                    <FiDownload className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Current Translation */}
              {translationText && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Latest Translation</span>
                    <span className="text-xs text-gray-500">Just now</span>
                  </div>
                  <p className="text-lg text-gray-900 font-medium">{translationText}</p>
                </div>
              )}

              {/* Translation History */}
              {translationResults.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recent Translations</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {translationResults.map((result) => (
                      <div key={result.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-gray-600 text-sm mb-1">{result.original}</p>
                            <p className="text-gray-900 font-medium">{result.translated}</p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            <button
                              onClick={() => navigator.clipboard.writeText(result.translated)}
                              className="p-1 text-gray-600 hover:text-gray-900 rounded"
                            >
                              <FiShare2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => translationEngine.textToSpeech(result.translated)}
                              className="p-1 text-gray-600 hover:text-gray-900 rounded"
                            >
                              <FiVolume2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{result.timestamp.toLocaleTimeString()}</span>
                          {result.confidence && (
                            <span>Confidence: {Math.round(result.confidence * 100)}%</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results State */}
              {!translationText && translationResults.length === 0 && (
                <div className="flex items-center justify-center h-40 text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🎯</div>
                    <p>Start translating to see results here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Advanced AI Features */}
        {showAdvancedFeatures && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Emotion Detection */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <span className="text-pink-600 text-xl">😊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Emotion Detection</h3>
                  <p className="text-sm text-gray-600">AI-powered emotion analysis</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Happy</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Confident</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">72%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Calm</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">68%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Context Awareness */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-xl">🧠</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Context Awareness</h3>
                  <p className="text-sm text-gray-600">Smart conversation context</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-900">Current Context</span>
                    <span className="text-xs text-blue-600">92% confidence</span>
                  </div>
                  <p className="text-sm text-blue-800">Greeting & Introduction</p>
                </div>

                <div className="text-xs text-gray-600">
                  <p className="mb-1">• Formal conversation detected</p>
                  <p className="mb-1">• Professional setting likely</p>
                  <p>• First-time interaction</p>
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">💡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Suggestions</h3>
                  <p className="text-sm text-gray-600">AI-powered phrase suggestions</p>
                </div>
              </div>

              <div className="space-y-2">
                {['Hello, nice to meet you', 'How can I help you?', 'Thank you for your time'].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTranslationText(suggestion);
                      if (activeMode === 'text-to-sign') {
                        setIsAvatarPlaying(true);
                      } else {
                        translationEngine.textToSpeech(suggestion);
                      }
                    }}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Session Statistics */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Session Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{translationResults.length}</div>
              <div className="text-sm text-gray-600">Translations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {translationResults.length > 0
                  ? Math.round(translationResults.reduce((acc, r) => acc + (r.confidence || 0), 0) / translationResults.length * 100)
                  : 0}%
              </div>
              <div className="text-sm text-gray-600">Avg. Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {translationEngine.getSupportedLanguages().length}
              </div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {showVideoChat ? participants.length + 1 : 1}
              </div>
              <div className="text-sm text-gray-600">Participants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITranslationHub;

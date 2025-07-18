import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiVideo, 
  FiVideoOff, 
  FiMic, 
  FiMicOff, 
  FiPhone,
  FiMessageCircle,
  FiSettings,
  FiMaximize2,
  FiMinimize2,
  FiUsers
} from 'react-icons/fi';

const TherapistVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  // Mock therapist data
  const therapist = {
    id: parseInt(id),
    name: id === '1' ? 'Dr. Shanika Madumali' :
          id === '2' ? 'Dr. Umali Silva' :
          id === '3' ? 'Dr. Pooja Jayanetti' :
          'Dr. Randuni Silva',
    specialty: id === '1' ? 'Speech-Language Pathology' :
              id === '2' ? 'Hearing & Auditory Processing' :
              id === '3' ? 'Sign Language Therapy' :
              'Communication Disorders',
    image: '/speech_therapy.jpg'
  };

  useEffect(() => {
    // Simulate connection process
    const connectTimer = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate('/my-therapist');
  };

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleToggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleOpenChat = () => {
    // In a real app, this might open a chat sidebar
    navigate(`/therapists/${id}/chat`);
  };

  if (isConnecting) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Connecting to {therapist.name}</h2>
          <p className="text-gray-300 mb-6">Please wait while we establish the connection...</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <button
            onClick={handleEndCall}
            className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'} bg-gray-900 flex flex-col`}>
      {/* Header */}
      <div className="bg-black bg-opacity-50 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={therapist.image}
            alt={therapist.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">{therapist.name}</h2>
            <p className="text-sm text-gray-300">{therapist.specialty}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-green-400">●</span> {formatDuration(callDuration)}
          </div>
          <button
            onClick={handleToggleFullscreen}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            {isFullscreen ? <FiMinimize2 className="w-5 h-5" /> : <FiMaximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Main Video (Therapist) */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          {isConnected ? (
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{therapist.name}</h3>
              <p className="text-gray-300">Video call in progress</p>
            </div>
          ) : (
            <div className="text-white text-center">
              <FiVideo className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>Video not available</p>
            </div>
          )}
        </div>

        {/* User Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
          {isVideoOn ? (
            <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white">
              <div className="text-center">
                <FiUsers className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Your Video</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
              <div className="text-center">
                <FiVideoOff className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Video Off</p>
              </div>
            </div>
          )}
        </div>

        {/* Session Info Overlay */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          <div className="text-sm">
            <p className="font-medium">Therapy Session</p>
            <p className="text-gray-300">Individual Session</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-black bg-opacity-50 p-6">
        <div className="flex items-center justify-center space-x-6">
          {/* Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`p-4 rounded-full transition-colors ${
              isAudioOn
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isAudioOn ? <FiMic className="w-6 h-6" /> : <FiMicOff className="w-6 h-6" />}
          </button>

          {/* Video Toggle */}
          <button
            onClick={handleToggleVideo}
            className={`p-4 rounded-full transition-colors ${
              isVideoOn
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isVideoOn ? <FiVideo className="w-6 h-6" /> : <FiVideoOff className="w-6 h-6" />}
          </button>

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
          >
            <FiPhone className="w-6 h-6 transform rotate-135" />
          </button>

          {/* Chat */}
          <button
            onClick={handleOpenChat}
            className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
          >
            <FiMessageCircle className="w-6 h-6" />
          </button>

          {/* Settings */}
          <button className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors">
            <FiSettings className="w-6 h-6" />
          </button>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAudioOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isAudioOn ? 'Microphone On' : 'Microphone Off'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isVideoOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isVideoOn ? 'Camera On' : 'Camera Off'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* Session Notes (Optional) */}
      <div className="absolute bottom-20 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg max-w-sm">
        <h4 className="font-medium mb-2">Session Notes</h4>
        <p className="text-sm text-gray-300">
          Today we'll focus on articulation exercises and practice the "R" sound techniques we discussed.
        </p>
      </div>
    </div>
  );
};

export default TherapistVideo;

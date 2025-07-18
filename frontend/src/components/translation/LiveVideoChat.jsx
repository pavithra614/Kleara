import React, { useState, useRef, useEffect } from 'react';
import { 
  FiVideo, 
  FiVideoOff, 
  FiMic, 
  FiMicOff,
  FiPhone,
  FiPhoneOff,
  FiUsers,
  FiShare2,
  FiMessageSquare,
  FiSettings,
  FiMaximize2,
  FiMinimize2,
  FiMonitor,
  FiCopy,
  FiUserPlus
} from 'react-icons/fi';

const LiveVideoChat = ({ 
  sessionId,
  onTranslationReceived,
  className = ""
}) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [translationEnabled, setTranslationEnabled] = useState(true);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock participants data
  const mockParticipants = [
    {
      id: 'user1',
      name: 'John Doe',
      avatar: '👨‍💼',
      isVideoOn: true,
      isAudioOn: true,
      language: 'en-US',
      status: 'connected'
    },
    {
      id: 'user2',
      name: 'Maria Garcia',
      avatar: '👩‍💼',
      isVideoOn: true,
      isAudioOn: false,
      language: 'es-ES',
      status: 'connected'
    }
  ];

  // Initialize video call
  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoOn,
        audio: isAudioOn
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localStreamRef.current = stream;
      }

      setIsCallActive(true);
      setConnectionStatus('connected');
      setParticipants(mockParticipants);

      // Simulate receiving remote stream
      setTimeout(() => {
        simulateRemoteStream();
      }, 2000);

    } catch (error) {
      console.error('Error starting call:', error);
      setConnectionStatus('error');
    }
  };

  // End video call
  const endCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setIsCallActive(false);
    setConnectionStatus('disconnected');
    setParticipants([]);
    setIsScreenSharing(false);
  };

  // Simulate remote stream
  const simulateRemoteStream = async () => {
    try {
      // Create a mock remote stream (in real implementation, this would come from WebRTC)
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      
      // Draw a simple pattern
      ctx.fillStyle = '#4F46E5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Remote Participant', canvas.width / 2, canvas.height / 2);

      const stream = canvas.captureStream(30);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error simulating remote stream:', error);
    }
  };

  // Toggle video
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !isVideoOn;
      });
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isAudioOn;
      });
    }
  };

  // Start screen sharing
  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      setIsScreenSharing(true);

      // Handle screen share end
      screenStream.getVideoTracks()[0].onended = () => {
        setIsScreenSharing(false);
        // Switch back to camera
        if (localStreamRef.current && localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }
      };

    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  // Send chat message
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        text: newMessage,
        timestamp: new Date(),
        isTranslated: false,
        originalText: newMessage
      };

      setChatMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate translation for other participants
      setTimeout(() => {
        const translatedMessage = {
          ...message,
          id: Date.now() + 1,
          sender: 'Translation Bot',
          text: `[ES] ${newMessage}`, // Mock translation
          isTranslated: true,
          originalText: newMessage
        };
        setChatMessages(prev => [...prev, translatedMessage]);
      }, 1000);
    }
  };

  // Copy session link
  const copySessionLink = () => {
    const link = `${window.location.origin}/translation-hub/session/${sessionId}`;
    navigator.clipboard.writeText(link);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-gray-900">Live Video Chat</h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            connectionStatus === 'connected' ? 'bg-green-100 text-green-700' :
            connectionStatus === 'error' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {connectionStatus}
          </div>
          {participants.length > 0 && (
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <FiUsers className="w-4 h-4" />
              <span>{participants.length + 1} participants</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={copySessionLink}
            className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <FiCopy className="w-4 h-4" />
            <span className="text-sm">Copy Link</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            {isFullscreen ? <FiMinimize2 className="w-4 h-4" /> : <FiMaximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex h-96">
        {/* Video Area */}
        <div className="flex-1 relative bg-gray-900">
          {/* Remote Video */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {!isVideoOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <FiVideoOff className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-3 bg-black bg-opacity-50 rounded-full px-4 py-2">
              <button
                onClick={toggleVideo}
                className={`p-2 rounded-full transition-colors ${
                  isVideoOn ? 'bg-gray-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isVideoOn ? <FiVideo className="w-5 h-5" /> : <FiVideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full transition-colors ${
                  isAudioOn ? 'bg-gray-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isAudioOn ? <FiMic className="w-5 h-5" /> : <FiMicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={startScreenShare}
                className={`p-2 rounded-full transition-colors ${
                  isScreenSharing ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                <FiMonitor className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                <FiMessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={isCallActive ? endCall : startCall}
                className={`p-3 rounded-full text-white transition-colors ${
                  isCallActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isCallActive ? <FiPhoneOff className="w-5 h-5" /> : <FiPhone className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Translation Toggle */}
          <div className="absolute top-4 left-4">
            <label className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
              <input
                type="checkbox"
                checked={translationEnabled}
                onChange={(e) => setTranslationEnabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Live Translation</span>
            </label>
          </div>

          {/* No Call State */}
          {!isCallActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center text-white">
                <FiVideo className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-4">Ready to start video call</p>
                <button
                  onClick={startCall}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Call
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 border-l flex flex-col">
            {/* Chat Header */}
            <div className="p-3 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Live Chat</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    Translation: {translationEnabled ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-3 space-y-3"
            >
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.sender === 'You' 
                      ? 'ml-auto bg-blue-600 text-white' 
                      : message.isTranslated
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-900'
                  } max-w-xs p-2 rounded-lg`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium opacity-75">
                      {message.sender}
                    </span>
                    <span className="text-xs opacity-50">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                  {message.isTranslated && (
                    <p className="text-xs opacity-75 mt-1">
                      Original: {message.originalText}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Participants List */}
      {participants.length > 0 && !showChat && (
        <div className="p-4 border-t">
          <h4 className="font-medium text-gray-900 mb-3">Participants</h4>
          <div className="flex space-x-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2"
              >
                <div className="text-2xl">{participant.avatar}</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>{participant.language}</span>
                    <div className="flex space-x-1">
                      {participant.isVideoOn ? (
                        <FiVideo className="w-3 h-3 text-green-600" />
                      ) : (
                        <FiVideoOff className="w-3 h-3 text-red-600" />
                      )}
                      {participant.isAudioOn ? (
                        <FiMic className="w-3 h-3 text-green-600" />
                      ) : (
                        <FiMicOff className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveVideoChat;

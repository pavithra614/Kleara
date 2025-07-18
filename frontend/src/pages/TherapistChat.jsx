import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiSend, 
  FiPaperclip, 
  FiImage, 
  FiVideo,
  FiPhone,
  FiMoreVertical,
  FiSmile
} from 'react-icons/fi';

const TherapistChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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
    image: '/speech_therapy.jpg',
    isOnline: true,
    lastSeen: 'Active now'
  };

  // Mock messages
  const mockMessages = [
    {
      id: 1,
      senderId: therapist.id,
      senderName: therapist.name,
      content: 'Hello! How are you feeling today? Ready for our session preparation?',
      timestamp: '2024-01-18T10:00:00Z',
      type: 'text'
    },
    {
      id: 2,
      senderId: 'user',
      senderName: 'You',
      content: 'Hi Dr. Johnson! I\'m doing well, thank you. I\'ve been practicing the exercises you gave me.',
      timestamp: '2024-01-18T10:02:00Z',
      type: 'text'
    },
    {
      id: 3,
      senderId: therapist.id,
      senderName: therapist.name,
      content: 'That\'s wonderful to hear! How did the articulation exercises go? Any particular sounds you found challenging?',
      timestamp: '2024-01-18T10:03:00Z',
      type: 'text'
    },
    {
      id: 4,
      senderId: 'user',
      senderName: 'You',
      content: 'The "R" sound is still giving me trouble, but I think I\'m getting better with the "S" sounds.',
      timestamp: '2024-01-18T10:05:00Z',
      type: 'text'
    },
    {
      id: 5,
      senderId: therapist.id,
      senderName: therapist.name,
      content: 'Perfect! The "R" sound takes time and practice. I\'ll prepare some specific exercises for our next session. Here\'s a quick video demonstration for you to practice with:',
      timestamp: '2024-01-18T10:07:00Z',
      type: 'text'
    },
    {
      id: 6,
      senderId: therapist.id,
      senderName: therapist.name,
      content: 'Video: R-sound practice techniques',
      timestamp: '2024-01-18T10:08:00Z',
      type: 'video',
      videoUrl: '#'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 'user',
        senderName: 'You',
        content: message,
        timestamp: new Date().toISOString(),
        type: 'text'
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate therapist typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const therapistReply = {
          id: messages.length + 2,
          senderId: therapist.id,
          senderName: therapist.name,
          content: 'Thank you for sharing that with me. I\'ll make sure to address this in our next session.',
          timestamp: new Date().toISOString(),
          type: 'text'
        };
        setMessages(prev => [...prev, therapistReply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleVideoCall = () => {
    navigate(`/therapists/${id}/video`);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/my-therapist')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{therapist.name}</h2>
              <p className="text-sm text-gray-600">
                {therapist.isOnline ? (
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    {therapist.lastSeen}
                  </span>
                ) : (
                  therapist.lastSeen
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleVideoCall}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiVideo className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiPhone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiMoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${msg.senderId === 'user' ? 'order-2' : 'order-1'}`}>
              {msg.senderId !== 'user' && (
                <div className="flex items-center mb-1">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-6 h-6 rounded-full object-cover mr-2"
                  />
                  <span className="text-xs text-gray-500">{msg.senderName}</span>
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.senderId === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                {msg.type === 'text' && <p className="text-sm">{msg.content}</p>}
                {msg.type === 'video' && (
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded-lg p-3 flex items-center">
                      <FiVideo className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-700">{msg.content}</span>
                    </div>
                    <button className="text-xs text-blue-600 hover:underline">
                      Play Video
                    </button>
                  </div>
                )}
              </div>
              <div className={`text-xs text-gray-500 mt-1 ${
                msg.senderId === 'user' ? 'text-right' : 'text-left'
              }`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md">
              <div className="flex items-center mb-1">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-6 h-6 rounded-full object-cover mr-2"
                />
                <span className="text-xs text-gray-500">{therapist.name}</span>
              </div>
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-end space-x-3">
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiPaperclip className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiImage className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            <button className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full transition-colors">
              <FiSmile className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-2 rounded-full transition-colors ${
              message.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapistChat;

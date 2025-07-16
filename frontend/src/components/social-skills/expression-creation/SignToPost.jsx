import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShare, FaSave, FaTrash } from 'react-icons/fa';
import WebcamCapture from '../shared/WebcamCapture';

const SignToPost = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedSigns, setDetectedSigns] = useState([]);
  const [currentExpression, setCurrentExpression] = useState('');
  const [capturedFrames, setCapturedFrames] = useState([]);
  const [postText, setPostText] = useState('');

  const handleSignDetected = (signData) => {
    setDetectedSigns(prev => {
      const newSigns = [...prev, signData];
      // Keep only last 10 signs
      return newSigns.slice(-10);
    });
    
    // Build expression from detected signs
    const words = detectedSigns.map(sign => sign.sign).join(' ');
    setCurrentExpression(words);
    setPostText(words);
  };

  const handleFrameCapture = (imageData) => {
    setCapturedFrames(prev => [...prev, {
      id: Date.now(),
      image: imageData,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const removeFrame = (frameId) => {
    setCapturedFrames(prev => prev.filter(frame => frame.id !== frameId));
  };

  const clearAll = () => {
    setDetectedSigns([]);
    setCurrentExpression('');
    setCapturedFrames([]);
    setPostText('');
  };

  const sharePost = () => {
    // Simulate sharing functionality
    const postData = {
      text: postText,
      signs: detectedSigns,
      frames: capturedFrames,
      timestamp: new Date().toISOString()
    };
    
    console.log('Sharing post:', postData);
    alert('Post shared successfully! (This is a prototype)');
  };

  const saveAsDraft = () => {
    // Simulate save functionality
    const draftData = {
      text: postText,
      signs: detectedSigns,
      frames: capturedFrames,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('signPostDraft', JSON.stringify(draftData));
    alert('Draft saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-blue-600 hover:text-blue-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Sign-to-Post</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Camera and Controls */}
          <div className="space-y-6">
            <WebcamCapture
              onCapture={handleFrameCapture}
              onSignDetected={handleSignDetected}
              isRecording={isRecording}
              onRecordingChange={setIsRecording}
            />

            {/* Recording Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recording Status</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  <span className="text-gray-700">
                    {isRecording ? 'Recording signs...' : 'Ready to record'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {detectedSigns.length} signs detected
                </div>
              </div>
            </div>

            {/* Detected Signs History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Detected Signs</h3>
              <div className="max-h-48 overflow-y-auto">
                {detectedSigns.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No signs detected yet</p>
                ) : (
                  <div className="space-y-2">
                    {detectedSigns.map((sign, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-800">{sign.sign}</span>
                          <div className="text-xs text-gray-500">
                            Confidence: {(sign.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(sign.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Post Creation */}
          <div className="space-y-6">
            {/* Current Expression */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Expression</h3>
              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <div className="text-lg text-blue-900 font-medium">
                  {currentExpression || 'Start signing to build your expression...'}
                </div>
              </div>
              
              {/* Edit Post Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edit your post (optional):
                </label>
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Add or modify your message..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                />
              </div>
            </div>

            {/* Captured Frames */}
            {capturedFrames.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Captured Moments</h3>
                <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                  {capturedFrames.map((frame) => (
                    <div key={frame.id} className="relative">
                      <img
                        src={frame.image}
                        alt="Captured sign"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeFrame(frame.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                      <div className="text-xs text-gray-500 mt-1">{frame.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Post Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Post Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    U
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-800">You</div>
                    <div className="text-xs text-gray-500">Just now</div>
                  </div>
                </div>
                
                <div className="text-gray-800 mb-3">
                  {postText || 'Your sign language expression will appear here...'}
                </div>
                
                {capturedFrames.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {capturedFrames.slice(0, 3).map((frame) => (
                      <img
                        key={frame.id}
                        src={frame.image}
                        alt="Sign moment"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                    {capturedFrames.length > 3 && (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        +{capturedFrames.length - 3}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <button className="hover:text-blue-500">👍 Like</button>
                  <button className="hover:text-blue-500">💬 Comment</button>
                  <button className="hover:text-blue-500">🔄 Share</button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={sharePost}
                disabled={!postText && detectedSigns.length === 0}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <FaShare className="mr-2" />
                Share Post
              </button>
              
              <button
                onClick={saveAsDraft}
                disabled={!postText && detectedSigns.length === 0}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <FaSave className="mr-2" />
                Save Draft
              </button>
              
              <button
                onClick={clearAll}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center"
              >
                <FaTrash className="mr-2" />
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignToPost;

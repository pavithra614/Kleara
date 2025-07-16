import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaPause, FaRedo, FaVolumeUp, FaSave, FaShare } from 'react-icons/fa';
import SignAvatar from '../shared/SignAvatar';

const TextToSignTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [savedTranslations, setSavedTranslations] = useState([]);
  const [selectedSpeed, setSelectedSpeed] = useState(1);

  const commonPhrases = [
    "Hello, how are you?",
    "Thank you very much",
    "Please help me",
    "I love you",
    "Good morning",
    "See you later",
    "I'm sorry",
    "You're welcome",
    "Nice to meet you",
    "Have a good day",
    "I don't understand",
    "Can you repeat that?",
    "Where is the bathroom?",
    "I need help",
    "What time is it?",
    "I'm hungry",
    "I'm tired",
    "How much does it cost?"
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate translation processing
    setTimeout(() => {
      setTranslatedText(inputText.trim());
      setIsTranslating(false);
    }, 1000);
  };

  const handlePhraseClick = (phrase) => {
    setInputText(phrase);
    setTranslatedText(phrase);
  };

  const saveTranslation = () => {
    if (!translatedText) return;
    
    const newTranslation = {
      id: Date.now(),
      original: inputText,
      translated: translatedText,
      timestamp: new Date().toLocaleString()
    };
    
    setSavedTranslations(prev => [newTranslation, ...prev.slice(0, 9)]); // Keep last 10
    alert('Translation saved!');
  };

  const shareTranslation = () => {
    if (!translatedText) return;
    
    // Simulate sharing functionality
    const shareData = {
      text: translatedText,
      type: 'sign-translation',
      timestamp: new Date().toISOString()
    };
    
    console.log('Sharing translation:', shareData);
    alert('Translation shared successfully! (This is a prototype)');
  };

  const clearAll = () => {
    setInputText('');
    setTranslatedText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-purple-600 hover:text-purple-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Text-to-Sign Translator</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input and Controls */}
          <div className="space-y-6">
            {/* Text Input */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Text to Translate</h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="6"
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  {inputText.length} characters
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleTranslate}
                    disabled={!inputText.trim() || isTranslating}
                    className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isTranslating ? 'Translating...' : 'Translate to Sign'}
                  </button>
                </div>
              </div>
            </div>

            {/* Common Phrases */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Phrases</h3>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                {commonPhrases.map((phrase, index) => (
                  <button
                    key={index}
                    onClick={() => handlePhraseClick(phrase)}
                    className="text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <span className="text-gray-800">{phrase}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Saved Translations */}
            {savedTranslations.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Translations</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {savedTranslations.map((translation) => (
                    <div key={translation.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-gray-800 font-medium">{translation.translated}</div>
                      <div className="text-xs text-gray-500 mt-1">{translation.timestamp}</div>
                      <button
                        onClick={() => handlePhraseClick(translation.translated)}
                        className="text-xs text-purple-600 hover:text-purple-800 mt-1"
                      >
                        Use again
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sign Avatar and Controls */}
          <div className="space-y-6">
            {/* Sign Avatar */}
            <SignAvatar 
              text={translatedText}
              speed={selectedSpeed}
              autoPlay={false}
              showControls={true}
            />

            {/* Translation Controls */}
            {translatedText && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Translation Controls</h3>
                
                {/* Speed Control */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Animation Speed: {selectedSpeed}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={selectedSpeed}
                    onChange={(e) => setSelectedSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Slow</span>
                    <span>Normal</span>
                    <span>Fast</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={saveTranslation}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                  >
                    <FaSave className="mr-2" />
                    Save
                  </button>
                  <button
                    onClick={shareTranslation}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                  >
                    <FaShare className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            )}

            {/* Translation Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-xs">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Type or select text</div>
                    <div>Enter your message or choose from common phrases</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-xs">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">AI Translation</div>
                    <div>Our AI converts text to sign language sequence</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-xs">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Avatar Performance</div>
                    <div>Watch the avatar perform the signs with proper timing</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 font-semibold text-xs">4</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Learn & Share</div>
                    <div>Save translations and share with others</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Tips for Better Translation</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Use simple, clear sentences</li>
                <li>• Avoid complex grammar structures</li>
                <li>• Try common phrases first to learn patterns</li>
                <li>• Adjust speed to match your learning pace</li>
                <li>• Practice with the avatar regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSignTranslator;

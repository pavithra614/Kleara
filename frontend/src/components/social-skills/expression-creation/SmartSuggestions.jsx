import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBrain, FaLightbulb, FaHeart, FaThumbsUp } from 'react-icons/fa';

const SmartSuggestions = () => {
  const [currentMood, setCurrentMood] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const moods = ['happy', 'sad', 'excited', 'tired', 'grateful', 'confused'];
  
  const generateSuggestions = (mood) => {
    const moodSuggestions = {
      happy: [
        { text: "I'm feeling great today!", symbols: ['😊', '☀️', '🎉'] },
        { text: "What a wonderful day!", symbols: ['🌟', '😄', '🌈'] },
        { text: "Spreading positive vibes!", symbols: ['✨', '💫', '😊'] }
      ],
      sad: [
        { text: "Having a tough day", symbols: ['😢', '💙', '🤗'] },
        { text: "Need some comfort", symbols: ['🫂', '💝', '🌧️'] },
        { text: "Tomorrow will be better", symbols: ['🌅', '💪', '🙏'] }
      ],
      excited: [
        { text: "Can't contain my excitement!", symbols: ['🤩', '🎊', '⚡'] },
        { text: "Amazing things happening!", symbols: ['🚀', '🌟', '🎯'] },
        { text: "Energy levels through the roof!", symbols: ['💥', '🔥', '🎉'] }
      ]
    };
    
    return moodSuggestions[mood] || [];
  };

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    setSuggestions(generateSuggestions(mood));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-purple-600 hover:text-purple-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Smart Suggestions</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaBrain className="mr-2 text-purple-500" />
            How are you feeling today?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moods.map(mood => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  currentMood === mood
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-2xl mb-2">
                  {mood === 'happy' && '😊'}
                  {mood === 'sad' && '😢'}
                  {mood === 'excited' && '🤩'}
                  {mood === 'tired' && '😴'}
                  {mood === 'grateful' && '🙏'}
                  {mood === 'confused' && '😕'}
                </div>
                <div className="capitalize font-medium">{mood}</div>
              </button>
            ))}
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaLightbulb className="mr-2 text-yellow-500" />
              AI Suggestions for "{currentMood}" mood
            </h3>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {suggestion.symbols.map((symbol, i) => (
                          <span key={i} className="text-2xl mr-2">{symbol}</span>
                        ))}
                      </div>
                      <p className="text-gray-800">{suggestion.text}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                        <FaThumbsUp />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSuggestions;

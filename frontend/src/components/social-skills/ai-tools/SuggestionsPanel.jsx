import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaLightbulb, FaBrain } from 'react-icons/fa';

const SuggestionsPanel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-yellow-600 hover:text-yellow-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Smart Suggestions Panel</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaLightbulb className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Context-Based Suggestions</h2>
          <p className="text-gray-600 mb-8">Get intelligent suggestions for signs, emojis, and words based on your activity and context</p>
          
          <div className="flex justify-center">
            <FaBrain className="text-4xl text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPanel;

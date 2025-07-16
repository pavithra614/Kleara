import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaThumbsUp, FaComment } from 'react-icons/fa';

const ReactionsSystem = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-red-600 hover:text-red-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Reactions & Comments</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaHeart className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessible Reactions</h2>
          <p className="text-gray-600 mb-8">Express yourself with sign icons, visual emojis, and text-based reactions</p>
          
          <div className="flex justify-center space-x-4">
            <button className="p-4 bg-red-100 rounded-lg">
              <FaHeart className="text-2xl text-red-500" />
            </button>
            <button className="p-4 bg-blue-100 rounded-lg">
              <FaThumbsUp className="text-2xl text-blue-500" />
            </button>
            <button className="p-4 bg-green-100 rounded-lg">
              <FaComment className="text-2xl text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionsSystem;

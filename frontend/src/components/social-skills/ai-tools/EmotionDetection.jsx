import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaHeart, FaSmile } from 'react-icons/fa';

const EmotionDetection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-green-600 hover:text-green-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Emotion Detection</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaEye className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Emotion Recognition</h2>
          <p className="text-gray-600 mb-8">Detect emotional tone from facial expressions, signs, and symbols to enhance communication</p>
          
          <div className="flex justify-center space-x-4">
            <div className="p-4 bg-yellow-100 rounded-lg">
              <FaSmile className="text-2xl text-yellow-600 mx-auto mb-2" />
              <p className="text-sm">Happy</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg">
              <FaHeart className="text-2xl text-red-600 mx-auto mb-2" />
              <p className="text-sm">Love</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <FaEye className="text-2xl text-blue-600 mx-auto mb-2" />
              <p className="text-sm">Curious</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionDetection;

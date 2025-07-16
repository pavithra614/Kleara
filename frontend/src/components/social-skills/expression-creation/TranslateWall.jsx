import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExchangeAlt, FaGlobe } from 'react-icons/fa';

const TranslateWall = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-teal-600 hover:text-teal-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Translate Wall</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaExchangeAlt className="text-6xl text-teal-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Universal Translation Wall</h2>
          <p className="text-gray-600 mb-8">See everyone's shared thoughts with real-time translation between text, signs, and symbols</p>
          
          <div className="flex justify-center">
            <FaGlobe className="text-4xl text-teal-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslateWall;

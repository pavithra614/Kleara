import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaGraduationCap } from 'react-icons/fa';

const PracticeMode = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-purple-600 hover:text-purple-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Practice Mode</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaPlay className="text-6xl text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Practice Mode</h2>
          <p className="text-gray-600 mb-8">Copy signs from the avatar and receive real-time AI feedback on your performance</p>
          
          <Link 
            to="/social-skills/sign-feedback"
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg inline-flex items-center"
          >
            <FaGraduationCap className="mr-2" />
            Start Practice Session
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PracticeMode;

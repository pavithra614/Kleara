import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPuzzlePiece, FaUsers } from 'react-icons/fa';

const GroupBoards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-purple-600 hover:text-purple-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Group Boards</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaUsers className="text-6xl text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Themed Expression Boards</h2>
          <p className="text-gray-600 mb-8">Join shared boards around themes like "My Day", "Nature Signs", "What I Love"</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">My Day</h3>
              <p className="text-sm text-gray-600">Share daily experiences</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Nature Signs</h3>
              <p className="text-sm text-gray-600">Explore outdoor vocabulary</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">What I Love</h3>
              <p className="text-sm text-gray-600">Express your passions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBoards;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShare, FaComments } from 'react-icons/fa';

const PrivateMessages = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-green-600 hover:text-green-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Private Messages</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaComments className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign & Text Chat</h2>
          <p className="text-gray-600 mb-8">Communicate privately with other users using signs, text, or AI-assisted translation</p>
        </div>
      </div>
    </div>
  );
};

export default PrivateMessages;

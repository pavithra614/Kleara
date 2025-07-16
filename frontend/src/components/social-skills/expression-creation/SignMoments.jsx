import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCamera, FaVideo, FaShare, FaSave } from 'react-icons/fa';

const SignMoments = () => {
  const [capturedMoments, setCapturedMoments] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-pink-600 hover:text-pink-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Sign Moments</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaCamera className="text-6xl text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Capture Your Sign Moments</h2>
          <p className="text-gray-600 mb-8">Take pictures and videos of your signs to share with the community</p>
          
          <div className="flex justify-center space-x-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center">
              <FaCamera className="mr-2" />
              Take Photo
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center">
              <FaVideo className="mr-2" />
              Record Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignMoments;

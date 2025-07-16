import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPuzzlePiece, FaUser, FaHandPaper } from 'react-icons/fa';

const ExpressionBuilder = () => {
  const [selectedElements, setSelectedElements] = useState({
    face: null,
    body: null,
    hands: null,
    objects: []
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-indigo-600 hover:text-indigo-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Expression Builder</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaPuzzlePiece className="text-6xl text-indigo-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Your Expression</h2>
          <p className="text-gray-600 mb-8">Combine face, body, sign, and object elements to create unique expressions</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <FaUser className="text-3xl text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Face Expression</p>
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <FaUser className="text-3xl text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Body Posture</p>
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <FaHandPaper className="text-3xl text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Hand Signs</p>
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <FaPuzzlePiece className="text-3xl text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Objects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressionBuilder;

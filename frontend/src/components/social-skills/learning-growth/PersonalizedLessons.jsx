import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaGraduationCap, FaUser } from 'react-icons/fa';

const PersonalizedLessons = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-orange-600 hover:text-orange-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Personalized Lessons</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <FaGraduationCap className="text-6xl text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Learning Path</h2>
          <p className="text-gray-600 mb-8">AI-powered lessons that adapt to your skill level and learning preferences</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Emotion Signs</h3>
              <p className="text-sm text-gray-600">Learn to express feelings</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Family & Friends</h3>
              <p className="text-sm text-gray-600">Signs for important people</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Daily Needs</h3>
              <p className="text-sm text-gray-600">Essential everyday signs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedLessons;

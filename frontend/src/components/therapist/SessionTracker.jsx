import React from 'react';
import { FiClock, FiCalendar, FiTrendingUp, FiActivity } from 'react-icons/fi';

const SessionTracker = ({ sessionData }) => {
  const {
    totalHours = 30,
    usedHours = 12,
    remainingHours = 18,
    renewalDate = '2024-02-15',
    sessionsThisWeek = 3,
    averageSessionLength = 45
  } = sessionData || {};

  const usagePercentage = (usedHours / totalHours) * 100;
  const daysUntilRenewal = Math.ceil((new Date(renewalDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FiActivity className="w-5 h-5 mr-2 text-blue-600" />
        Session Tracker
      </h3>

      {/* Usage Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Monthly Usage</span>
          <span className="text-sm text-gray-600">{usedHours}/{totalHours} hours</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 hours</span>
          <span>{totalHours} hours</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{remainingHours}</div>
          <div className="text-sm text-gray-600">Hours Left</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{sessionsThisWeek}</div>
          <div className="text-sm text-gray-600">This Week</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiClock className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Avg. Session Length</span>
          </div>
          <span className="text-sm font-medium">{averageSessionLength} min</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiCalendar className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Renewal Date</span>
          </div>
          <span className="text-sm font-medium">{new Date(renewalDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiTrendingUp className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Days Until Renewal</span>
          </div>
          <span className="text-sm font-medium">{daysUntilRenewal} days</span>
        </div>
      </div>

      {/* Usage Status */}
      <div className={`p-3 rounded-lg ${
        usagePercentage > 80 
          ? 'bg-red-50 border border-red-200' 
          : usagePercentage > 60 
            ? 'bg-yellow-50 border border-yellow-200'
            : 'bg-green-50 border border-green-200'
      }`}>
        <div className="flex items-start space-x-2">
          <div className={`w-2 h-2 rounded-full mt-2 ${
            usagePercentage > 80 
              ? 'bg-red-500' 
              : usagePercentage > 60 
                ? 'bg-yellow-500'
                : 'bg-green-500'
          }`}></div>
          <div>
            <p className={`text-sm font-medium ${
              usagePercentage > 80 
                ? 'text-red-800' 
                : usagePercentage > 60 
                  ? 'text-yellow-800'
                  : 'text-green-800'
            }`}>
              {usagePercentage > 80 
                ? 'High Usage Alert' 
                : usagePercentage > 60 
                  ? 'Moderate Usage'
                  : 'Good Usage Balance'
              }
            </p>
            <p className={`text-xs mt-1 ${
              usagePercentage > 80 
                ? 'text-red-600' 
                : usagePercentage > 60 
                  ? 'text-yellow-600'
                  : 'text-green-600'
            }`}>
              {usagePercentage > 80 
                ? `You've used ${usagePercentage.toFixed(0)}% of your monthly hours. Consider booking additional sessions.`
                : usagePercentage > 60 
                  ? `You've used ${usagePercentage.toFixed(0)}% of your monthly hours. You're on track.`
                  : `You have ${remainingHours} hours remaining this month. Great progress!`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Book Session
        </button>
        <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          View History
        </button>
      </div>
    </div>
  );
};

export default SessionTracker;

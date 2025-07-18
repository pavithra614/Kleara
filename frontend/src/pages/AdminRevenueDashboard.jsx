import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiPlay,
  FiHome,
  FiBriefcase,
  FiDownload,
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi';

const AdminRevenueDashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(true);

  // Mock revenue data
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 2850000, // LKR 2.85M
    monthlyGrowth: 15.3,
    
    // Revenue by source
    therapistRegistrations: {
      total: 450000, // LKR 450K
      count: 18,
      avgPerRegistration: 25000,
      growth: 22.5
    },
    sessionBookings: {
      total: 1200000, // LKR 1.2M
      count: 240,
      avgPerSession: 5000,
      growth: 18.7
    },
    proGamingFeatures: {
      total: 350000, // LKR 350K
      count: 140,
      avgPerUser: 2500,
      growth: 12.4
    },
    enterprisePackages: {
      total: 850000, // LKR 850K
      count: 3,
      avgPerPackage: 283333,
      growth: 45.2
    },

    // Monthly breakdown
    monthlyData: [
      { month: 'Jan', therapists: 120000, sessions: 380000, gaming: 95000, enterprise: 200000 },
      { month: 'Feb', therapists: 135000, sessions: 420000, gaming: 110000, enterprise: 250000 },
      { month: 'Mar', therapists: 150000, sessions: 450000, gaming: 125000, enterprise: 300000 },
      { month: 'Apr', therapists: 165000, sessions: 480000, gaming: 140000, enterprise: 350000 },
      { month: 'May', therapists: 180000, sessions: 520000, gaming: 155000, enterprise: 400000 },
      { month: 'Jun', therapists: 195000, sessions: 560000, gaming: 170000, enterprise: 450000 }
    ],

    // Top performing categories
    topCategories: [
      { name: 'Session Bookings', revenue: 1200000, percentage: 42.1, color: 'blue' },
      { name: 'Enterprise Packages', revenue: 850000, percentage: 29.8, color: 'purple' },
      { name: 'Therapist Registrations', revenue: 450000, percentage: 15.8, color: 'green' },
      { name: 'Pro Gaming Features', revenue: 350000, percentage: 12.3, color: 'orange' }
    ]
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount) => {
    return `LKR ${(amount / 1000).toFixed(0)}K`;
  };

  const formatLargeCurrency = (amount) => {
    if (amount >= 1000000) {
      return `LKR ${(amount / 1000000).toFixed(2)}M`;
    }
    return `LKR ${(amount / 1000).toFixed(0)}K`;
  };

  const getGrowthColor = (growth) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth) => {
    return growth > 0 ? '↗' : '↘';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading revenue data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Back to Admin
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Revenue Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${getGrowthColor(revenueData.monthlyGrowth)}`}>
                {getGrowthIcon(revenueData.monthlyGrowth)} {revenueData.monthlyGrowth}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatLargeCurrency(revenueData.totalRevenue)}
            </h3>
            <p className="text-gray-600 text-sm">Total Revenue</p>
          </div>

          {/* Therapist Registrations */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-green-600" />
              </div>
              <span className={`text-sm font-medium ${getGrowthColor(revenueData.therapistRegistrations.growth)}`}>
                {getGrowthIcon(revenueData.therapistRegistrations.growth)} {revenueData.therapistRegistrations.growth}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(revenueData.therapistRegistrations.total)}
            </h3>
            <p className="text-gray-600 text-sm">Therapist Registrations ({revenueData.therapistRegistrations.count})</p>
          </div>

          {/* Session Bookings */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${getGrowthColor(revenueData.sessionBookings.growth)}`}>
                {getGrowthIcon(revenueData.sessionBookings.growth)} {revenueData.sessionBookings.growth}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatLargeCurrency(revenueData.sessionBookings.total)}
            </h3>
            <p className="text-gray-600 text-sm">Session Bookings ({revenueData.sessionBookings.count})</p>
          </div>

          {/* Enterprise Packages */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiHome className="w-6 h-6 text-purple-600" />
              </div>
              <span className={`text-sm font-medium ${getGrowthColor(revenueData.enterprisePackages.growth)}`}>
                {getGrowthIcon(revenueData.enterprisePackages.growth)} {revenueData.enterprisePackages.growth}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(revenueData.enterprisePackages.total)}
            </h3>
            <p className="text-gray-600 text-sm">Enterprise Packages ({revenueData.enterprisePackages.count})</p>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue by Source Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue by Source</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
            
            {/* Simple Bar Chart Representation */}
            <div className="space-y-4">
              {revenueData.topCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-600">{formatLargeCurrency(category.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-${category.color}-500`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{category.percentage}% of total revenue</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Gaming Features */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FiPlay className="w-6 h-6 text-orange-600" />
              </div>
              <span className={`text-sm font-medium ${getGrowthColor(revenueData.proGamingFeatures.growth)}`}>
                {getGrowthIcon(revenueData.proGamingFeatures.growth)} {revenueData.proGamingFeatures.growth}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(revenueData.proGamingFeatures.total)}
            </h3>
            <p className="text-gray-600 text-sm mb-4">Pro Gaming Features</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Users:</span>
                <span className="font-medium">{revenueData.proGamingFeatures.count}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg per User:</span>
                <span className="font-medium">{formatCurrency(revenueData.proGamingFeatures.avgPerUser)}</span>
              </div>
              <div className="pt-3 border-t">
                <button className="w-full text-orange-600 hover:text-orange-700 text-sm font-medium">
                  View Gaming Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Trend</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Therapists</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Gaming</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Enterprise</span>
              </div>
            </div>
          </div>
          
          {/* Simple trend visualization */}
          <div className="grid grid-cols-6 gap-4">
            {revenueData.monthlyData.map((month, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-2">{month.month}</div>
                <div className="space-y-1">
                  <div className="w-full bg-green-200 rounded h-8 flex items-end">
                    <div 
                      className="w-full bg-green-500 rounded"
                      style={{ height: `${(month.therapists / 200000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs font-medium">
                    {formatCurrency(month.therapists + month.sessions + month.gaming + month.enterprise)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => navigate('/admin/therapist-applications')}
            className="bg-white rounded-xl shadow-sm border p-6 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <FiBriefcase className="w-8 h-8 text-green-600" />
              <FiTrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Therapist Applications</h3>
            <p className="text-gray-600 text-sm">Review pending applications and manage registrations</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border p-6 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <FiCalendar className="w-8 h-8 text-blue-600" />
              <FiTrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Session Analytics</h3>
            <p className="text-gray-600 text-sm">View detailed session booking and revenue analytics</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border p-6 text-left hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <FiPlay className="w-8 h-8 text-orange-600" />
              <FiTrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gaming Features</h3>
            <p className="text-gray-600 text-sm">Monitor pro gaming feature usage and subscriptions</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenueDashboard;

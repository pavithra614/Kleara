import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const RevenueCard = ({ 
  title, 
  amount, 
  growth, 
  count, 
  icon: Icon, 
  color = 'blue',
  subtitle,
  onClick 
}) => {
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `LKR ${(amount / 1000000).toFixed(2)}M`;
    }
    return `LKR ${(amount / 1000).toFixed(0)}K`;
  };

  const getGrowthColor = (growth) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon className="w-6 h-6" />
        </div>
        {growth !== undefined && (
          <div className={`flex items-center text-sm font-medium ${getGrowthColor(growth)}`}>
            {growth > 0 ? <FiTrendingUp className="w-4 h-4 mr-1" /> : <FiTrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(growth)}%
          </div>
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-1">
        {formatCurrency(amount)}
      </h3>
      
      <p className="text-gray-600 text-sm">
        {title}
        {count && ` (${count})`}
      </p>
      
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default RevenueCard;

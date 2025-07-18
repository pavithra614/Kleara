import React from 'react';

const RevenueBreakdown = ({ data, title }) => {
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `LKR ${(amount / 1000000).toFixed(2)}M`;
    }
    return `LKR ${(amount / 1000).toFixed(0)}K`;
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View Details
        </button>
      </div>
      
      <div className="space-y-4">
        {data.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded ${getColorClass(category.color)}`}></div>
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </div>
              <span className="text-sm text-gray-600">{formatCurrency(category.revenue)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getColorClass(category.color)}`}
                style={{ width: `${category.percentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{category.percentage}% of total revenue</span>
              {category.count && <span>{category.count} transactions</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">Total Revenue</span>
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(data.reduce((sum, item) => sum + item.revenue, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RevenueBreakdown;

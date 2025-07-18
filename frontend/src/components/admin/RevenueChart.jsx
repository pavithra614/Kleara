import React from 'react';

const RevenueChart = ({ data, title, categories }) => {
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    return `${(amount / 1000).toFixed(0)}K`;
  };

  const getMaxValue = () => {
    return Math.max(...data.map(item => 
      item.therapists + item.sessions + item.gaming + item.enterprise
    ));
  };

  const maxValue = getMaxValue();

  const getBarHeight = (value, total) => {
    return (value / maxValue) * 100;
  };

  const categoryColors = {
    therapists: 'bg-green-500',
    sessions: 'bg-blue-500',
    gaming: 'bg-orange-500',
    enterprise: 'bg-purple-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-4">
          {categories.map((category) => (
            <div key={category.key} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${categoryColors[category.key]}`}></div>
              <span className="text-sm text-gray-600">{category.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-4">
        {data.map((month, index) => {
          const total = month.therapists + month.sessions + month.gaming + month.enterprise;
          return (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 mb-2">{month.month}</div>
              <div className="relative h-32 bg-gray-100 rounded">
                {/* Stacked bars */}
                <div className="absolute bottom-0 w-full">
                  <div 
                    className="bg-green-500 rounded-b"
                    style={{ height: `${getBarHeight(month.therapists, total)}px` }}
                  ></div>
                  <div 
                    className="bg-blue-500"
                    style={{ height: `${getBarHeight(month.sessions, total)}px` }}
                  ></div>
                  <div 
                    className="bg-orange-500"
                    style={{ height: `${getBarHeight(month.gaming, total)}px` }}
                  ></div>
                  <div 
                    className="bg-purple-500 rounded-t"
                    style={{ height: `${getBarHeight(month.enterprise, total)}px` }}
                  ></div>
                </div>
              </div>
              <div className="text-xs font-medium mt-2">
                LKR {formatCurrency(total)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevenueChart;

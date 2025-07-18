import React from 'react';
import { FiSettings, FiVolume2, FiEye, FiMove, FiClock, FiUsers, FiStar } from 'react-icons/fi';

const PackageSelectionStep = ({ formData, handleInputChange, handleArrayChange }) => {
  const { packageSelection } = formData;

  const therapyTypes = [
    {
      id: 'speech',
      title: 'Gamified Speech Therapy',
      icon: <FiVolume2 className="w-8 h-8" />,
      description: 'Interactive speech exercises, pronunciation games, and articulation activities',
      features: [
        'Voice recognition technology',
        'Interactive pronunciation games',
        'Speech clarity assessments',
        'Progress tracking with rewards',
        'Customizable difficulty levels'
      ],
      color: 'blue',
      price: 8000 // per student per month
    },
    {
      id: 'hearing',
      title: 'Gamified Hearing Activities',
      icon: <FiEye className="w-8 h-8" />,
      description: 'Sound recognition games, auditory processing exercises, and listening skills',
      features: [
        'Sound discrimination games',
        'Auditory memory challenges',
        'Listening comprehension activities',
        'Environmental sound recognition',
        'Music and rhythm exercises'
      ],
      color: 'green',
      price: 7000 // per student per month
    },
    {
      id: 'sign_language',
      title: 'Sign Language Learning',
      icon: <FiMove className="w-8 h-8" />,
      description: 'Interactive sign language lessons with AI-powered gesture recognition',
      features: [
        'AI gesture recognition',
        'Interactive sign tutorials',
        'Sign language dictionary',
        'Practice with virtual characters',
        'Cultural context learning'
      ],
      color: 'purple',
      price: 6000 // per student per month
    }
  ];

  const packageDurations = [
    {
      id: '3_months',
      title: '3 Months',
      description: 'Short-term trial package',
      discount: 0,
      popular: false
    },
    {
      id: '6_months',
      title: '6 Months',
      description: 'Recommended for steady progress',
      discount: 10,
      popular: true
    },
    {
      id: '12_months',
      title: '12 Months',
      description: 'Best value for comprehensive development',
      discount: 20,
      popular: false
    }
  ];

  const sessionFrequencies = [
    {
      id: 'daily',
      title: 'Daily Sessions',
      description: '7 sessions per week',
      intensity: 'High',
      recommended: 'Intensive therapy needs'
    },
    {
      id: 'weekly',
      title: 'Weekly Sessions',
      description: '3-4 sessions per week',
      intensity: 'Medium',
      recommended: 'Regular therapy maintenance'
    },
    {
      id: 'bi_weekly',
      title: 'Bi-Weekly Sessions',
      description: '2 sessions per week',
      intensity: 'Low',
      recommended: 'Maintenance and practice'
    }
  ];

  const calculatePackagePrice = (therapyType) => {
    const basePrice = therapyType.price;
    const duration = packageSelection.packageDuration;
    const months = duration === '12_months' ? 12 : duration === '6_months' ? 6 : 3;
    
    let totalPrice = basePrice * months;
    
    // Apply duration discounts
    if (duration === '12_months') totalPrice *= 0.8; // 20% discount
    else if (duration === '6_months') totalPrice *= 0.9; // 10% discount
    
    return totalPrice;
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected 
        ? 'border-blue-500 bg-blue-50 text-blue-700' 
        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50',
      green: isSelected 
        ? 'border-green-500 bg-green-50 text-green-700' 
        : 'border-gray-200 hover:border-green-300 hover:bg-green-50',
      purple: isSelected 
        ? 'border-purple-500 bg-purple-50 text-purple-700' 
        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <FiSettings className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Package Selection</h3>
        <p className="text-gray-600">Choose therapy types and package duration for your students</p>
      </div>

      {/* Therapy Types Selection */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Select Therapy Types <span className="text-red-500">*</span>
        </h4>
        <p className="text-sm text-gray-600 mb-6">Choose one or more therapy types based on your students' needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {therapyTypes.map((therapy) => {
            const isSelected = packageSelection.therapyTypes.includes(therapy.id);
            return (
              <div
                key={therapy.id}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${getColorClasses(therapy.color, isSelected)}`}
                onClick={() => handleArrayChange('packageSelection', 'therapyTypes', therapy.id)}
              >
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                    isSelected ? `bg-${therapy.color}-100` : 'bg-gray-100'
                  }`}>
                    <div className={isSelected ? `text-${therapy.color}-600` : 'text-gray-600'}>
                      {therapy.icon}
                    </div>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">{therapy.title}</h5>
                  <p className="text-sm text-gray-600 mb-4">{therapy.description}</p>
                </div>

                <div className="space-y-2 mb-4">
                  {therapy.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        isSelected ? `bg-${therapy.color}-500` : 'bg-gray-400'
                      }`}></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4 border-t">
                  <div className="text-lg font-bold text-gray-900">
                    LKR {therapy.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">per student/month</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Package Duration */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Package Duration <span className="text-red-500">*</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packageDurations.map((duration) => (
            <div
              key={duration.id}
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                packageSelection.packageDuration === duration.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleInputChange('packageSelection', 'packageDuration', duration.id)}
            >
              {duration.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <FiStar className="w-3 h-3 mr-1" />
                    Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h5 className="font-semibold text-gray-900 mb-1">{duration.title}</h5>
                <p className="text-sm text-gray-600 mb-2">{duration.description}</p>
                {duration.discount > 0 && (
                  <div className="text-green-600 font-medium text-sm">
                    Save {duration.discount}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Frequency */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Session Frequency <span className="text-red-500">*</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sessionFrequencies.map((frequency) => (
            <div
              key={frequency.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                packageSelection.sessionFrequency === frequency.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleInputChange('packageSelection', 'sessionFrequency', frequency.id)}
            >
              <div className="text-center">
                <h5 className="font-semibold text-gray-900 mb-1">{frequency.title}</h5>
                <p className="text-sm text-gray-600 mb-2">{frequency.description}</p>
                <div className="flex items-center justify-center space-x-2 text-xs">
                  <span className={`px-2 py-1 rounded-full ${
                    frequency.intensity === 'High' ? 'bg-red-100 text-red-700' :
                    frequency.intensity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {frequency.intensity} Intensity
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{frequency.recommended}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Special Requests</h4>
        <textarea
          value={packageSelection.specialRequests}
          onChange={(e) => handleInputChange('packageSelection', 'specialRequests', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any specific requirements, customizations, or special needs for your students..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Describe any specific needs, accessibility requirements, or customizations needed for your students
        </p>
      </div>

      {/* Package Summary */}
      {packageSelection.therapyTypes.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Selected Package Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Selected Therapies:</span>
              <span className="font-medium">
                {packageSelection.therapyTypes.map(type => 
                  therapyTypes.find(t => t.id === type)?.title
                ).join(', ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">
                {packageDurations.find(d => d.id === packageSelection.packageDuration)?.title || 'Not selected'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Frequency:</span>
              <span className="font-medium">
                {sessionFrequencies.find(f => f.id === packageSelection.sessionFrequency)?.title || 'Not selected'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Pricing Information</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• Base pricing: LKR 6,000 - 8,000 per student per month</p>
          <p>• Volume discounts: 10% (10+ students), 20% (20+ students), 30% (50+ students)</p>
          <p>• Duration discounts: 10% (6 months), 20% (12 months)</p>
          <p>• Social Skills Development: Included at no extra cost</p>
          <p>• Final pricing will be calculated based on student count and selections</p>
        </div>
      </div>
    </div>
  );
};

export default PackageSelectionStep;

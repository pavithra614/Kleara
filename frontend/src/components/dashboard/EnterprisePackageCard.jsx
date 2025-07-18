import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiTrendingDown,
  FiStar,
  FiArrowRight,
  FiCheck,
  FiVolume2,
  FiEye,
  FiMove
} from 'react-icons/fi';

const EnterprisePackageCard = ({ user }) => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/enterprise-application');
  };

  const therapyTypes = [
    {
      icon: <FiVolume2 className="w-4 h-4" />,
      title: 'Speech Therapy',
      description: 'Gamified speech exercises'
    },
    {
      icon: <FiEye className="w-4 h-4" />,
      title: 'Hearing Activities',
      description: 'Interactive hearing games'
    },
    {
      icon: <FiMove className="w-4 h-4" />,
      title: 'Sign Language',
      description: 'AI-powered sign learning'
    }
  ];

  const benefits = [
    'Bulk pricing discounts up to 30%',
    'Dedicated account manager',
    'Staff training included',
    'Custom progress reporting',
    'Priority technical support',
    'Social skills development (FREE)'
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-sm border border-purple-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
            <FiHome className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Enterprise Packages</h3>
            <p className="text-sm text-purple-700">For Schools & Institutions</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">LKR 15K</div>
          <div className="text-xs text-purple-600">per student/month</div>
        </div>
      </div>

      {/* Therapy Types */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Available Therapy Programs</h4>
        <div className="grid grid-cols-1 gap-2">
          {therapyTypes.map((therapy, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-white/60 rounded-lg">
              <div className="text-purple-600">
                {therapy.icon}
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">{therapy.title}</h5>
                <p className="text-xs text-gray-600">{therapy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Volume Discounts</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 bg-white/60 rounded">
            <span className="text-gray-700">10-19 students</span>
            <span className="font-medium text-green-600">10% OFF</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white/60 rounded">
            <span className="text-gray-700">20-49 students</span>
            <span className="font-medium text-green-600">20% OFF</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white/60 rounded">
            <span className="text-gray-700">50+ students</span>
            <span className="font-medium text-green-600">30% OFF</span>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">What's Included</h4>
        <div className="space-y-1">
          {benefits.slice(0, 4).map((benefit, index) => (
            <div key={index} className="flex items-center text-sm">
              <FiCheck className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
          <div className="text-xs text-gray-600 mt-2">+ 2 more benefits</div>
        </div>
      </div>

      {/* Institution Types */}
      <div className="mb-6 p-3 bg-white/60 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2 text-sm">Perfect For:</h4>
        <div className="flex flex-wrap gap-1">
          {['Schools', 'Special Centers', 'NGOs', 'Healthcare'].map((type, index) => (
            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="space-y-3">
        <button
          onClick={handleApplyNow}
          className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
        >
          <FiHome className="w-4 h-4 mr-2" />
          Apply for Enterprise Package
        </button>
        
        <div className="flex items-center justify-center space-x-4 text-sm">
          <button className="text-purple-600 hover:underline flex items-center">
            <FiUsers className="w-3 h-3 mr-1" />
            Request Demo
          </button>
          <button className="text-purple-600 hover:underline flex items-center">
            <FiStar className="w-3 h-3 mr-1" />
            View Pricing
          </button>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mt-6 pt-6 border-t border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 text-sm">Trusted by 25+ Institutions</h4>
            <p className="text-xs text-gray-600">Serving 1,200+ students nationwide</p>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
            <span className="text-xs text-gray-600 ml-1">4.8/5</span>
          </div>
        </div>
      </div>

      {/* Special Offer */}
      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-yellow-900 text-sm">Limited Time Offer</h4>
            <p className="text-xs text-yellow-800">Free setup + 1 month trial for new institutions</p>
          </div>
          <FiTrendingDown className="w-5 h-5 text-yellow-600" />
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600">
          Questions? Contact our education team at{' '}
          <a href="mailto:enterprise@kleara.com" className="text-purple-600 hover:underline">
            enterprise@kleara.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default EnterprisePackageCard;

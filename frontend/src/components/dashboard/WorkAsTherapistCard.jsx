import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBriefcase, 
  FiDollarSign, 
  FiUsers, 
  FiClock,
  FiArrowRight,
  FiCheck,
  FiStar
} from 'react-icons/fi';

const WorkAsTherapistCard = ({ user }) => {
  const navigate = useNavigate();

  const handleApplyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Apply Now clicked - navigating to /work-as-therapist');
    try {
      navigate('/work-as-therapist');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: use window.location
      window.location.href = '/work-as-therapist';
    }
  };

  const handleViewStatus = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('View Status clicked - navigating to /therapist-application-status');
    try {
      navigate('/therapist-application-status');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: use window.location
      window.location.href = '/therapist-application-status';
    }
  };

  const benefits = [
    {
      icon: <FiDollarSign className="w-5 h-5" />,
      title: 'Competitive Earnings',
      description: 'Earn LKR 20,000 per 30-hour monthly package'
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Help Others',
      description: 'Make a difference in people\'s lives through therapy'
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      title: 'Flexible Schedule',
      description: 'Set your own availability and working hours'
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      title: 'Professional Growth',
      description: 'Build your reputation and expand your practice'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm border border-blue-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <FiBriefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Work as a Therapist</h3>
            <p className="text-sm text-blue-700">Join our platform and help others</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">LKR 20K</div>
          <div className="text-xs text-blue-600">per month</div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
            <div className="text-blue-600 mt-0.5">
              {benefit.icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">{benefit.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Requirements */}
      <div className="bg-white/60 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <FiCheck className="w-4 h-4 text-green-600 mr-2" />
          Basic Requirements
        </h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Relevant degree in Speech Therapy, Audiology, or related field</li>
          <li>• Professional registration (where applicable)</li>
          <li>• Valid police clearance certificate</li>
          <li>• Minimum 1 year experience (including internships)</li>
        </ul>
      </div>

      {/* Application Process */}
      <div className="bg-white/60 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Application Process</h4>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">1</div>
            <span className="text-gray-700">Apply</span>
          </div>
          <FiArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
            <span className="text-gray-700">Review</span>
          </div>
          <FiArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">3</div>
            <span className="text-gray-700">Approved</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2">Review process typically takes 3-5 business days</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleApplyNow}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
        >
          <FiBriefcase className="w-4 h-4 mr-2" />
          Apply Now
        </button>
        <button
          onClick={handleViewStatus}
          className="px-4 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center"
        >
          <FiClock className="w-4 h-4 mr-2" />
          Check Status
        </button>
      </div>

      {/* Alternative Links (for debugging) */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          Alternative links: {' '}
          <a
            href="/work-as-therapist"
            className="text-blue-600 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              handleApplyNow(e);
            }}
          >
            Apply Form
          </a>
          {' | '}
          <a
            href="/therapist-application-status"
            className="text-blue-600 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              handleViewStatus(e);
            }}
          >
            Check Status
          </a>
          {' | '}
          <a
            href="/test-route"
            className="text-green-600 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate('/test-route');
            }}
          >
            Test Route
          </a>
        </p>
      </div>

      {/* Success Stories */}
      <div className="mt-6 pt-6 border-t border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 text-sm">Join 50+ Therapists</h4>
            <p className="text-xs text-gray-600">Already helping clients on our platform</p>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
            <span className="text-xs text-gray-600 ml-1">4.9/5</span>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600">
          Questions? Contact us at{' '}
          <a href="mailto:careers@kleara.com" className="text-blue-600 hover:underline">
            careers@kleara.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default WorkAsTherapistCard;

import React from 'react';
import { FiFileText, FiUsers, FiBarChart, FiSettings, FiMapPin, FiHeadphones } from 'react-icons/fi';

const RequirementsStep = ({ formData, handleInputChange }) => {
  const { requirements } = formData;

  const additionalServices = [
    {
      id: 'staffTraining',
      title: 'Staff Training Program',
      description: 'Comprehensive training for your staff on using the platform and supporting students',
      icon: <FiUsers className="w-6 h-6" />,
      included: 'Included for 20+ students',
      price: 'LKR 50,000 (one-time)'
    },
    {
      id: 'progressReporting',
      title: 'Advanced Progress Reporting',
      description: 'Detailed analytics, custom reports, and progress tracking dashboards',
      icon: <FiBarChart className="w-6 h-6" />,
      included: 'Included for all packages',
      price: 'Free'
    },
    {
      id: 'customization',
      title: 'Platform Customization',
      description: 'Custom branding, institution-specific content, and tailored user interface',
      icon: <FiSettings className="w-6 h-6" />,
      included: 'Available on request',
      price: 'Quote on request'
    },
    {
      id: 'technicalSupport',
      title: 'Priority Technical Support',
      description: '24/7 technical support with dedicated support representative',
      icon: <FiHeadphones className="w-6 h-6" />,
      included: 'Included for 50+ students',
      price: 'LKR 25,000/month'
    },
    {
      id: 'onSiteVisits',
      title: 'On-Site Support Visits',
      description: 'Regular visits from our team for training, support, and consultation',
      icon: <FiMapPin className="w-6 h-6" />,
      included: 'Available on request',
      price: 'LKR 15,000 per visit'
    }
  ];

  const handleServiceToggle = (serviceId) => {
    handleInputChange('requirements', serviceId, !requirements[serviceId]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiFileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Additional Requirements</h3>
        <p className="text-gray-600">Select additional services and support options for your institution</p>
      </div>

      {/* Additional Services */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Services</h4>
        <div className="space-y-4">
          {additionalServices.map((service) => (
            <div
              key={service.id}
              className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${
                requirements[service.id]
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  requirements[service.id] ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-gray-900">{service.title}</h5>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={requirements[service.id]}
                        onChange={() => handleServiceToggle(service.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">{service.included}</span>
                    <span className="text-gray-700 font-medium">{service.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Timeline */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Implementation Preferences</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Immediate Start</h5>
            <p className="text-sm text-gray-600 mb-3">Begin within 1-2 weeks</p>
            <div className="text-xs text-green-600">✓ Quick setup</div>
            <div className="text-xs text-green-600">✓ Basic training included</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Planned Rollout</h5>
            <p className="text-sm text-gray-600 mb-3">Begin within 1 month</p>
            <div className="text-xs text-green-600">✓ Comprehensive training</div>
            <div className="text-xs text-green-600">✓ Custom setup</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Next Academic Year</h5>
            <p className="text-sm text-gray-600 mb-3">Begin next semester</p>
            <div className="text-xs text-green-600">✓ Full preparation time</div>
            <div className="text-xs text-green-600">✓ Staff readiness</div>
          </div>
        </div>
      </div>

      {/* Special Requirements */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes & Requirements</h4>
        <textarea
          value={requirements.additionalNotes}
          onChange={(e) => handleInputChange('requirements', 'additionalNotes', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Please describe any specific requirements, concerns, or questions you have about implementing the therapy programs at your institution..."
        />
        <p className="text-xs text-gray-500 mt-2">
          Include information about your current technology setup, staff experience, specific student needs, 
          budget constraints, or any other relevant details that would help us customize the best solution for you.
        </p>
      </div>

      {/* Support Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-medium text-blue-900 mb-3">Implementation Support</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-medium mb-2">Included with Every Package:</h5>
            <ul className="space-y-1">
              <li>• Initial platform setup and configuration</li>
              <li>• Basic staff training (2-hour session)</li>
              <li>• Student account creation and setup</li>
              <li>• 30-day implementation support</li>
              <li>• Progress monitoring and reporting</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Premium Support Options:</h5>
            <ul className="space-y-1">
              <li>• Extended staff training programs</li>
              <li>• Custom content development</li>
              <li>• Regular on-site visits</li>
              <li>• 24/7 technical support</li>
              <li>• Advanced analytics and reporting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Need Help Deciding?</h4>
        <p className="text-sm text-green-800 mb-3">
          Our education specialists are available to help you choose the right package and services for your institution.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 text-sm">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Schedule Consultation
          </button>
          <button className="px-4 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            Request Demo
          </button>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Selected Additional Services</h4>
        {Object.entries(requirements).some(([key, value]) => value && key !== 'additionalNotes') ? (
          <div className="space-y-2">
            {additionalServices.map((service) => 
              requirements[service.id] && (
                <div key={service.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{service.title}</span>
                  <span className="font-medium text-gray-900">{service.price}</span>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">No additional services selected</p>
        )}
      </div>
    </div>
  );
};

export default RequirementsStep;

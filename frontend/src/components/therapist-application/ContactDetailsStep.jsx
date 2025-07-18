import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ContactDetailsStep = ({ formData, handleInputChange }) => {
  const { contactDetails } = formData;

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const provinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern',
    'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiPhone className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Contact Details</h3>
        <p className="text-gray-600">Provide your contact information for communication and verification</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={contactDetails.mobileNumber}
              onChange={(e) => handleInputChange('contactDetails', 'mobileNumber', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+94 77 123 4567"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Will be verified with OTP</p>
        </div>

        {/* Alternate Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alternate Number
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={contactDetails.alternateNumber}
              onChange={(e) => handleInputChange('contactDetails', 'alternateNumber', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+94 11 123 4567 (Optional)"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Optional backup contact number</p>
        </div>

        {/* Email Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={contactDetails.emailAddress}
              onChange={(e) => handleInputChange('contactDetails', 'emailAddress', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Will be verified with email OTP</p>
        </div>

        {/* Residential Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Residential Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={contactDetails.residentialAddress}
              onChange={(e) => handleInputChange('contactDetails', 'residentialAddress', e.target.value)}
              rows={3}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your complete residential address with house number, street, city"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Include house number, street name, and city</p>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District <span className="text-red-500">*</span>
          </label>
          <select
            value={contactDetails.district}
            onChange={(e) => handleInputChange('contactDetails', 'district', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Province */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Province <span className="text-red-500">*</span>
          </label>
          <select
            value={contactDetails.province}
            onChange={(e) => handleInputChange('contactDetails', 'province', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Province</option>
            {provinces.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Verification Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Verification Required:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Your mobile number will be verified with an OTP code</li>
          <li>• Your email address will be verified with a confirmation link</li>
          <li>• Ensure all contact details are accurate and accessible</li>
          <li>• You will receive important updates about your application via these contacts</li>
        </ul>
      </div>

      {/* Location Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Location Benefits:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Patients can find therapists in their area</li>
          <li>• Better matching with local clients</li>
          <li>• Reduced travel time for in-person sessions</li>
          <li>• Regional language preferences can be accommodated</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactDetailsStep;

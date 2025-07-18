import React from 'react';
import { FiUser, FiCalendar, FiCreditCard } from 'react-icons/fi';

const PersonalDetailsStep = ({ formData, handleInputChange }) => {
  const { personalDetails } = formData;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiUser className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Personal Details</h3>
        <p className="text-gray-600">Please provide your personal information as it appears on your ID document</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalDetails.fullName}
            onChange={(e) => handleInputChange('personalDetails', 'fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name as per ID document"
          />
          <p className="text-xs text-gray-500 mt-1">Must match exactly with your National ID or Passport</p>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={personalDetails.dateOfBirth}
              onChange={(e) => handleInputChange('personalDetails', 'dateOfBirth', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Must be at least 21 years old</p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={personalDetails.gender}
            onChange={(e) => handleInputChange('personalDetails', 'gender', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* NIC/Passport Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NIC/Passport Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={personalDetails.nicPassport}
              onChange={(e) => handleInputChange('personalDetails', 'nicPassport', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter NIC or Passport number"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Enter your National ID or Passport number</p>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality <span className="text-red-500">*</span>
          </label>
          <select
            value={personalDetails.nationality}
            onChange={(e) => handleInputChange('personalDetails', 'nationality', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Sri Lankan">Sri Lankan</option>
            <option value="Indian">Indian</option>
            <option value="British">British</option>
            <option value="American">American</option>
            <option value="Australian">Australian</option>
            <option value="Canadian">Canadian</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All information must match exactly with your official documents</li>
          <li>• You must be at least 21 years old to apply as a therapist</li>
          <li>• Your ID document will be verified during the review process</li>
          <li>• Any discrepancies may result in application rejection</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;

import React from 'react';
import { FiHome, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

const InstitutionDetailsStep = ({ formData, handleInputChange }) => {
  const { institutionDetails } = formData;

  const institutionTypes = [
    'Public School',
    'Private School',
    'International School',
    'Special Needs Center',
    'Rehabilitation Center',
    'Early Childhood Development Center',
    'University/College',
    'NGO/Non-Profit Organization',
    'Government Institution',
    'Healthcare Facility',
    'Community Center',
    'Other'
  ];

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

  const specializations = [
    'General Education',
    'Special Needs Education',
    'Speech and Language Disorders',
    'Hearing Impairments',
    'Autism Spectrum Disorders',
    'Learning Disabilities',
    'Physical Disabilities',
    'Multiple Disabilities',
    'Early Intervention',
    'Rehabilitation Services',
    'Community Outreach',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiHome className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Institution Details</h3>
        <p className="text-gray-600">Tell us about your institution and contact information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Institution Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={institutionDetails.institutionName}
              onChange={(e) => handleInputChange('institutionDetails', 'institutionName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your institution name"
            />
          </div>
        </div>

        {/* Institution Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Type <span className="text-red-500">*</span>
          </label>
          <select
            value={institutionDetails.institutionType}
            onChange={(e) => handleInputChange('institutionDetails', 'institutionType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Institution Type</option>
            {institutionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Specialization
          </label>
          <select
            value={institutionDetails.specialization}
            onChange={(e) => handleInputChange('institutionDetails', 'specialization', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Specialization</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Contact Person */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={institutionDetails.contactPerson}
              onChange={(e) => handleInputChange('institutionDetails', 'contactPerson', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Full name of contact person"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={institutionDetails.email}
              onChange={(e) => handleInputChange('institutionDetails', 'email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="institution@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={institutionDetails.phone}
              onChange={(e) => handleInputChange('institutionDetails', 'phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+94 11 123 4567"
            />
          </div>
        </div>

        {/* Established Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Established Year
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={institutionDetails.establishedYear}
              onChange={(e) => handleInputChange('institutionDetails', 'establishedYear', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2020"
            />
          </div>
        </div>

        {/* Student Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Student Capacity
          </label>
          <input
            type="number"
            min="1"
            value={institutionDetails.studentCapacity}
            onChange={(e) => handleInputChange('institutionDetails', 'studentCapacity', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Total number of students in institution"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={institutionDetails.address}
              onChange={(e) => handleInputChange('institutionDetails', 'address', e.target.value)}
              rows={3}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Complete address with street, city, postal code"
            />
          </div>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District <span className="text-red-500">*</span>
          </label>
          <select
            value={institutionDetails.district}
            onChange={(e) => handleInputChange('institutionDetails', 'district', e.target.value)}
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
            value={institutionDetails.province}
            onChange={(e) => handleInputChange('institutionDetails', 'province', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Province</option>
            {provinces.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Institution Benefits */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Enterprise Package Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
          <div>• Bulk pricing discounts (up to 30% off)</div>
          <div>• Dedicated account manager</div>
          <div>• Custom progress reporting</div>
          <div>• Staff training included</div>
          <div>• Priority technical support</div>
          <div>• Flexible payment terms</div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Important Information</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• All fields marked with * are required</li>
          <li>• We will verify institution details before approval</li>
          <li>• A representative will contact you within 2-3 business days</li>
          <li>• Custom packages available for 50+ students</li>
        </ul>
      </div>
    </div>
  );
};

export default InstitutionDetailsStep;

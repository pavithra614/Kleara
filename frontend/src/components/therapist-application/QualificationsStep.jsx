import React from 'react';
import { FiAward, FiBook, FiBookOpen } from 'react-icons/fi';

const QualificationsStep = ({ formData, handleInputChange }) => {
  const { qualifications } = formData;

  const qualificationLevels = [
    'Bachelor\'s Degree (BSc)',
    'Master\'s Degree (MSc)',
    'Doctoral Degree (PhD)',
    'Diploma in Speech Therapy',
    'Professional Certificate',
    'Other'
  ];

  const fieldsOfStudy = [
    'Speech-Language Pathology',
    'Audiology',
    'Communication Sciences and Disorders',
    'Special Education',
    'Psychology',
    'Occupational Therapy',
    'Physical Therapy',
    'Deaf Studies',
    'Linguistics',
    'Other'
  ];

  const universities = [
    'University of Colombo',
    'University of Peradeniya',
    'University of Sri Jayewardenepura',
    'University of Kelaniya',
    'University of Moratuwa',
    'Open University of Sri Lanka',
    'SLIIT (Sri Lanka Institute of Information Technology)',
    'NSBM Green University',
    'International University',
    'Foreign University',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiBookOpen className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Professional Qualifications</h3>
        <p className="text-gray-600">Provide details about your educational background and professional credentials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Qualification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highest Qualification <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiAward className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={qualifications.highestQualification}
              onChange={(e) => handleInputChange('qualifications', 'highestQualification', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Qualification</option>
              {qualificationLevels.map(qual => (
                <option key={qual} value={qual}>{qual}</option>
              ))}
            </select>
          </div>
        </div>

        {/* University/Institute Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University/Institute Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={qualifications.universityName}
              onChange={(e) => handleInputChange('qualifications', 'universityName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select University/Institute</option>
              {universities.map(uni => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-1">Select "Other" if your institution is not listed</p>
        </div>

        {/* Field of Study */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field of Study <span className="text-red-500">*</span>
          </label>
          <select
            value={qualifications.fieldOfStudy}
            onChange={(e) => handleInputChange('qualifications', 'fieldOfStudy', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Field of Study</option>
            {fieldsOfStudy.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </div>

        {/* Registration Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Registration Number
          </label>
          <input
            type="text"
            value={qualifications.registrationNumber}
            onChange={(e) => handleInputChange('qualifications', 'registrationNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter registration number (if applicable)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Required if registered with SLMC, Allied Health Council, or other professional bodies
          </p>
        </div>
      </div>

      {/* Additional Qualifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Qualifications or Certifications
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="List any additional certifications, courses, or specialized training (e.g., PROMPT, LSVT, ABA certification)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Include specialized therapy techniques, continuing education, or professional development courses
        </p>
      </div>

      {/* Professional Bodies */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-3">Professional Registration Bodies in Sri Lanka:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
          <div>
            <strong>SLMC (Sri Lanka Medical Council)</strong>
            <p>For medical professionals</p>
          </div>
          <div>
            <strong>Allied Health Professionals Council</strong>
            <p>For allied health professionals</p>
          </div>
          <div>
            <strong>SLSPA</strong>
            <p>Sri Lanka Speech-Language Pathology Association</p>
          </div>
          <div>
            <strong>International Bodies</strong>
            <p>ASHA, RCSLT, SAC, etc.</p>
          </div>
        </div>
      </div>

      {/* Document Requirements */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Document Requirements:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• You will need to upload your degree certificate in the next steps</li>
          <li>• Transcripts or mark sheets may be required for verification</li>
          <li>• Professional registration certificates must be current and valid</li>
          <li>• All documents should be clear, legible scans or photos</li>
        </ul>
      </div>

      {/* Minimum Requirements */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Minimum Qualification Requirements:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Bachelor's degree in relevant field (Speech Therapy, Audiology, etc.)</li>
          <li>• Professional registration (where applicable)</li>
          <li>• Relevant clinical experience or internship</li>
          <li>• Good academic standing from recognized institution</li>
        </ul>
      </div>
    </div>
  );
};

export default QualificationsStep;

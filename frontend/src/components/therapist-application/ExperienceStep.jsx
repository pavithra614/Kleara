import React from 'react';
import { FiBriefcase, FiClock, FiGlobe } from 'react-icons/fi';

const ExperienceStep = ({ formData, handleInputChange, handleMultiSelectChange }) => {
  const { experience } = formData;

  const expertiseAreas = [
    'Speech Delay',
    'Language Disorders',
    'Articulation Disorders',
    'Stuttering/Fluency',
    'Voice Disorders',
    'Hearing Loss',
    'Autism Spectrum Disorders',
    'Cerebral Palsy',
    'Down Syndrome',
    'Swallowing Difficulties',
    'Cognitive Communication',
    'Sign Language',
    'Apraxia of Speech',
    'Dysarthria',
    'Cleft Palate',
    'Traumatic Brain Injury'
  ];

  const languages = [
    'Sinhala',
    'Tamil',
    'English',
    'ASL (American Sign Language)',
    'BSL (British Sign Language)',
    'ISL (Indian Sign Language)',
    'Arabic',
    'Hindi',
    'Malayalam',
    'Telugu',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiBriefcase className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Professional Experience</h3>
        <p className="text-gray-600">Tell us about your experience and areas of expertise</p>
      </div>

      {/* Total Years of Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Total Years of Experience <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={experience.totalYears}
            onChange={(e) => handleInputChange('experience', 'totalYears', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Experience</option>
            <option value="0-1">0-1 years (Fresh Graduate/Intern)</option>
            <option value="1-2">1-2 years</option>
            <option value="2-5">2-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10-15">10-15 years</option>
            <option value="15+">15+ years</option>
          </select>
        </div>
        <p className="text-xs text-gray-500 mt-1">Include internships and clinical placements</p>
      </div>

      {/* Areas of Expertise */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Areas of Expertise <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">Select all areas where you have experience or training</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {expertiseAreas.map(area => (
            <label key={area} className="flex items-center">
              <input
                type="checkbox"
                checked={experience.areasOfExpertise.includes(area)}
                onChange={() => handleMultiSelectChange('experience', 'areasOfExpertise', area)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{area}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selected: {experience.areasOfExpertise.length} area(s). Select at least 1.
        </p>
      </div>

      {/* Languages Spoken */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Languages Spoken <span className="text-red-500">*</span>
        </label>
        <div className="relative mb-3">
          <FiGlobe className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <p className="pl-10 text-sm text-gray-600">Select all languages you can communicate in fluently</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {languages.map(language => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                checked={experience.languagesSpoken.includes(language)}
                onChange={() => handleMultiSelectChange('experience', 'languagesSpoken', language)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{language}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selected: {experience.languagesSpoken.length} language(s). Select at least 1.
        </p>
      </div>

      {/* Work Experience Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Experience Summary
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Briefly describe your work experience, including positions held, institutions worked at, and key responsibilities..."
        />
        <p className="text-xs text-gray-500 mt-1">
          This will help us understand your background better (optional but recommended)
        </p>
      </div>

      {/* Special Training or Certifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Training or Certifications
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="List any specialized training, workshops, or certifications (e.g., PROMPT, LSVT LOUD, ABA, etc.)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Include dates and certifying organizations if available
        </p>
      </div>

      {/* Experience Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Experience Guidelines:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Fresh graduates with clinical placements are welcome to apply</li>
          <li>• Include internships, volunteer work, and supervised practice</li>
          <li>• Specify your strongest areas of expertise</li>
          <li>• Language skills help match you with appropriate clients</li>
        </ul>
      </div>

      {/* Expertise Categories */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Common Expertise Categories:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-800">
          <div>
            <strong>Pediatric Conditions:</strong>
            <p>Speech delay, autism, cerebral palsy, developmental disorders</p>
          </div>
          <div>
            <strong>Adult Conditions:</strong>
            <p>Stroke recovery, voice disorders, hearing loss, cognitive issues</p>
          </div>
          <div>
            <strong>Communication Methods:</strong>
            <p>Sign language, AAC devices, speech therapy techniques</p>
          </div>
          <div>
            <strong>Specialized Areas:</strong>
            <p>Swallowing therapy, fluency disorders, accent modification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceStep;

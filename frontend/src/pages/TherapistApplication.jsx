import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCheck,
  FiUser,
  FiPhone,
  FiBookOpen,
  FiBriefcase,
  FiUpload,
  FiCalendar,
  FiCreditCard,
  FiFileText
} from 'react-icons/fi';

// Import step components
import PersonalDetailsStep from '../components/therapist-application/PersonalDetailsStep';
import ContactDetailsStep from '../components/therapist-application/ContactDetailsStep';
import QualificationsStep from '../components/therapist-application/QualificationsStep';
import ExperienceStep from '../components/therapist-application/ExperienceStep';
import DocumentsStep from '../components/therapist-application/DocumentsStep';
import AvailabilityStep from '../components/therapist-application/AvailabilityStep';
import BankDetailsStep from '../components/therapist-application/BankDetailsStep';
import DeclarationsStep from '../components/therapist-application/DeclarationsStep';

const TherapistApplication = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Debug log
  console.log('TherapistApplication component loaded');
  const [formData, setFormData] = useState({
    // Personal Details
    personalDetails: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      nicPassport: '',
      nationality: 'Sri Lankan'
    },
    // Contact Details
    contactDetails: {
      mobileNumber: '',
      alternateNumber: '',
      emailAddress: '',
      residentialAddress: '',
      district: '',
      province: ''
    },
    // Professional Qualifications
    qualifications: {
      highestQualification: '',
      universityName: '',
      fieldOfStudy: '',
      registrationNumber: ''
    },
    // Experience
    experience: {
      totalYears: '',
      areasOfExpertise: [],
      languagesSpoken: []
    },
    // Documents (file objects will be stored here)
    documents: {
      nationalId: null,
      degreeCertificate: null,
      transcript: null,
      license: null,
      experienceLetter: null,
      profilePhoto: null,
      policeClearance: null,
      cpdCertificates: null
    },
    // Availability
    availability: {
      daysAvailable: [],
      timeSlots: {
        start: '',
        end: ''
      }
    },
    // Bank Details
    bankDetails: {
      accountHolderName: '',
      bankName: '',
      branchName: '',
      accountNumber: '',
      bankDocument: null
    },
    // Declarations
    declarations: {
      agreeTerms: false,
      consentProfile: false,
      digitalSignature: null
    }
  });

  const steps = [
    { id: 1, title: 'Personal Details', icon: <FiUser className="w-5 h-5" /> },
    { id: 2, title: 'Contact Details', icon: <FiPhone className="w-5 h-5" /> },
    { id: 3, title: 'Qualifications', icon: <FiBookOpen className="w-5 h-5" /> },
    { id: 4, title: 'Experience', icon: <FiBriefcase className="w-5 h-5" /> },
    { id: 5, title: 'Documents', icon: <FiUpload className="w-5 h-5" /> },
    { id: 6, title: 'Availability', icon: <FiCalendar className="w-5 h-5" /> },
    { id: 7, title: 'Bank Details', icon: <FiCreditCard className="w-5 h-5" /> },
    { id: 8, title: 'Declarations', icon: <FiFileText className="w-5 h-5" /> }
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

  const qualifications = [
    'Bachelor\'s Degree (BSc)', 'Master\'s Degree (MSc)', 'Doctoral Degree (PhD)',
    'Diploma', 'Professional Certificate', 'Other'
  ];

  const expertiseAreas = [
    'Speech Delay', 'Language Disorders', 'Articulation Disorders',
    'Stuttering/Fluency', 'Voice Disorders', 'Hearing Loss',
    'Autism Spectrum Disorders', 'Cerebral Palsy', 'Down Syndrome',
    'Swallowing Difficulties', 'Cognitive Communication', 'Sign Language'
  ];

  const languages = [
    'Sinhala', 'Tamil', 'English', 'ASL (American Sign Language)',
    'BSL (British Sign Language)', 'Other'
  ];

  const banks = [
    'Bank of Ceylon', 'People\'s Bank', 'Commercial Bank', 'Hatton National Bank',
    'Sampath Bank', 'Nations Trust Bank', 'DFCC Bank', 'Union Bank',
    'Seylan Bank', 'Pan Asia Banking Corporation', 'Other'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleMultiSelectChange = (section, field, value) => {
    setFormData(prev => {
      const currentValues = prev[section][field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newValues
        }
      };
    });
  };

  const handleFileUpload = (section, field, file) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: file
      }
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        const { fullName, dateOfBirth, gender, nicPassport } = formData.personalDetails;
        return fullName && dateOfBirth && gender && nicPassport;
      case 2:
        const { mobileNumber, emailAddress, residentialAddress, district, province } = formData.contactDetails;
        return mobileNumber && emailAddress && residentialAddress && district && province;
      case 3:
        const { highestQualification, universityName, fieldOfStudy } = formData.qualifications;
        return highestQualification && universityName && fieldOfStudy;
      case 4:
        const { totalYears, areasOfExpertise, languagesSpoken } = formData.experience;
        return totalYears && areasOfExpertise.length > 0 && languagesSpoken.length > 0;
      case 5:
        const { nationalId, degreeCertificate, experienceLetter, profilePhoto, policeClearance } = formData.documents;
        return nationalId && degreeCertificate && experienceLetter && profilePhoto && policeClearance;
      case 6:
        const { daysAvailable, timeSlots } = formData.availability;
        return daysAvailable.length > 0 && timeSlots.start && timeSlots.end;
      case 7:
        const { accountHolderName, bankName, branchName, accountNumber, bankDocument } = formData.bankDetails;
        return accountHolderName && bankName && branchName && accountNumber && bankDocument;
      case 8:
        const { agreeTerms, consentProfile } = formData.declarations;
        return agreeTerms && consentProfile;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 8));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    console.log('Application submitted:', formData);
    // Here you would submit to API
    navigate('/therapist-application-status');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Work as a Therapist</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium text-sm ${
                  step.id < currentStep
                    ? 'bg-green-600 text-white'
                    : step.id === currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id < currentStep ? <FiCheck className="w-5 h-5" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step.id < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Step {currentStep}: {steps[currentStep - 1].title}
            </h2>
            <p className="text-sm text-gray-600">
              Complete all required fields to proceed to the next step
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {/* Render step content */}
          {currentStep === 1 && (
            <PersonalDetailsStep
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentStep === 2 && (
            <ContactDetailsStep
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentStep === 3 && (
            <QualificationsStep
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentStep === 4 && (
            <ExperienceStep
              formData={formData}
              handleInputChange={handleInputChange}
              handleMultiSelectChange={handleMultiSelectChange}
            />
          )}
          {currentStep === 5 && (
            <DocumentsStep
              formData={formData}
              handleFileUpload={handleFileUpload}
            />
          )}
          {currentStep === 6 && (
            <AvailabilityStep
              formData={formData}
              handleInputChange={handleInputChange}
              handleMultiSelectChange={handleMultiSelectChange}
            />
          )}
          {currentStep === 7 && (
            <BankDetailsStep
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileUpload={handleFileUpload}
            />
          )}
          {currentStep === 8 && (
            <DeclarationsStep
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileUpload={handleFileUpload}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            <button
              onClick={currentStep === 8 ? handleSubmit : handleNext}
              disabled={!validateStep(currentStep)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                validateStep(currentStep)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 8 ? 'Submit Application' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistApplication;

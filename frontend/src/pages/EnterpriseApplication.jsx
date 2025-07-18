import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCheck,
  FiHome,
  FiUsers,
  FiSettings,
  FiFileText,
  FiDollarSign
} from 'react-icons/fi';

// Import step components
import InstitutionDetailsStep from '../components/enterprise/InstitutionDetailsStep';
import PackageSelectionStep from '../components/enterprise/PackageSelectionStep';
import StudentDetailsStep from '../components/enterprise/StudentDetailsStep';
import RequirementsStep from '../components/enterprise/RequirementsStep';
import ReviewSubmitStep from '../components/enterprise/ReviewSubmitStep';

const EnterpriseApplication = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Institution Details
    institutionDetails: {
      institutionName: '',
      institutionType: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      district: '',
      province: '',
      establishedYear: '',
      studentCapacity: '',
      specialization: ''
    },
    // Package Selection
    packageSelection: {
      therapyTypes: [], // speech, hearing, sign_language
      packageDuration: '', // 3_months, 6_months, 12_months
      sessionFrequency: '', // daily, weekly, bi_weekly
      studentsCount: 0,
      specialRequests: ''
    },
    // Students Details
    students: [],
    // Additional Requirements
    requirements: {
      staffTraining: false,
      progressReporting: false,
      customization: false,
      technicalSupport: false,
      onSiteVisits: false,
      additionalNotes: ''
    }
  });

  const steps = [
    { id: 1, title: 'Institution Details', icon: <FiHome className="w-5 h-5" /> },
    { id: 2, title: 'Package Selection', icon: <FiSettings className="w-5 h-5" /> },
    { id: 3, title: 'Student Details', icon: <FiUsers className="w-5 h-5" /> },
    { id: 4, title: 'Requirements', icon: <FiFileText className="w-5 h-5" /> },
    { id: 5, title: 'Review & Submit', icon: <FiDollarSign className="w-5 h-5" /> }
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

  const handleArrayChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].includes(value)
          ? prev[section][field].filter(item => item !== value)
          : [...prev[section][field], value]
      }
    }));
  };

  const addStudent = (student) => {
    setFormData(prev => ({
      ...prev,
      students: [...prev.students, { ...student, id: Date.now() }]
    }));
  };

  const removeStudent = (studentId) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== studentId)
    }));
  };

  const updateStudent = (studentId, updatedStudent) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.map(s => 
        s.id === studentId ? { ...updatedStudent, id: studentId } : s
      )
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        const { institutionName, contactPerson, email, phone } = formData.institutionDetails;
        return institutionName && contactPerson && email && phone;
      case 2:
        const { therapyTypes, packageDuration, sessionFrequency } = formData.packageSelection;
        return therapyTypes.length > 0 && packageDuration && sessionFrequency;
      case 3:
        return formData.students.length > 0;
      case 4:
        return true; // Requirements are optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    console.log('Enterprise application submitted:', formData);
    // Here you would submit to API
    navigate('/enterprise-application-status');
  };

  const calculateEstimatedCost = () => {
    const basePrice = 15000; // LKR 15,000 per student per month
    const studentsCount = formData.students.length;
    const monthsMultiplier = formData.packageSelection.packageDuration === '12_months' ? 12 :
                            formData.packageSelection.packageDuration === '6_months' ? 6 : 3;
    
    let totalCost = basePrice * studentsCount * monthsMultiplier;
    
    // Discounts for bulk
    if (studentsCount >= 50) totalCost *= 0.7; // 30% discount
    else if (studentsCount >= 20) totalCost *= 0.8; // 20% discount
    else if (studentsCount >= 10) totalCost *= 0.9; // 10% discount
    
    return Math.round(totalCost);
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
            <h1 className="text-2xl font-bold text-gray-900">Enterprise Package Application</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <div className={`w-16 h-1 mx-2 ${
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
              Apply for enterprise packages for your institution
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {/* Render step content */}
          {currentStep === 1 && (
            <InstitutionDetailsStep
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentStep === 2 && (
            <PackageSelectionStep
              formData={formData}
              handleInputChange={handleInputChange}
              handleArrayChange={handleArrayChange}
            />
          )}
          {currentStep === 3 && (
            <StudentDetailsStep
              formData={formData}
              addStudent={addStudent}
              removeStudent={removeStudent}
              updateStudent={updateStudent}
            />
          )}
          {currentStep === 4 && (
            <RequirementsStep
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {currentStep === 5 && (
            <ReviewSubmitStep
              formData={formData}
              calculateEstimatedCost={calculateEstimatedCost}
              onEdit={setCurrentStep}
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
              onClick={currentStep === 5 ? handleSubmit : handleNext}
              disabled={!validateStep(currentStep)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                validateStep(currentStep)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 5 ? 'Submit Application' : 'Next'}
            </button>
          </div>
        </div>

        {/* Cost Estimate Sidebar */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Package Estimate</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Students:</span>
              <span className="font-medium text-blue-900">{formData.students.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Duration:</span>
              <span className="font-medium text-blue-900">
                {formData.packageSelection.packageDuration ? 
                  formData.packageSelection.packageDuration.replace('_', ' ').replace('months', ' months') : 
                  'Not selected'
                }
              </span>
            </div>
            <div className="flex justify-between border-t border-blue-200 pt-2">
              <span className="text-blue-700 font-medium">Estimated Total:</span>
              <span className="font-bold text-blue-900">LKR {calculateEstimatedCost().toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-3">
            * Final pricing may vary based on specific requirements and negotiations
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseApplication;

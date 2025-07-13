import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiFileText, FiUser, FiCalendar, FiMapPin, FiPhone, FiMail, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const AgeVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    email: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    documentType: 'government-id',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    currentTherapist: '',
    reasonForTherapy: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    primaryDocument: null,
    secondaryDocument: null,
    guardianConsent: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (fileType, event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [fileType]: 'Please upload a valid image (JPG, PNG) or PDF file'
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          [fileType]: 'File size must be less than 5MB'
        }));
        return;
      }

      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: file
      }));

      // Clear error
      setErrors(prev => ({
        ...prev,
        [fileType]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';

      // Check if user is under 18
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required for users under 18';
        if (!formData.guardianPhone.trim()) newErrors.guardianPhone = 'Guardian phone is required for users under 18';
        if (!formData.guardianEmail.trim()) newErrors.guardianEmail = 'Guardian email is required for users under 18';
      }
    }

    if (step === 2) {
      if (!uploadedFiles.primaryDocument) newErrors.primaryDocument = 'Primary identification document is required';
      if (!uploadedFiles.secondaryDocument) newErrors.secondaryDocument = 'Secondary document is required';

      // Check if guardian consent is needed
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18 && !uploadedFiles.guardianConsent) {
        newErrors.guardianConsent = 'Guardian consent form is required for users under 18';
      }
    }

    if (step === 3) {
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency contact phone is required';
      if (!formData.reasonForTherapy.trim()) newErrors.reasonForTherapy = 'Reason for seeking therapy is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsLoading(true);

    // Simulate API call for verification submission
    setTimeout(() => {
      console.log('Verification submitted:', { formData, uploadedFiles });
      setIsLoading(false);

      // Navigate to verification status page
      navigate('/verification-status', {
        state: {
          submitted: true,
          submissionId: 'VER-' + Date.now(),
          estimatedReview: '2-3 business days'
        }
      });
    }, 2000);
  };

  const calculateAge = () => {
    if (!formData.dateOfBirth) return null;
    
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const isUnder18 = calculateAge() < 18;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Age & Identity Verification</h1>
          <p className="text-lg text-gray-600 mb-4">
            To access therapist-guided mode, we need to verify your identity and age
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
            <FiAlertCircle className="w-4 h-4" />
            <span>This verification is required for therapist-supervised sessions and health reports</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <FiCheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-sm text-gray-600">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Document Upload' :
                'Additional Details'
              }
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiUser className="inline w-4 h-4 mr-1" />
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full legal name"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiCalendar className="inline w-4 h-4 mr-1" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                    {calculateAge() !== null && (
                      <p className="text-sm text-gray-600 mt-1">
                        Age: {calculateAge()} years {isUnder18 && '(Guardian consent required)'}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiMapPin className="inline w-4 h-4 mr-1" />
                    Full Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your complete address"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiPhone className="inline w-4 h-4 mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FiMail className="inline w-4 h-4 mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Guardian Information (if under 18) */}
                {isUnder18 && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h3>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                      <p className="text-sm text-blue-800">
                        Since you are under 18, we require guardian consent and contact information for therapist-guided sessions.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Guardian Name
                        </label>
                        <input
                          type="text"
                          name="guardianName"
                          value={formData.guardianName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.guardianName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Guardian's full name"
                        />
                        {errors.guardianName && <p className="text-red-500 text-sm mt-1">{errors.guardianName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Guardian Phone
                        </label>
                        <input
                          type="tel"
                          name="guardianPhone"
                          value={formData.guardianPhone}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.guardianPhone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Guardian's phone"
                        />
                        {errors.guardianPhone && <p className="text-red-500 text-sm mt-1">{errors.guardianPhone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Guardian Email
                        </label>
                        <input
                          type="email"
                          name="guardianEmail"
                          value={formData.guardianEmail}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.guardianEmail ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Guardian's email"
                        />
                        {errors.guardianEmail && <p className="text-red-500 text-sm mt-1">{errors.guardianEmail}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Document Upload */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Verification Documents</h3>
                  <p className="text-gray-600">Please upload clear photos or scans of your identification documents</p>
                </div>

                {/* Primary Document */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Primary Identification</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Government-issued photo ID (Driver's License, Passport, State ID)
                    </p>

                    <input
                      type="file"
                      id="primaryDocument"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('primaryDocument', e)}
                      className="hidden"
                    />
                    <label
                      htmlFor="primaryDocument"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      <FiUpload className="w-4 h-4 mr-2" />
                      Choose File
                    </label>

                    {uploadedFiles.primaryDocument && (
                      <div className="mt-3 flex items-center justify-center space-x-2 text-green-600">
                        <FiCheckCircle className="w-4 h-4" />
                        <span className="text-sm">{uploadedFiles.primaryDocument.name}</span>
                      </div>
                    )}
                    {errors.primaryDocument && (
                      <p className="text-red-500 text-sm mt-2">{errors.primaryDocument}</p>
                    )}
                  </div>
                </div>

                {/* Secondary Document */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Secondary Document</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Proof of address (Utility bill, Bank statement, School enrollment)
                    </p>

                    <input
                      type="file"
                      id="secondaryDocument"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('secondaryDocument', e)}
                      className="hidden"
                    />
                    <label
                      htmlFor="secondaryDocument"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      <FiUpload className="w-4 h-4 mr-2" />
                      Choose File
                    </label>

                    {uploadedFiles.secondaryDocument && (
                      <div className="mt-3 flex items-center justify-center space-x-2 text-green-600">
                        <FiCheckCircle className="w-4 h-4" />
                        <span className="text-sm">{uploadedFiles.secondaryDocument.name}</span>
                      </div>
                    )}
                    {errors.secondaryDocument && (
                      <p className="text-red-500 text-sm mt-2">{errors.secondaryDocument}</p>
                    )}
                  </div>
                </div>

                {/* Guardian Consent (if under 18) */}
                {isUnder18 && (
                  <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 bg-amber-50">
                    <div className="text-center">
                      <FiFileText className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Guardian Consent Form</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Signed consent form from your guardian (Download template below)
                      </p>

                      <div className="mb-4">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 text-sm underline"
                          onClick={(e) => {
                            e.preventDefault();
                            alert('In a real app, this would download a consent form template');
                          }}
                        >
                          Download Guardian Consent Form Template
                        </a>
                      </div>

                      <input
                        type="file"
                        id="guardianConsent"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload('guardianConsent', e)}
                        className="hidden"
                      />
                      <label
                        htmlFor="guardianConsent"
                        className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 cursor-pointer transition-colors"
                      >
                        <FiUpload className="w-4 h-4 mr-2" />
                        Upload Signed Form
                      </label>

                      {uploadedFiles.guardianConsent && (
                        <div className="mt-3 flex items-center justify-center space-x-2 text-green-600">
                          <FiCheckCircle className="w-4 h-4" />
                          <span className="text-sm">{uploadedFiles.guardianConsent.name}</span>
                        </div>
                      )}
                      {errors.guardianConsent && (
                        <p className="text-red-500 text-sm mt-2">{errors.guardianConsent}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Document Requirements:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Documents must be clear and readable</li>
                    <li>• All four corners of the document must be visible</li>
                    <li>• File formats: JPG, PNG, or PDF</li>
                    <li>• Maximum file size: 5MB per document</li>
                    <li>• Documents must be current and not expired</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Information</h3>
                  <p className="text-gray-600">Help us provide the best therapeutic support for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Emergency contact full name"
                    />
                    {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Emergency contact phone"
                    />
                    {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Therapist (Optional)
                  </label>
                  <input
                    type="text"
                    name="currentTherapist"
                    value={formData.currentTherapist}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name and contact of current therapist (if any)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Conditions (Optional)
                  </label>
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any relevant medical conditions or medications"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Seeking Therapy *
                  </label>
                  <textarea
                    name="reasonForTherapy"
                    value={formData.reasonForTherapy}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.reasonForTherapy ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Please describe what you hope to achieve through therapy"
                  />
                  {errors.reasonForTherapy && <p className="text-red-500 text-sm mt-1">{errors.reasonForTherapy}</p>}
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Your application will be reviewed by our admin team</li>
                    <li>• Review typically takes 2-3 business days</li>
                    <li>• You'll receive an email notification about the status</li>
                    <li>• Once approved, you can access therapist-guided mode</li>
                    <li>• You can continue using self-guided mode while waiting</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={currentStep === 1 ? () => navigate('/signin') : handlePrevious}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {currentStep === 1 ? 'Back to Sign In' : 'Previous Step'}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Submitting...' : 'Submit for Review'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;

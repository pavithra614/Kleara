import React, { useRef } from 'react';
import { FiFileText, FiCheck, FiEdit3, FiShield, FiUsers } from 'react-icons/fi';

const DeclarationsStep = ({ formData, handleInputChange, handleFileUpload }) => {
  const { declarations } = formData;
  const canvasRef = useRef(null);

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('File size exceeds 2MB limit');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload JPG or PNG files only.');
        return;
      }

      handleFileUpload('declarations', 'digitalSignature', file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiFileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Declarations & Consent</h3>
        <p className="text-gray-600">Review and agree to the terms and conditions</p>
      </div>

      {/* Terms and Conditions */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <FiShield className="w-5 h-5 mr-2 text-blue-600" />
          Terms and Conditions
        </h4>
        
        <div className="max-h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-3">
          <div>
            <strong>1. Professional Conduct</strong>
            <p>I agree to maintain the highest standards of professional conduct and ethics in all interactions with clients, colleagues, and the platform.</p>
          </div>
          
          <div>
            <strong>2. Qualifications and Credentials</strong>
            <p>I certify that all information provided regarding my qualifications, experience, and credentials is accurate and truthful. I understand that false information may result in immediate termination.</p>
          </div>
          
          <div>
            <strong>3. Client Confidentiality</strong>
            <p>I agree to maintain strict confidentiality regarding all client information and therapy sessions, in accordance with professional ethics and applicable laws.</p>
          </div>
          
          <div>
            <strong>4. Service Quality</strong>
            <p>I commit to providing high-quality therapy services and maintaining professional standards in all sessions and communications.</p>
          </div>
          
          <div>
            <strong>5. Platform Compliance</strong>
            <p>I agree to comply with all platform policies, procedures, and guidelines as updated from time to time.</p>
          </div>
          
          <div>
            <strong>6. Payment Terms</strong>
            <p>I understand the payment structure and agree to the terms regarding session fees, payment processing, and any applicable deductions.</p>
          </div>
          
          <div>
            <strong>7. Termination</strong>
            <p>I understand that either party may terminate this agreement with appropriate notice, and I agree to complete any ongoing client commitments professionally.</p>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={declarations.agreeTerms}
              onChange={(e) => handleInputChange('declarations', 'agreeTerms', e.target.checked)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              <strong>I have read, understood, and agree to the Terms and Conditions</strong>
              <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
        </div>
      </div>

      {/* Privacy and Profile Consent */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <FiUsers className="w-5 h-5 mr-2 text-green-600" />
          Privacy and Profile Consent
        </h4>
        
        <div className="space-y-4 text-sm text-gray-700">
          <div className="bg-blue-50 p-4 rounded-lg">
            <strong>Profile Information Sharing:</strong>
            <p className="mt-1">Your profile information (name, qualifications, experience, photo, and areas of expertise) will be displayed to potential clients on our platform to help them choose the right therapist for their needs.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <strong>What will be shared:</strong>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>Professional name and photo</li>
              <li>Qualifications and certifications</li>
              <li>Areas of expertise and specializations</li>
              <li>Years of experience</li>
              <li>Languages spoken</li>
              <li>General location (district/province)</li>
              <li>Client reviews and ratings</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <strong>What will NOT be shared:</strong>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>Personal contact information</li>
              <li>Home address</li>
              <li>Bank account details</li>
              <li>ID/Passport numbers</li>
              <li>Personal documents</li>
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={declarations.consentProfile}
              onChange={(e) => handleInputChange('declarations', 'consentProfile', e.target.checked)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              <strong>I consent to sharing my professional profile information publicly on the platform</strong>
              <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
        </div>
      </div>

      {/* Digital Signature */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <FiEdit3 className="w-5 h-5 mr-2 text-purple-600" />
          Digital Signature
        </h4>
        
        <p className="text-sm text-gray-600 mb-4">
          Upload your digital signature or a clear image of your handwritten signature on white paper.
        </p>

        {declarations.digitalSignature ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FiCheck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Signature uploaded: {declarations.digitalSignature.name}
                  </p>
                  <p className="text-xs text-green-700">
                    {(declarations.digitalSignature.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <label className="cursor-pointer px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                Replace
                <input
                  type="file"
                  className="hidden"
                  onChange={handleSignatureUpload}
                  accept=".jpg,.jpeg,.png"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <FiEdit3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Upload your signature
            </p>
            <p className="text-xs text-gray-500 mb-3">
              JPG, PNG up to 2MB
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleSignatureUpload}
                accept=".jpg,.jpeg,.png"
              />
              <span className="inline-block px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                Choose Signature File
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Final Declaration */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">Final Declaration</h4>
        <p className="text-sm text-blue-800 mb-4">
          By submitting this application, I declare that:
        </p>
        <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
          <li>All information provided is true, accurate, and complete to the best of my knowledge</li>
          <li>I have the legal right to work as a therapist in Sri Lanka</li>
          <li>I will notify the platform immediately of any changes to my qualifications or circumstances</li>
          <li>I understand that providing false information may result in rejection or termination</li>
          <li>I consent to background verification and document authentication</li>
        </ul>
      </div>

      {/* Application Status Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Your application will be reviewed by our admin team</li>
          <li>• Document verification may take 3-5 business days</li>
          <li>• You will receive email updates about your application status</li>
          <li>• Once approved, you can start accepting client bookings</li>
          <li>• You can track your application status in your dashboard</li>
        </ul>
      </div>

      {/* Validation Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Application Checklist:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className={`flex items-center ${declarations.agreeTerms ? 'text-green-700' : 'text-red-700'}`}>
            {declarations.agreeTerms ? <FiCheck className="w-4 h-4 mr-2" /> : <span className="w-4 h-4 mr-2">✗</span>}
            Terms & Conditions Agreed
          </div>
          <div className={`flex items-center ${declarations.consentProfile ? 'text-green-700' : 'text-red-700'}`}>
            {declarations.consentProfile ? <FiCheck className="w-4 h-4 mr-2" /> : <span className="w-4 h-4 mr-2">✗</span>}
            Profile Consent Given
          </div>
          <div className={`flex items-center ${declarations.digitalSignature ? 'text-green-700' : 'text-red-700'}`}>
            {declarations.digitalSignature ? <FiCheck className="w-4 h-4 mr-2" /> : <span className="w-4 h-4 mr-2">✗</span>}
            Digital Signature Uploaded
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationsStep;

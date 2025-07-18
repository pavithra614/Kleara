import React from 'react';
import { FiUpload, FiFile, FiCheck, FiX, FiEye } from 'react-icons/fi';

const DocumentsStep = ({ formData, handleFileUpload }) => {
  const { documents } = formData;

  const documentRequirements = [
    {
      key: 'nationalId',
      title: 'National ID / Passport',
      required: true,
      description: 'Clear photo of front and back of NIC or passport pages',
      formats: 'PDF, JPG, PNG',
      maxSize: '5MB'
    },
    {
      key: 'degreeCertificate',
      title: 'Degree Certificate(s)',
      required: true,
      description: 'Your highest qualification certificate',
      formats: 'PDF, JPG, PNG',
      maxSize: '5MB'
    },
    {
      key: 'transcript',
      title: 'Transcript / Mark Sheet',
      required: false,
      description: 'Academic transcript or mark sheet (preferred)',
      formats: 'PDF, JPG, PNG',
      maxSize: '5MB'
    },
    {
      key: 'license',
      title: 'License / Registration Certificate',
      required: false,
      description: 'Professional registration certificate (if applicable)',
      formats: 'PDF, JPG, PNG',
      maxSize: '5MB'
    },
    {
      key: 'experienceLetter',
      title: 'Professional Experience Letter(s)',
      required: true,
      description: 'Letters from previous employers or supervisors',
      formats: 'PDF, JPG, PNG',
      maxSize: '10MB'
    },
    {
      key: 'profilePhoto',
      title: 'Profile Photo',
      required: true,
      description: 'Passport-size photo with clear background',
      formats: 'JPG, PNG',
      maxSize: '2MB'
    },
    {
      key: 'policeClearance',
      title: 'Police Clearance Certificate',
      required: true,
      description: 'Valid police clearance (within 6 months)',
      formats: 'PDF, JPG, PNG',
      maxSize: '5MB'
    },
    {
      key: 'cpdCertificates',
      title: 'CPD Certificates',
      required: false,
      description: 'Continuing Professional Development certificates (optional)',
      formats: 'PDF, JPG, PNG',
      maxSize: '10MB'
    }
  ];

  const handleFileChange = (key, event) => {
    const file = event.target.files[0];
    if (file) {
      // Basic file validation
      const maxSize = getMaxSize(key);
      if (file.size > maxSize) {
        alert(`File size exceeds ${getMaxSizeText(key)} limit`);
        return;
      }
      
      const allowedTypes = getAllowedTypes(key);
      if (!allowedTypes.includes(file.type)) {
        alert(`Invalid file type. Please upload ${getFormatsText(key)} files only.`);
        return;
      }

      handleFileUpload('documents', key, file);
    }
  };

  const getMaxSize = (key) => {
    const doc = documentRequirements.find(d => d.key === key);
    return parseInt(doc.maxSize) * 1024 * 1024; // Convert MB to bytes
  };

  const getMaxSizeText = (key) => {
    const doc = documentRequirements.find(d => d.key === key);
    return doc.maxSize;
  };

  const getFormatsText = (key) => {
    const doc = documentRequirements.find(d => d.key === key);
    return doc.formats;
  };

  const getAllowedTypes = (key) => {
    const doc = documentRequirements.find(d => d.key === key);
    const formats = doc.formats.toLowerCase();
    const types = [];
    
    if (formats.includes('pdf')) types.push('application/pdf');
    if (formats.includes('jpg')) types.push('image/jpeg');
    if (formats.includes('png')) types.push('image/png');
    
    return types;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiUpload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Document Upload</h3>
        <p className="text-gray-600">Upload all required documents for verification</p>
      </div>

      <div className="space-y-6">
        {documentRequirements.map((doc) => (
          <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 flex items-center">
                  {doc.title}
                  {doc.required && <span className="text-red-500 ml-1">*</span>}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Formats: {doc.formats} • Max size: {doc.maxSize}
                </p>
              </div>
              <div className="ml-4">
                {documents[doc.key] ? (
                  <div className="flex items-center space-x-2">
                    <FiCheck className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-600">Uploaded</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <FiX className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-400">Not uploaded</span>
                  </div>
                )}
              </div>
            </div>

            {documents[doc.key] ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FiFile className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        {documents[doc.key].name}
                      </p>
                      <p className="text-xs text-green-700">
                        {formatFileSize(documents[doc.key].size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <label className="cursor-pointer p-1 text-green-600 hover:bg-green-100 rounded">
                      <FiUpload className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(doc.key, e)}
                        accept={getAllowedTypes(doc.key).join(',')}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  {doc.formats} up to {doc.maxSize}
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(doc.key, e)}
                    accept={getAllowedTypes(doc.key).join(',')}
                  />
                  <span className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Choose File
                  </span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Upload Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Upload Guidelines:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Ensure all documents are clear and legible</li>
          <li>• Upload both front and back of ID documents</li>
          <li>• Police clearance must be issued within the last 6 months</li>
          <li>• Professional certificates should be from recognized institutions</li>
          <li>• Profile photo should have a clear, professional background</li>
        </ul>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Security & Privacy:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All documents are encrypted and stored securely</li>
          <li>• Documents are only used for verification purposes</li>
          <li>• Your personal information is protected according to our privacy policy</li>
          <li>• Documents will be permanently deleted if application is withdrawn</li>
        </ul>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Upload Progress</span>
          <span className="text-sm text-gray-600">
            {Object.values(documents).filter(doc => doc !== null).length} / {documentRequirements.length} files
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(Object.values(documents).filter(doc => doc !== null).length / documentRequirements.length) * 100}%` 
            }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Required documents: {documentRequirements.filter(doc => doc.required).length} / {documentRequirements.length}
        </p>
      </div>
    </div>
  );
};

export default DocumentsStep;

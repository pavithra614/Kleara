import { useState } from 'react';
import { FiUpload, FiFileText, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

const DocumentUpload = ({ 
  title, 
  description, 
  fileType, 
  uploadedFile, 
  onFileUpload, 
  error, 
  required = true,
  acceptedFormats = "image/*,.pdf",
  maxSize = 5 * 1024 * 1024, // 5MB
  variant = "default" // default, warning, success
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const validateAndUpload = (file) => {
    // Validate file type
    const allowedTypes = acceptedFormats.split(',').map(type => type.trim());
    const isValidType = allowedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      } else if (type.includes('/*')) {
        const mimeType = type.split('/')[0];
        return file.type.startsWith(mimeType);
      } else {
        return file.type === type;
      }
    });

    if (!isValidType) {
      onFileUpload(fileType, null, 'Please upload a valid file format');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      onFileUpload(fileType, null, `File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // File is valid
    onFileUpload(fileType, file, null);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          border: 'border-amber-300',
          background: 'bg-amber-50',
          icon: 'text-amber-600',
          button: 'bg-amber-600 hover:bg-amber-700'
        };
      case 'success':
        return {
          border: 'border-green-300',
          background: 'bg-green-50',
          icon: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700'
        };
      default:
        return {
          border: 'border-gray-300',
          background: 'bg-white',
          icon: 'text-gray-400',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`border-2 border-dashed rounded-lg p-6 transition-all ${styles.border} ${styles.background} ${
      isDragOver ? 'border-blue-400 bg-blue-50' : ''
    } ${error ? 'border-red-300 bg-red-50' : ''}`}>
      <div
        className="text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Icon */}
        <div className="mb-4">
          {uploadedFile ? (
            <FiCheckCircle className={`w-12 h-12 mx-auto text-green-500`} />
          ) : error ? (
            <FiXCircle className={`w-12 h-12 mx-auto text-red-500`} />
          ) : variant === 'warning' ? (
            <FiAlertCircle className={`w-12 h-12 mx-auto ${styles.icon}`} />
          ) : (
            <FiFileText className={`w-12 h-12 mx-auto ${styles.icon}`} />
          )}
        </div>

        {/* Title and Description */}
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h4>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        {/* Upload Button/Area */}
        <input
          type="file"
          id={`upload-${fileType}`}
          accept={acceptedFormats}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {!uploadedFile ? (
          <div>
            <label
              htmlFor={`upload-${fileType}`}
              className={`inline-flex items-center px-4 py-2 text-white rounded-lg cursor-pointer transition-colors ${styles.button}`}
            >
              <FiUpload className="w-4 h-4 mr-2" />
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-2">
              or drag and drop your file here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <FiCheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{uploadedFile.name}</span>
            </div>
            <div className="text-xs text-gray-500">
              Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
            <label
              htmlFor={`upload-${fileType}`}
              className="inline-flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <FiUpload className="w-3 h-3 mr-1" />
              Replace File
            </label>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-red-600">
            <FiXCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* File Requirements */}
        <div className="mt-4 text-xs text-gray-500">
          <p>Accepted formats: {acceptedFormats.replace(/,/g, ', ')}</p>
          <p>Maximum size: {Math.round(maxSize / (1024 * 1024))}MB</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;

import React from 'react';
import { FiCreditCard, FiDollarSign, FiUpload, FiShield } from 'react-icons/fi';

const BankDetailsStep = ({ formData, handleInputChange, handleFileUpload }) => {
  const { bankDetails } = formData;

  const banks = [
    'Bank of Ceylon',
    'People\'s Bank',
    'Commercial Bank of Ceylon',
    'Hatton National Bank',
    'Sampath Bank',
    'Nations Trust Bank',
    'DFCC Bank',
    'Union Bank',
    'Seylan Bank',
    'Pan Asia Banking Corporation',
    'National Development Bank',
    'Regional Development Bank',
    'Sanasa Development Bank',
    'Other'
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Basic file validation
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('File size exceeds 5MB limit');
        return;
      }
      
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload PDF, JPG, or PNG files only.');
        return;
      }

      handleFileUpload('bankDetails', 'bankDocument', file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiCreditCard className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Bank Details</h3>
        <p className="text-gray-600">Provide your bank account information for payment processing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Holder Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Holder Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={bankDetails.accountHolderName}
            onChange={(e) => handleInputChange('bankDetails', 'accountHolderName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter account holder name (must match ID document)"
          />
          <p className="text-xs text-gray-500 mt-1">Must exactly match the name on your National ID or Passport</p>
        </div>

        {/* Bank Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name <span className="text-red-500">*</span>
          </label>
          <select
            value={bankDetails.bankName}
            onChange={(e) => handleInputChange('bankDetails', 'bankName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Bank</option>
            {banks.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        {/* Branch Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={bankDetails.branchName}
            onChange={(e) => handleInputChange('bankDetails', 'branchName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter branch name (e.g., Colombo Main Branch)"
          />
        </div>

        {/* Account Number */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={bankDetails.accountNumber}
            onChange={(e) => handleInputChange('bankDetails', 'accountNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your bank account number"
          />
          <p className="text-xs text-gray-500 mt-1">Enter your complete account number without spaces or dashes</p>
        </div>
      </div>

      {/* Bank Document Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bank Document (Proof) <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Upload a bank statement, passbook first page, or account verification letter
        </p>

        {bankDetails.bankDocument ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FiCreditCard className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    {bankDetails.bankDocument.name}
                  </p>
                  <p className="text-xs text-green-700">
                    {(bankDetails.bankDocument.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <label className="cursor-pointer px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                Replace
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload bank document
            </p>
            <p className="text-xs text-gray-500 mb-3">
              PDF, JPG, PNG up to 5MB
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Payment Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FiDollarSign className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Payment Information:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Payments are processed monthly based on completed sessions</li>
              <li>• You earn LKR 20,000 per 30-hour monthly package from clients</li>
              <li>• Payments are transferred within 5-7 business days</li>
              <li>• Detailed payment reports are available in your dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <FiShield className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900 mb-2">Security & Privacy:</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• All banking information is encrypted and stored securely</li>
              <li>• Bank details are only used for payment processing</li>
              <li>• We comply with banking security standards and regulations</li>
              <li>• Your financial information is never shared with third parties</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Acceptable Documents */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Acceptable Bank Documents:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-yellow-800">
          <div>
            <strong>Bank Statement:</strong>
            <p>Recent statement showing account details</p>
          </div>
          <div>
            <strong>Passbook:</strong>
            <p>First page with account information</p>
          </div>
          <div>
            <strong>Account Verification Letter:</strong>
            <p>Official letter from bank confirming account</p>
          </div>
          <div>
            <strong>Deposit Slip:</strong>
            <p>Recent deposit slip with account details</p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-medium text-red-900 mb-2">Important Notes:</h4>
        <ul className="text-sm text-red-800 space-y-1">
          <li>• Account holder name must exactly match your ID document</li>
          <li>• Only Sri Lankan bank accounts are currently supported</li>
          <li>• Joint accounts require additional verification</li>
          <li>• Savings or current accounts are both acceptable</li>
          <li>• Ensure account is active and in good standing</li>
        </ul>
      </div>
    </div>
  );
};

export default BankDetailsStep;

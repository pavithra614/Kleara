import React from 'react';
import { FiDollarSign, FiCheck, FiEdit, FiUsers, FiSettings, FiFileText } from 'react-icons/fi';

const ReviewSubmitStep = ({ formData, calculateEstimatedCost, onEdit }) => {
  const { institutionDetails, packageSelection, students, requirements } = formData;

  const therapyTypes = [
    { id: 'speech', title: 'Gamified Speech Therapy', price: 8000 },
    { id: 'hearing', title: 'Gamified Hearing Activities', price: 7000 },
    { id: 'sign_language', title: 'Sign Language Learning', price: 6000 }
  ];

  const getSelectedTherapies = () => {
    return packageSelection.therapyTypes.map(typeId => 
      therapyTypes.find(t => t.id === typeId)
    ).filter(Boolean);
  };

  const calculateDetailedCost = () => {
    const selectedTherapies = getSelectedTherapies();
    const studentsCount = students.length;
    const monthsMultiplier = packageSelection.packageDuration === '12_months' ? 12 :
                            packageSelection.packageDuration === '6_months' ? 6 : 3;
    
    // Base cost calculation
    const therapyCost = selectedTherapies.reduce((total, therapy) => total + therapy.price, 0);
    let totalCost = therapyCost * studentsCount * monthsMultiplier;
    
    // Volume discounts
    let discount = 0;
    if (studentsCount >= 50) discount = 0.3; // 30% discount
    else if (studentsCount >= 20) discount = 0.2; // 20% discount
    else if (studentsCount >= 10) discount = 0.1; // 10% discount
    
    const discountAmount = totalCost * discount;
    const discountedTotal = totalCost - discountAmount;
    
    // Duration discounts
    let durationDiscount = 0;
    if (packageSelection.packageDuration === '12_months') durationDiscount = 0.2;
    else if (packageSelection.packageDuration === '6_months') durationDiscount = 0.1;
    
    const durationDiscountAmount = discountedTotal * durationDiscount;
    const finalTotal = discountedTotal - durationDiscountAmount;
    
    return {
      baseTotal: totalCost,
      volumeDiscount: discountAmount,
      durationDiscount: durationDiscountAmount,
      finalTotal: Math.round(finalTotal)
    };
  };

  const costBreakdown = calculateDetailedCost();

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <FiDollarSign className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Review & Submit</h3>
        <p className="text-gray-600">Review your application details and submit for approval</p>
      </div>

      {/* Institution Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiUsers className="w-5 h-5 mr-2 text-blue-600" />
            Institution Details
          </h4>
          <button
            onClick={() => onEdit(1)}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
          >
            <FiEdit className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Institution:</span>
            <span className="ml-2 text-gray-900">{institutionDetails.institutionName}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Type:</span>
            <span className="ml-2 text-gray-900">{institutionDetails.institutionType}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Contact Person:</span>
            <span className="ml-2 text-gray-900">{institutionDetails.contactPerson}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Location:</span>
            <span className="ml-2 text-gray-900">{institutionDetails.district}, {institutionDetails.province}</span>
          </div>
        </div>
      </div>

      {/* Package Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiSettings className="w-5 h-5 mr-2 text-green-600" />
            Selected Package
          </h4>
          <button
            onClick={() => onEdit(2)}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
          >
            <FiEdit className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-gray-700">Therapy Types:</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {getSelectedTherapies().map((therapy, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {therapy.title}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Duration:</span>
              <span className="ml-2 text-gray-900">
                {packageSelection.packageDuration?.replace('_', ' ').replace('months', ' months')}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Frequency:</span>
              <span className="ml-2 text-gray-900">
                {packageSelection.sessionFrequency?.replace('_', ' ')} sessions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Students Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiUsers className="w-5 h-5 mr-2 text-purple-600" />
            Students ({students.length})
          </h4>
          <button
            onClick={() => onEdit(3)}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
          >
            <FiEdit className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
        {students.length > 0 ? (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {students.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-medium text-gray-900">{student.name}</span>
                  <span className="text-gray-600 text-sm ml-2">
                    (Age: {student.age}, Condition: {student.condition})
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No students added</p>
        )}
      </div>

      {/* Additional Services */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiFileText className="w-5 h-5 mr-2 text-orange-600" />
            Additional Services
          </h4>
          <button
            onClick={() => onEdit(4)}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
          >
            <FiEdit className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
        <div className="space-y-2">
          {Object.entries(requirements).map(([key, value]) => {
            if (key === 'additionalNotes' || !value) return null;
            const serviceNames = {
              staffTraining: 'Staff Training Program',
              progressReporting: 'Advanced Progress Reporting',
              customization: 'Platform Customization',
              technicalSupport: 'Priority Technical Support',
              onSiteVisits: 'On-Site Support Visits'
            };
            return (
              <div key={key} className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-gray-900">{serviceNames[key]}</span>
              </div>
            );
          })}
          {!Object.entries(requirements).some(([key, value]) => key !== 'additionalNotes' && value) && (
            <p className="text-gray-600">No additional services selected</p>
          )}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">Cost Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-blue-700">Base Package Cost:</span>
            <span className="font-medium text-blue-900">LKR {costBreakdown.baseTotal.toLocaleString()}</span>
          </div>
          {costBreakdown.volumeDiscount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Volume Discount ({students.length >= 50 ? '30%' : students.length >= 20 ? '20%' : '10%'}):</span>
              <span className="font-medium">-LKR {costBreakdown.volumeDiscount.toLocaleString()}</span>
            </div>
          )}
          {costBreakdown.durationDiscount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Duration Discount ({packageSelection.packageDuration === '12_months' ? '20%' : '10%'}):</span>
              <span className="font-medium">-LKR {costBreakdown.durationDiscount.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-blue-200 pt-3 flex justify-between">
            <span className="font-semibold text-blue-900">Total Estimated Cost:</span>
            <span className="font-bold text-xl text-blue-900">LKR {costBreakdown.finalTotal.toLocaleString()}</span>
          </div>
          <div className="text-sm text-blue-700">
            <p>• Social Skills Development included at no extra cost</p>
            <p>• Final pricing subject to negotiation and contract terms</p>
            <p>• Payment plans available for 12-month packages</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Terms & Conditions</h4>
        <div className="space-y-2 text-sm text-yellow-800">
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-2 rounded border-yellow-300" required />
            <span>I agree to the terms and conditions of the enterprise package agreement</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-2 rounded border-yellow-300" required />
            <span>I confirm that all information provided is accurate and complete</span>
          </label>
          <label className="flex items-start">
            <input type="checkbox" className="mt-1 mr-2 rounded border-yellow-300" required />
            <span>I authorize Kleara to contact our institution regarding this application</span>
          </label>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">What happens next?</h4>
        <div className="text-sm text-green-800 space-y-1">
          <p>1. Our team will review your application within 2-3 business days</p>
          <p>2. We'll contact you to discuss customization and finalize pricing</p>
          <p>3. Upon agreement, we'll begin the implementation process</p>
          <p>4. Your institution will receive full training and support</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;

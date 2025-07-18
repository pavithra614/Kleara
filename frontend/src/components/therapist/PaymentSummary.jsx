import React from 'react';
import { FiDollarSign, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';

const PaymentSummary = ({ therapist, bookingData }) => {
  const basePrice = 25000; // LKR 25,000 for 30 hours/month
  const serviceFee = 0; // No service fee for prototype
  const total = basePrice + serviceFee;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FiDollarSign className="w-5 h-5 mr-2 text-green-600" />
        Payment Summary
      </h3>

      {/* Therapist Info */}
      <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
        <img
          src={therapist.image}
          alt={therapist.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-gray-900">{therapist.name}</h4>
          <p className="text-sm text-gray-600">{therapist.specialty}</p>
        </div>
      </div>

      {/* Package Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiClock className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-gray-700">Monthly Package</span>
          </div>
          <span className="font-medium">30 hours</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiCalendar className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-gray-700">Duration</span>
          </div>
          <span className="font-medium">1 month</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Session Type</span>
          <span className="font-medium capitalize">{bookingData?.sessionType || 'Individual'}</span>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Base Price (30 hours)</span>
          <span className="font-medium">LKR {basePrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Service Fee</span>
          <span className="font-medium">LKR {serviceFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount</span>
          <span>LKR 0</span>
        </div>
        <div className="border-t pt-2 flex justify-between">
          <span className="font-semibold text-gray-900">Total Amount</span>
          <span className="font-bold text-lg text-blue-600">LKR {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Benefits */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2 flex items-center">
          <FiCheckCircle className="w-4 h-4 mr-2" />
          What's Included
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 30 hours of one-on-one therapy sessions</li>
          <li>• Unlimited chat and video messaging</li>
          <li>• Progress tracking and reports</li>
          <li>• Flexible scheduling</li>
          <li>• 24/7 support access</li>
        </ul>
      </div>

      {/* Payment Security */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 Secure payment processing • 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default PaymentSummary;

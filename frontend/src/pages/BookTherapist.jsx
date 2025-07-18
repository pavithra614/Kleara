import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock, 
  FiDollarSign, 
  FiCreditCard,
  FiCheck,
  FiUser,
  FiMail,
  FiPhone
} from 'react-icons/fi';

const BookTherapist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [therapist, setTherapist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    selectedDate: '',
    selectedTime: '',
    sessionType: 'individual',
    duration: '30-hours-monthly',
    paymentMethod: 'card',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      emergencyContact: '',
      medicalHistory: ''
    },
    paymentInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    }
  });

  // Mock therapist data
  const mockTherapist = {
    id: parseInt(id),
    name: id === '1' ? 'Dr. Shanika Madumali' :
          id === '2' ? 'Dr. Umali Silva' :
          id === '3' ? 'Dr. Pooja Jayanetti' :
          'Dr. Randuni Silva',
    specialty: id === '1' ? 'Speech-Language Pathology' :
              id === '2' ? 'Hearing & Auditory Processing' :
              id === '3' ? 'Sign Language Therapy' :
              'Communication Disorders',
    image: '/speech_therapy.jpg',
    price: 25000,
    availability: id === '3' ? 'Busy' : 'Available'
  };

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  // Generate next 14 days for booking
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTherapist(mockTherapist);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (section, field, value) => {
    setBookingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return bookingData.selectedDate && bookingData.selectedTime;
      case 2:
        return bookingData.personalInfo.fullName && 
               bookingData.personalInfo.email && 
               bookingData.personalInfo.phone;
      case 3:
        return bookingData.paymentInfo.cardNumber && 
               bookingData.paymentInfo.expiryDate && 
               bookingData.paymentInfo.cvv && 
               bookingData.paymentInfo.cardholderName;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBooking = () => {
    // Simulate booking process
    console.log('Booking data:', bookingData);
    setCurrentStep(4); // Success step
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(`/therapists/${id}/profile`)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Profile
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Book Session</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep || currentStep === 4 ? <FiCheck className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {currentStep === 1 && 'Select Date & Time'}
                {currentStep === 2 && 'Personal Information'}
                {currentStep === 3 && 'Payment Details'}
                {currentStep === 4 && 'Booking Confirmed'}
              </p>
            </div>
          </div>
        </div>

        {/* Therapist Info Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{therapist.name}</h3>
              <p className="text-blue-600">{therapist.specialty}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-gray-600 mb-1">
                <FiDollarSign className="w-4 h-4 mr-1" />
                <span className="font-medium">LKR {therapist.price.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500">30 hours/month</p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>
              
              {/* Session Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    bookingData.sessionType === 'individual'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDirectChange('sessionType', 'individual')}>
                    <h4 className="font-medium text-gray-900">Individual Session</h4>
                    <p className="text-sm text-gray-600">One-on-one therapy session</p>
                  </div>
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    bookingData.sessionType === 'group'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDirectChange('sessionType', 'group')}>
                    <h4 className="font-medium text-gray-900">Group Session</h4>
                    <p className="text-sm text-gray-600">Small group therapy (2-4 people)</p>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {availableDates.map(date => {
                    const dateObj = new Date(date);
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNumber = dateObj.getDate();
                    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
                    
                    return (
                      <button
                        key={date}
                        onClick={() => handleDirectChange('selectedDate', date)}
                        className={`p-3 border-2 rounded-lg text-center transition-colors ${
                          bookingData.selectedDate === date
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-xs text-gray-500">{dayName}</div>
                        <div className="font-medium text-gray-900">{dayNumber}</div>
                        <div className="text-xs text-gray-500">{monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => handleDirectChange('selectedTime', time)}
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        bookingData.selectedTime === time
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FiClock className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-sm font-medium">{time}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={bookingData.personalInfo.fullName}
                      onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={bookingData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={bookingData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    value={bookingData.personalInfo.emergencyContact}
                    onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Emergency contact number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical History (Optional)</label>
                  <textarea
                    value={bookingData.personalInfo.medicalHistory}
                    onChange={(e) => handleInputChange('personalInfo', 'medicalHistory', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any relevant medical history or conditions..."
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
              
              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Package (30 hours)</span>
                    <span className="font-medium">LKR {therapist.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">LKR 0</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">LKR {therapist.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                  <input
                    type="text"
                    value={bookingData.paymentInfo.cardholderName}
                    onChange={(e) => handleInputChange('paymentInfo', 'cardholderName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Name on card"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                  <div className="relative">
                    <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={bookingData.paymentInfo.cardNumber}
                      onChange={(e) => handleInputChange('paymentInfo', 'cardNumber', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                  <input
                    type="text"
                    value={bookingData.paymentInfo.expiryDate}
                    onChange={(e) => handleInputChange('paymentInfo', 'expiryDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                  <input
                    type="text"
                    value={bookingData.paymentInfo.cvv}
                    onChange={(e) => handleInputChange('paymentInfo', 'cvv', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your therapy session has been successfully booked with {therapist.name}.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
                <h3 className="font-medium text-gray-900 mb-3">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(bookingData.selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingData.selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{bookingData.sessionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">LKR {therapist.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/my-therapist')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Go to My Therapist Dashboard
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={handlePrevStep}
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
                onClick={currentStep === 3 ? handleBooking : handleNextStep}
                disabled={!validateStep(currentStep)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  validateStep(currentStep)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === 3 ? 'Confirm Booking' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTherapist;

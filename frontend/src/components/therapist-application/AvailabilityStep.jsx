import React from 'react';
import { FiCalendar, FiClock, FiInfo } from 'react-icons/fi';

const AvailabilityStep = ({ formData, handleInputChange, handleMultiSelectChange }) => {
  const { availability } = formData;

  const daysOfWeek = [
    { key: 'Monday', label: 'Monday' },
    { key: 'Tuesday', label: 'Tuesday' },
    { key: 'Wednesday', label: 'Wednesday' },
    { key: 'Thursday', label: 'Thursday' },
    { key: 'Friday', label: 'Friday' },
    { key: 'Saturday', label: 'Saturday' },
    { key: 'Sunday', label: 'Sunday' }
  ];

  const timeSlotOptions = [
    { start: '08:00', end: '12:00', label: 'Morning (8:00 AM - 12:00 PM)' },
    { start: '12:00', end: '17:00', label: 'Afternoon (12:00 PM - 5:00 PM)' },
    { start: '17:00', end: '21:00', label: 'Evening (5:00 PM - 9:00 PM)' },
    { start: '08:00', end: '17:00', label: 'Full Day (8:00 AM - 5:00 PM)' },
    { start: '09:00', end: '18:00', label: 'Business Hours (9:00 AM - 6:00 PM)' }
  ];

  const handleTimeSlotChange = (start, end) => {
    handleInputChange('availability', 'timeSlots', { start, end });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FiCalendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900">Availability</h3>
        <p className="text-gray-600">Set your preferred working days and hours</p>
      </div>

      {/* Days Available */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Days Available <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-4">Select the days you are available to conduct therapy sessions</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {daysOfWeek.map(day => (
            <label key={day.key} className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              availability.daysAvailable.includes(day.key)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="checkbox"
                checked={availability.daysAvailable.includes(day.key)}
                onChange={() => handleMultiSelectChange('availability', 'daysAvailable', day.key)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="font-medium">{day.label.slice(0, 3)}</div>
                <div className="text-xs">{day.label}</div>
              </div>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selected: {availability.daysAvailable.length} day(s). Select at least 1 day.
        </p>
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Time Slots <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-4">Choose your preferred working hours</p>

        {/* Quick Time Slot Options */}
        <div className="space-y-3 mb-4">
          <p className="text-sm font-medium text-gray-700">Quick Options:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timeSlotOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleTimeSlotChange(option.start, option.end)}
                className={`p-3 text-left border-2 rounded-lg transition-colors ${
                  availability.timeSlots.start === option.start && availability.timeSlots.end === option.end
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <FiClock className="w-4 h-4 mr-2" />
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Time Range */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Or set custom hours:</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={availability.timeSlots.start}
                onChange={(e) => handleInputChange('availability', 'timeSlots', {
                  ...availability.timeSlots,
                  start: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={availability.timeSlots.end}
                onChange={(e) => handleInputChange('availability', 'timeSlots', {
                  ...availability.timeSlots,
                  end: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Current Selection Display */}
        {availability.timeSlots.start && availability.timeSlots.end && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <FiClock className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">
                Selected: {availability.timeSlots.start} - {availability.timeSlots.end}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Additional Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Availability Notes
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any specific availability preferences, break times, or scheduling notes..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional: Mention any specific scheduling preferences or constraints
        </p>
      </div>

      {/* Flexibility Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Flexibility Options</label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Available for emergency sessions (with advance notice)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Willing to work occasional weekends
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Available for online sessions outside regular hours
            </span>
          </label>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FiInfo className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Important Information:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• You can update your availability after approval</li>
              <li>• Consistent availability helps build client relationships</li>
              <li>• Emergency sessions may be requested with advance notice</li>
              <li>• All sessions are scheduled through our platform</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scheduling Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Scheduling Benefits:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Automated scheduling system reduces administrative work</li>
          <li>• Clients can book sessions based on your availability</li>
          <li>• Flexible rescheduling options for both parties</li>
          <li>• Reminder notifications for upcoming sessions</li>
        </ul>
      </div>
    </div>
  );
};

export default AvailabilityStep;

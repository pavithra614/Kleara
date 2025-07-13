import { FiSmartphone, FiUserCheck, FiCheckCircle, FiFileText } from 'react-icons/fi';

const TherapyMethodToggle = ({ therapyMethod, onMethodChange, onViewHealthReports }) => {
  const handleTherapyMethodToggle = () => {
    const newMethod = therapyMethod === 'self-guided' ? 'therapist-supervised' : 'self-guided';
    onMethodChange(newMethod);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">Therapy Method</h2>
            <p className="text-sm text-gray-600">Choose how you want to conduct your therapy session</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Health Reports Button - Only show in therapist-supervised mode */}
            {therapyMethod === 'therapist-supervised' && (
              <button
                onClick={onViewHealthReports}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiFileText className="w-4 h-4 mr-2" />
                View Health Reports
              </button>
            )}

            <div className="flex items-center space-x-6">
              {/* Method Options */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onMethodChange('self-guided')}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    therapyMethod === 'self-guided'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiSmartphone className="w-4 h-4" />
                  <span className="text-sm font-medium">Self-Guided Practice</span>
                  {therapyMethod === 'self-guided' && <FiCheckCircle className="w-4 h-4 text-blue-600" />}
                </button>

                <button
                  onClick={() => onMethodChange('therapist-supervised')}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    therapyMethod === 'therapist-supervised'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiUserCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">Therapist Supervised</span>
                  {therapyMethod === 'therapist-supervised' && <FiCheckCircle className="w-4 h-4 text-green-600" />}
                </button>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${therapyMethod === 'self-guided' ? 'text-blue-600' : 'text-gray-500'}`}>
                  Self-Guided
                </span>
                <button
                  onClick={handleTherapyMethodToggle}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{
                    backgroundColor: therapyMethod === 'therapist-supervised' ? '#10b981' : '#3b82f6'
                  }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      therapyMethod === 'therapist-supervised' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${therapyMethod === 'therapist-supervised' ? 'text-green-600' : 'text-gray-500'}`}>
                  Supervised
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Method Description */}
        <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
          {therapyMethod === 'self-guided' ? (
            <div className="flex items-start space-x-3">
              <FiSmartphone className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Self-Guided Practice Mode</h3>
                <p className="text-sm text-gray-600">
                  Practice independently with AI assistance and automated feedback. Perfect for building confidence and routine practice sessions.
                  <span className="text-amber-600 font-medium"> Note: Health reports not available in this mode.</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-3">
              <FiUserCheck className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Therapist Supervised Mode</h3>
                <p className="text-sm text-gray-600">
                  Work directly with your therapist for personalized guidance, real-time feedback, and targeted interventions.
                  <span className="text-green-600 font-medium"> Health reports and verified progress tracking included.</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapyMethodToggle;

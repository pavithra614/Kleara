import { FiCheckCircle, FiClock, FiCircle } from 'react-icons/fi';

const VerificationProgress = ({ 
  currentStep, 
  totalSteps = 3, 
  stepLabels = ['Personal Information', 'Document Upload', 'Additional Details'],
  completedSteps = [],
  variant = 'default' // default, compact
}) => {
  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex + 1)) {
      return 'completed';
    } else if (stepIndex + 1 === currentStep) {
      return 'current';
    } else if (stepIndex + 1 < currentStep) {
      return 'completed';
    } else {
      return 'upcoming';
    }
  };

  const getStepIcon = (stepIndex) => {
    const status = getStepStatus(stepIndex);
    
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="w-4 h-4" />;
      case 'current':
        return <FiClock className="w-4 h-4" />;
      default:
        return <FiCircle className="w-4 h-4" />;
    }
  };

  const getStepClasses = (stepIndex) => {
    const status = getStepStatus(stepIndex);
    
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-600 text-white`;
      case 'current':
        return `${baseClasses} bg-blue-600 text-white`;
      default:
        return `${baseClasses} bg-gray-200 text-gray-600`;
    }
  };

  const getConnectorClasses = (stepIndex) => {
    const isCompleted = getStepStatus(stepIndex) === 'completed';
    return `w-16 h-1 mx-2 transition-all ${
      isCompleted ? 'bg-green-600' : 'bg-gray-200'
    }`;
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex items-center">
              <div className={getStepClasses(index)}>
                {getStepIcon(index)}
              </div>
              {index < totalSteps - 1 && (
                <div className={getConnectorClasses(index)} />
              )}
            </div>
          ))}
        </div>
        <div className="ml-4 text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div className={getStepClasses(index)}>
              {getStepIcon(index)}
            </div>
            {index < totalSteps - 1 && (
              <div className={getConnectorClasses(index)} />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-center">
        <div className="text-sm text-gray-600 text-center">
          <div className="font-medium">
            Step {currentStep} of {totalSteps}
          </div>
          {stepLabels[currentStep - 1] && (
            <div className="mt-1">
              {stepLabels[currentStep - 1]}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Start</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          <span>Finish</span>
        </div>
      </div>
    </div>
  );
};

export default VerificationProgress;

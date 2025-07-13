import { FiClock, FiCheckCircle, FiXCircle, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const VerificationStatusBadge = ({ 
  status, 
  size = 'medium', // small, medium, large
  showIcon = true,
  showText = true,
  className = ''
}) => {
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: FiClock,
        text: 'Under Review',
        colors: {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          border: 'border-amber-200',
          icon: 'text-amber-600'
        }
      },
      resubmitted: {
        icon: FiRefreshCw,
        text: 'Resubmitted',
        colors: {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          icon: 'text-blue-600'
        }
      },
      approved: {
        icon: FiCheckCircle,
        text: 'Approved',
        colors: {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-600'
        }
      },
      rejected: {
        icon: FiXCircle,
        text: 'Requires Attention',
        colors: {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: 'text-red-600'
        }
      },
      expired: {
        icon: FiAlertCircle,
        text: 'Expired',
        colors: {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-600'
        }
      }
    };

    return configs[status] || configs.pending;
  };

  const getSizeClasses = (size) => {
    const sizes = {
      small: {
        container: 'px-2 py-1 text-xs',
        icon: 'w-3 h-3',
        spacing: 'space-x-1'
      },
      medium: {
        container: 'px-3 py-1 text-sm',
        icon: 'w-4 h-4',
        spacing: 'space-x-2'
      },
      large: {
        container: 'px-4 py-2 text-base',
        icon: 'w-5 h-5',
        spacing: 'space-x-2'
      }
    };

    return sizes[size] || sizes.medium;
  };

  const config = getStatusConfig(status);
  const sizeClasses = getSizeClasses(size);
  const IconComponent = config.icon;

  return (
    <span 
      className={`
        inline-flex items-center font-medium rounded-full border
        ${sizeClasses.container}
        ${sizeClasses.spacing}
        ${config.colors.bg}
        ${config.colors.text}
        ${config.colors.border}
        ${className}
      `}
    >
      {showIcon && (
        <IconComponent className={`${sizeClasses.icon} ${config.colors.icon}`} />
      )}
      {showText && <span>{config.text}</span>}
    </span>
  );
};

export default VerificationStatusBadge;

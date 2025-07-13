import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle, 
  FiFileText, 
  FiMail, 
  FiPhone,
  FiRefreshCw,
  FiHome,
  FiEdit
} from 'react-icons/fi';

const VerificationStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationData, setVerificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock verification statuses for prototype
  const mockStatuses = {
    pending: {
      status: 'pending',
      submissionId: 'VER-1234567890',
      submittedDate: '2024-01-15',
      estimatedReview: '2-3 business days',
      reviewerNotes: null,
      nextSteps: [
        'Your documents are being reviewed by our verification team',
        'You will receive an email notification once review is complete',
        'Continue using self-guided mode while waiting',
        'Contact support if you have questions'
      ]
    },
    approved: {
      status: 'approved',
      submissionId: 'VER-1234567890',
      submittedDate: '2024-01-15',
      approvedDate: '2024-01-17',
      reviewerNotes: 'All documents verified successfully. Welcome to therapist-guided mode!',
      nextSteps: [
        'You now have access to therapist-guided mode',
        'Schedule your first session with a therapist',
        'Access health reports and progress tracking',
        'Explore advanced therapy features'
      ]
    },
    rejected: {
      status: 'rejected',
      submissionId: 'VER-1234567890',
      submittedDate: '2024-01-15',
      rejectedDate: '2024-01-17',
      reviewerNotes: 'Primary identification document is unclear. Please resubmit with a clearer image.',
      nextSteps: [
        'Review the feedback provided below',
        'Prepare clearer document images',
        'Resubmit your verification application',
        'Contact support if you need assistance'
      ]
    },
    resubmitted: {
      status: 'resubmitted',
      submissionId: 'VER-1234567891',
      submittedDate: '2024-01-18',
      estimatedReview: '1-2 business days',
      reviewerNotes: 'Thank you for resubmitting. Your application is being reviewed with priority.',
      nextSteps: [
        'Your resubmitted documents are being reviewed',
        'Priority review typically takes 1-2 business days',
        'You will receive an email notification once complete',
        'Continue using self-guided mode while waiting'
      ]
    }
  };

  useEffect(() => {
    // Simulate loading and fetching verification status
    setTimeout(() => {
      // Check if we have state from navigation (just submitted)
      if (location.state?.submitted) {
        setVerificationData({
          ...mockStatuses.pending,
          submissionId: location.state.submissionId,
          estimatedReview: location.state.estimatedReview
        });
      } else {
        // For demo purposes, randomly show different statuses
        const statuses = Object.keys(mockStatuses);
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setVerificationData(mockStatuses[randomStatus]);
      }
      setIsLoading(false);
    }, 1500);
  }, [location.state]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
      case 'resubmitted':
        return <FiClock className="w-8 h-8 text-amber-500" />;
      case 'approved':
        return <FiCheckCircle className="w-8 h-8 text-green-500" />;
      case 'rejected':
        return <FiXCircle className="w-8 h-8 text-red-500" />;
      default:
        return <FiAlertCircle className="w-8 h-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
      case 'resubmitted':
        return 'amber';
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Under Review';
      case 'resubmitted':
        return 'Resubmitted - Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Requires Attention';
      default:
        return 'Unknown';
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleResubmit = () => {
    navigate('/age-verification');
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading verification status...</p>
        </div>
      </div>
    );
  }

  if (!verificationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Verification Found</h2>
          <p className="text-gray-600 mb-6">You haven't submitted a verification request yet.</p>
          <button
            onClick={() => navigate('/age-verification')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Verification
          </button>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(verificationData.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Status</h1>
          <p className="text-lg text-gray-600">
            Track your therapist-guided mode verification progress
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {getStatusIcon(verificationData.status)}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {getStatusText(verificationData.status)}
                </h2>
                <p className="text-gray-600">Submission ID: {verificationData.submissionId}</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Refresh status"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-lg border mb-6 bg-${statusColor}-50 border-${statusColor}-200`}>
            <div className="flex items-start space-x-3">
              {getStatusIcon(verificationData.status)}
              <div className="flex-1">
                <h3 className={`font-semibold text-${statusColor}-900 mb-1`}>
                  {getStatusText(verificationData.status)}
                </h3>
                {verificationData.status === 'pending' && (
                  <p className={`text-${statusColor}-800 text-sm`}>
                    Your verification is being reviewed. Estimated completion: {verificationData.estimatedReview}
                  </p>
                )}
                {verificationData.status === 'approved' && (
                  <p className={`text-${statusColor}-800 text-sm`}>
                    Congratulations! You now have access to therapist-guided mode and all its features.
                  </p>
                )}
                {verificationData.status === 'rejected' && (
                  <p className={`text-${statusColor}-800 text-sm`}>
                    Your verification needs attention. Please review the feedback and resubmit.
                  </p>
                )}
                {verificationData.status === 'resubmitted' && (
                  <p className={`text-${statusColor}-800 text-sm`}>
                    Thank you for resubmitting. Your application is being reviewed with priority.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Application Submitted</p>
                  <p className="text-sm text-gray-600">{verificationData.submittedDate}</p>
                </div>
              </div>
              
              {verificationData.approvedDate && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Verification Approved</p>
                    <p className="text-sm text-gray-600">{verificationData.approvedDate}</p>
                  </div>
                </div>
              )}
              
              {verificationData.rejectedDate && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Verification Requires Attention</p>
                    <p className="text-sm text-gray-600">{verificationData.rejectedDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reviewer Notes */}
          {verificationData.reviewerNotes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Reviewer Notes</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700">{verificationData.reviewerNotes}</p>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h3>
            <ul className="space-y-2">
              {verificationData.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{step}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiHome className="w-4 h-4 mr-2" />
            Go to Dashboard
          </button>
          
          {verificationData.status === 'rejected' && (
            <button
              onClick={handleResubmit}
              className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <FiEdit className="w-4 h-4 mr-2" />
              Resubmit Application
            </button>
          )}
          
          <button
            onClick={() => window.open('mailto:support@kleara.com')}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiMail className="w-4 h-4 mr-2" />
            Contact Support
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Common Questions:</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• How long does verification take?</li>
                <li>• What documents are accepted?</li>
                <li>• Can I use self-guided mode while waiting?</li>
                <li>• How do I update my information?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Contact Information:</h4>
              <div className="space-y-2 text-blue-800">
                <div className="flex items-center space-x-2">
                  <FiMail className="w-4 h-4" />
                  <span>support@kleara.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiPhone className="w-4 h-4" />
                  <span>1-800-KLEARA-1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;

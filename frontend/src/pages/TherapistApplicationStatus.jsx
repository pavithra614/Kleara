import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiClock, 
  FiCheck, 
  FiX, 
  FiEye,
  FiDownload,
  FiMessageCircle,
  FiRefreshCw,
  FiAlertCircle
} from 'react-icons/fi';

const TherapistApplicationStatus = () => {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock application data
  const mockApplicationData = {
    applicationId: 'TH-2024-001',
    submittedDate: '2024-01-15',
    status: 'under_review', // pending, under_review, approved, rejected, needs_revision
    currentStep: 'Document Verification',
    progress: 60,
    estimatedCompletion: '2024-01-22',
    applicantName: 'Namith Senanayake',
    email: 'namith.senanayake@email.com',
    phone: '+94 77 123 4567',
    reviewSteps: [
      {
        step: 'Application Submitted',
        status: 'completed',
        date: '2024-01-15',
        description: 'Application successfully submitted'
      },
      {
        step: 'Initial Review',
        status: 'completed',
        date: '2024-01-16',
        description: 'Basic information verified'
      },
      {
        step: 'Document Verification',
        status: 'in_progress',
        date: null,
        description: 'Verifying uploaded documents and credentials'
      },
      {
        step: 'Background Check',
        status: 'pending',
        date: null,
        description: 'Police clearance and reference verification'
      },
      {
        step: 'Final Approval',
        status: 'pending',
        date: null,
        description: 'Final review and approval by admin team'
      }
    ],
    documents: [
      { name: 'National ID', status: 'verified', feedback: null },
      { name: 'Degree Certificate', status: 'verified', feedback: null },
      { name: 'Experience Letter', status: 'needs_revision', feedback: 'Please provide a more recent experience letter from your current employer' },
      { name: 'Police Clearance', status: 'pending', feedback: null },
      { name: 'Profile Photo', status: 'verified', feedback: null }
    ],
    adminFeedback: [
      {
        date: '2024-01-17',
        message: 'Your application is progressing well. Please upload a more recent experience letter as requested.',
        type: 'info'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplicationData(mockApplicationData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'verified':
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
      case 'under_review':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'needs_revision':
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'verified':
      case 'approved':
        return <FiCheck className="w-5 h-5" />;
      case 'in_progress':
      case 'under_review':
        return <FiRefreshCw className="w-5 h-5 animate-spin" />;
      case 'pending':
        return <FiClock className="w-5 h-5" />;
      case 'needs_revision':
      case 'rejected':
        return <FiX className="w-5 h-5" />;
      default:
        return <FiClock className="w-5 h-5" />;
    }
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application status...</p>
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
              onClick={() => navigate('/home')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Application Overview */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Application Overview</h2>
              <p className="text-gray-600">Track your therapist application progress</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(applicationData.status)}`}>
              <div className="flex items-center space-x-2">
                {getStatusIcon(applicationData.status)}
                <span>{formatStatus(applicationData.status)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">#{applicationData.applicationId}</div>
              <div className="text-sm text-gray-600">Application ID</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{applicationData.progress}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {new Date(applicationData.estimatedCompletion).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">Est. Completion</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Current Step: {applicationData.currentStep}</span>
              <span>{applicationData.progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${applicationData.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Applicant Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Name:</span>
              <span className="ml-2 font-medium">{applicationData.applicantName}</span>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>
              <span className="ml-2 font-medium">{applicationData.email}</span>
            </div>
            <div>
              <span className="text-gray-500">Submitted:</span>
              <span className="ml-2 font-medium">{new Date(applicationData.submittedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Review Steps */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Review Process</h3>
          <div className="space-y-4">
            {applicationData.reviewSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{step.step}</h4>
                    {step.date && (
                      <span className="text-sm text-gray-500">{new Date(step.date).toLocaleDateString()}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Status */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Document Status</h3>
          <div className="space-y-4">
            {applicationData.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(doc.status)}`}>
                    {getStatusIcon(doc.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
                    {doc.feedback && (
                      <p className="text-sm text-red-600 mt-1">{doc.feedback}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {formatStatus(doc.status)}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <FiEye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Feedback */}
        {applicationData.adminFeedback.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Admin Feedback</h3>
            <div className="space-y-4">
              {applicationData.adminFeedback.map((feedback, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <FiMessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900">Admin Message</span>
                      <span className="text-sm text-blue-600">{new Date(feedback.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-blue-800">{feedback.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
            <FiRefreshCw className="w-5 h-5 mr-2" />
            Refresh Status
          </button>
          <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
            <FiDownload className="w-5 h-5 mr-2" />
            Download Application
          </button>
          <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
            <FiMessageCircle className="w-5 h-5 mr-2" />
            Contact Support
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <FiAlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-2">Need Help?</h4>
              <p className="text-sm text-yellow-800 mb-3">
                If you have questions about your application or need to update any information, please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 text-sm">
                <span className="text-yellow-700">Email: support@kleara.com</span>
                <span className="text-yellow-700">Phone: +94 11 123 4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistApplicationStatus;

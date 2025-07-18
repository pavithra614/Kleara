import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiEye, 
  FiCheck, 
  FiX, 
  FiClock,
  FiDownload,
  FiMessageCircle,
  FiFilter,
  FiSearch,
  FiUser,
  FiFileText
} from 'react-icons/fi';

const AdminTherapistReview = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState({ isOpen: false, action: null });
  const [reviewComment, setReviewComment] = useState('');

  // Mock applications data
  const mockApplications = [
    {
      id: 'TH-2024-001',
      applicantName: 'Namith Senanayake',
      email: 'namith.senanayake@email.com',
      phone: '+94 77 123 4567',
      submittedDate: '2024-01-15',
      status: 'under_review',
      qualification: 'PhD in Speech-Language Pathology',
      experience: '8 years',
      location: 'Colombo',
      progress: 60,
      documents: {
        nationalId: { status: 'verified', name: 'National_ID.pdf' },
        degree: { status: 'verified', name: 'PhD_Certificate.pdf' },
        experience: { status: 'needs_revision', name: 'Experience_Letter.pdf' },
        police: { status: 'pending', name: 'Police_Clearance.pdf' },
        photo: { status: 'verified', name: 'Profile_Photo.jpg' }
      }
    },
    {
      id: 'TH-2024-002',
      applicantName: 'Dr. Umali Silva',
      email: 'umali.silva@email.com',
      phone: '+94 71 234 5678',
      submittedDate: '2024-01-18',
      status: 'pending',
      qualification: 'MSc in Audiology',
      experience: '12 years',
      location: 'Kandy',
      progress: 100,
      documents: {
        nationalId: { status: 'verified', name: 'National_ID.pdf' },
        degree: { status: 'verified', name: 'MSc_Certificate.pdf' },
        experience: { status: 'verified', name: 'Experience_Letters.pdf' },
        police: { status: 'verified', name: 'Police_Clearance.pdf' },
        photo: { status: 'verified', name: 'Profile_Photo.jpg' }
      }
    },
    {
      id: 'TH-2024-003',
      applicantName: 'Dr. Pooja Jayanetti',
      email: 'pooja.jayanetti@email.com',
      phone: '+94 76 345 6789',
      submittedDate: '2024-01-20',
      status: 'approved',
      qualification: 'MA in Deaf Studies',
      experience: '6 years',
      location: 'Galle',
      progress: 100,
      documents: {
        nationalId: { status: 'verified', name: 'National_ID.pdf' },
        degree: { status: 'verified', name: 'MA_Certificate.pdf' },
        experience: { status: 'verified', name: 'Experience_Letters.pdf' },
        police: { status: 'verified', name: 'Police_Clearance.pdf' },
        photo: { status: 'verified', name: 'Profile_Photo.jpg' }
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplications(mockApplications);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-100';
      case 'under_review':
        return 'text-blue-700 bg-blue-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'rejected':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FiCheck className="w-4 h-4" />;
      case 'under_review':
        return <FiClock className="w-4 h-4" />;
      case 'pending':
        return <FiClock className="w-4 h-4" />;
      case 'rejected':
        return <FiX className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleReviewAction = (action) => {
    setReviewModal({ isOpen: true, action });
  };

  const submitReview = () => {
    // Here you would submit the review to the API
    console.log('Review submitted:', {
      applicationId: selectedApplication.id,
      action: reviewModal.action,
      comment: reviewComment
    });
    
    // Update the application status
    setApplications(prev => prev.map(app => 
      app.id === selectedApplication.id 
        ? { ...app, status: reviewModal.action === 'approve' ? 'approved' : 'rejected' }
        : app
    ));
    
    setReviewModal({ isOpen: false, action: null });
    setReviewComment('');
    setSelectedApplication(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
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
              onClick={() => navigate('/admin')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Admin Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Therapist Applications</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredApplications.length} of {applications.length} applications
            </p>
            <div className="flex space-x-4 text-sm">
              <span className="text-yellow-600">Pending: {applications.filter(a => a.status === 'pending').length}</span>
              <span className="text-blue-600">Under Review: {applications.filter(a => a.status === 'under_review').length}</span>
              <span className="text-green-600">Approved: {applications.filter(a => a.status === 'approved').length}</span>
              <span className="text-red-600">Rejected: {applications.filter(a => a.status === 'rejected').length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all ${
                    selectedApplication?.id === application.id
                      ? 'ring-2 ring-blue-500 border-blue-200'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{application.applicantName}</h3>
                        <p className="text-sm text-gray-600">{application.id}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="capitalize">{application.status.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Qualification:</span>
                      <p className="font-medium">{application.qualification}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Experience:</span>
                      <p className="font-medium">{application.experience}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <p className="font-medium">{application.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Submitted:</span>
                      <p className="font-medium">{new Date(application.submittedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{application.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${application.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Application Details</h3>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <FiDownload className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-500">Applicant Name</label>
                    <p className="font-medium">{selectedApplication.applicantName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Qualification</label>
                    <p className="font-medium">{selectedApplication.qualification}</p>
                  </div>
                </div>

                {/* Documents Status */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Documents</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedApplication.documents).map(([key, doc]) => (
                      <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status.replace('_', ' ')}
                          </span>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <FiEye className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedApplication.status !== 'approved' && selectedApplication.status !== 'rejected' && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleReviewAction('approve')}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <FiCheck className="w-4 h-4 mr-2" />
                      Approve Application
                    </button>
                    <button
                      onClick={() => handleReviewAction('reject')}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <FiX className="w-4 h-4 mr-2" />
                      Reject Application
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <FiMessageCircle className="w-4 h-4 mr-2" />
                      Request Revision
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Application</h3>
                <p className="text-gray-600">Choose an application from the list to view details and take action.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {reviewModal.action === 'approve' ? 'Approve Application' : 'Reject Application'}
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to {reviewModal.action} this application? Please provide a comment.
            </p>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Add your comment here..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setReviewModal({ isOpen: false, action: null })}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  reviewModal.action === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {reviewModal.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTherapistReview;

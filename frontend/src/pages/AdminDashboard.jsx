import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiEye,
  FiDownload,
  FiFilter,
  FiSearch,
  FiRefreshCw,
  FiAlertTriangle,
  FiCalendar,
  FiUser
} from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [verificationRequests, setVerificationRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock verification requests for prototype
  const mockRequests = [
    {
      id: 'VER-1234567890',
      fullName: 'Alex Johnson',
      age: 16,
      email: 'alex.johnson@email.com',
      phone: '+1-555-0123',
      submittedDate: '2024-01-15',
      status: 'pending',
      documentType: 'government-id',
      isMinor: true,
      guardianName: 'Sarah Johnson',
      guardianEmail: 'sarah.johnson@email.com',
      reasonForTherapy: 'Social anxiety and communication difficulties',
      emergencyContact: 'Sarah Johnson',
      emergencyPhone: '+1-555-0124',
      documents: {
        primaryDocument: 'drivers_license.jpg',
        secondaryDocument: 'school_enrollment.pdf',
        guardianConsent: 'guardian_consent_signed.pdf'
      }
    },
    {
      id: 'VER-1234567891',
      fullName: 'Maria Garcia',
      age: 22,
      email: 'maria.garcia@email.com',
      phone: '+1-555-0125',
      submittedDate: '2024-01-14',
      status: 'approved',
      documentType: 'passport',
      isMinor: false,
      reasonForTherapy: 'Depression and anxiety management',
      emergencyContact: 'Carlos Garcia',
      emergencyPhone: '+1-555-0126',
      approvedDate: '2024-01-16',
      reviewerNotes: 'All documents verified successfully.',
      documents: {
        primaryDocument: 'passport.jpg',
        secondaryDocument: 'utility_bill.pdf'
      }
    },
    {
      id: 'VER-1234567892',
      fullName: 'David Chen',
      age: 19,
      email: 'david.chen@email.com',
      phone: '+1-555-0127',
      submittedDate: '2024-01-13',
      status: 'rejected',
      documentType: 'state-id',
      isMinor: false,
      reasonForTherapy: 'ADHD support and coping strategies',
      emergencyContact: 'Linda Chen',
      emergencyPhone: '+1-555-0128',
      rejectedDate: '2024-01-15',
      reviewerNotes: 'Primary ID document is blurry and unreadable. Please resubmit with clearer image.',
      documents: {
        primaryDocument: 'state_id_blurry.jpg',
        secondaryDocument: 'bank_statement.pdf'
      }
    },
    {
      id: 'VER-1234567893',
      fullName: 'Emma Wilson',
      age: 17,
      email: 'emma.wilson@email.com',
      phone: '+1-555-0129',
      submittedDate: '2024-01-16',
      status: 'pending',
      documentType: 'government-id',
      isMinor: true,
      guardianName: 'Robert Wilson',
      guardianEmail: 'robert.wilson@email.com',
      reasonForTherapy: 'Autism spectrum support and social skills development',
      emergencyContact: 'Robert Wilson',
      emergencyPhone: '+1-555-0130',
      documents: {
        primaryDocument: 'drivers_license.jpg',
        secondaryDocument: 'school_transcript.pdf',
        guardianConsent: 'guardian_consent_signed.pdf'
      }
    }
  ];

  useEffect(() => {
    // Simulate loading verification requests
    setTimeout(() => {
      setVerificationRequests(mockRequests);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredRequests = verificationRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const icons = {
      pending: <FiClock className="w-3 h-3" />,
      approved: <FiCheckCircle className="w-3 h-3" />,
      rejected: <FiXCircle className="w-3 h-3" />
    };

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${badges[status]}`}>
        {icons[status]}
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const handleApprove = (requestId) => {
    setVerificationRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved', approvedDate: new Date().toISOString().split('T')[0] }
          : req
      )
    );
    setSelectedRequest(null);
  };

  const handleReject = (requestId, notes) => {
    setVerificationRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              status: 'rejected', 
              rejectedDate: new Date().toISOString().split('T')[0],
              reviewerNotes: notes 
            }
          : req
      )
    );
    setSelectedRequest(null);
  };

  const getStats = () => {
    const total = verificationRequests.length;
    const pending = verificationRequests.filter(r => r.status === 'pending').length;
    const approved = verificationRequests.filter(r => r.status === 'approved').length;
    const rejected = verificationRequests.filter(r => r.status === 'rejected').length;
    
    return { total, pending, approved, rejected };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage therapist-guided mode verification requests</p>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to App
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FiUsers className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FiClock className="w-8 h-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FiCheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FiXCircle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiFilter className="w-4 h-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Requests</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <FiSearch className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <FiUser className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{request.fullName}</div>
                          <div className="text-sm text-gray-500">{request.email}</div>
                          <div className="text-xs text-gray-400">{request.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.age}</div>
                      {request.isMinor && (
                        <div className="flex items-center space-x-1 text-xs text-amber-600">
                          <FiAlertTriangle className="w-3 h-3" />
                          <span>Minor</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1 text-sm text-gray-900">
                        <FiCalendar className="w-3 h-3" />
                        <span>{request.submittedDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <FiEye className="w-4 h-4" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600">No verification requests match your current filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

// Request Detail Modal Component
const RequestDetailModal = ({ request, onClose, onApprove, onReject }) => {
  const [rejectNotes, setRejectNotes] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleReject = () => {
    if (rejectNotes.trim()) {
      onReject(request.id, rejectNotes);
      setRejectNotes('');
      setShowRejectForm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Verification Request Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiXCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Full Name:</span>
                <span className="ml-2 text-gray-900">{request.fullName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Age:</span>
                <span className="ml-2 text-gray-900">{request.age}</span>
                {request.isMinor && <span className="ml-2 text-amber-600">(Minor)</span>}
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-900">{request.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="ml-2 text-gray-900">{request.phone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Emergency Contact:</span>
                <span className="ml-2 text-gray-900">{request.emergencyContact}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Emergency Phone:</span>
                <span className="ml-2 text-gray-900">{request.emergencyPhone}</span>
              </div>
            </div>
          </div>

          {/* Guardian Information (if minor) */}
          {request.isMinor && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Guardian Name:</span>
                  <span className="ml-2 text-gray-900">{request.guardianName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Guardian Email:</span>
                  <span className="ml-2 text-gray-900">{request.guardianEmail}</span>
                </div>
              </div>
            </div>
          )}

          {/* Therapy Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Therapy Information</h3>
            <div className="text-sm">
              <span className="font-medium text-gray-700">Reason for Seeking Therapy:</span>
              <p className="mt-1 text-gray-900">{request.reasonForTherapy}</p>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Uploaded Documents</h3>
            <div className="space-y-2">
              {Object.entries(request.documents).map(([type, filename]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FiFileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {type.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-gray-600">{filename}</p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
                    <FiDownload className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reviewer Notes (if any) */}
          {request.reviewerNotes && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Previous Review Notes</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">{request.reviewerNotes}</p>
              </div>
            </div>
          )}

          {/* Reject Form */}
          {showRejectForm && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Rejection Reason</h3>
              <textarea
                value={rejectNotes}
                onChange={(e) => setRejectNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please provide detailed feedback for the applicant..."
              />
            </div>
          )}
        </div>

        {/* Actions */}
        {request.status === 'pending' && (
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            {showRejectForm ? (
              <>
                <button
                  onClick={() => setShowRejectForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectNotes.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm Rejection
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowRejectForm(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => onApprove(request.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

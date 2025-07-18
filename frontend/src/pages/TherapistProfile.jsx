import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiStar, 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiCalendar,
  FiAward,
  FiMessageCircle,
  FiVideo
} from 'react-icons/fi';

const TherapistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock therapist data (in real app, this would come from API)
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
    experience: id === '1' ? '8 years' :
                id === '2' ? '12 years' :
                id === '3' ? '6 years' :
                '15 years',
    rating: id === '1' ? 4.9 :
            id === '2' ? 4.8 :
            id === '3' ? 4.7 :
            4.9,
    reviews: id === '1' ? 127 :
             id === '2' ? 89 :
             id === '3' ? 156 :
             203,
    location: id === '1' ? 'Colombo' :
              id === '2' ? 'Kandy' :
              id === '3' ? 'Galle' :
              'Colombo',
    image: '/speech_therapy.jpg',
    price: 25000,
    availability: id === '3' ? 'Busy' : 'Available',
    languages: id === '1' ? ['English', 'Sinhala'] :
               id === '2' ? ['English', 'Sinhala', 'Tamil'] :
               id === '3' ? ['English', 'Sinhala', 'ASL'] :
               ['English', 'Sinhala'],
    description: id === '1' ? 'Dr. Shanika Madumali is a dedicated Speech-Language Pathologist with over 8 years of experience helping children and adults overcome communication challenges. She specializes in articulation disorders, language delays, and fluency issues.' :
                 id === '2' ? 'Dr. Umali Silva is an expert in auditory processing disorders and hearing rehabilitation with 12 years of experience. She provides comprehensive hearing assessments and therapy.' :
                 id === '3' ? 'Dr. Pooja Jayanetti specializes in sign language instruction and deaf/hard of hearing support. She has 6 years of experience in ASL and communication support.' :
                 'Dr. Randuni Silva provides comprehensive communication disorder treatment for all age groups with 15 years of extensive experience in the field.',
    qualifications: id === '1' ? [
      'PhD in Speech-Language Pathology - University of Colombo',
      'Licensed Speech-Language Pathologist',
      'SLMC Certified Clinical Competence',
      'Certified in PROMPT Therapy'
    ] : id === '2' ? [
      'MS in Audiology - University of Peradeniya',
      'Licensed Audiologist',
      'Board Certified in Audiology',
      'Hearing Aid Specialist Certification'
    ] : id === '3' ? [
      'MA in Deaf Studies - Gallaudet University',
      'ASL Interpreter Certification',
      'Licensed Speech-Language Pathologist',
      'Certified Deaf Interpreter'
    ] : [
      'PhD in Communication Sciences - University of Colombo',
      'Licensed Speech-Language Pathologist',
      'Clinical Fellowship Completed',
      'Board Certified in Communication Disorders'
    ],
    specializations: [
      'Articulation and Phonological Disorders',
      'Language Development Delays',
      'Stuttering and Fluency Disorders',
      'Voice Disorders',
      'Swallowing Difficulties'
    ],
    workingHours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 3:00 PM',
      saturday: '10:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    reviews: [
      {
        id: 1,
        name: 'Priya M.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Dr. Johnson has been amazing with my 6-year-old son. His speech has improved dramatically over the past 3 months.'
      },
      {
        id: 2,
        name: 'Rajesh K.',
        rating: 5,
        date: '2024-01-10',
        comment: 'Professional, patient, and very knowledgeable. Highly recommend for anyone needing speech therapy.'
      },
      {
        id: 3,
        name: 'Amara S.',
        rating: 4,
        date: '2024-01-05',
        comment: 'Great therapist with excellent communication skills. Very helpful and understanding.'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTherapist(mockTherapist);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleBookSession = () => {
    navigate(`/therapists/${id}/book`);
  };

  const handleStartChat = () => {
    navigate(`/therapists/${id}/chat`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading therapist profile...</p>
        </div>
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Therapist Not Found</h2>
          <p className="text-gray-600 mb-4">The therapist you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/find-therapists')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Find Therapists
          </button>
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
              onClick={() => navigate('/find-therapists')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Therapists
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Therapist Profile</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Therapist Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-900">{therapist.name}</h2>
                <p className="text-blue-600 font-medium">{therapist.specialty}</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-700">{therapist.rating}</span>
                  <span className="text-gray-500">({therapist.reviews.length} reviews)</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <FiClock className="w-5 h-5 mr-3" />
                  <span>{therapist.experience} experience</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="w-5 h-5 mr-3" />
                  <span>{therapist.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiDollarSign className="w-5 h-5 mr-3" />
                  <span>LKR {therapist.price.toLocaleString()}/month</span>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {therapist.languages.map(language => (
                    <span
                      key={language}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookSession}
                  disabled={therapist.availability !== 'Available'}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                    therapist.availability === 'Available'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FiCalendar className="w-5 h-5 inline mr-2" />
                  {therapist.availability === 'Available' ? 'Book Session' : 'Unavailable'}
                </button>
                <button
                  onClick={handleStartChat}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <FiMessageCircle className="w-5 h-5 inline mr-2" />
                  Start Chat
                </button>
                <button
                  className="w-full px-4 py-3 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium"
                >
                  <FiVideo className="w-5 h-5 inline mr-2" />
                  Video Call
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'qualifications', label: 'Qualifications' },
                    { id: 'schedule', label: 'Schedule' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                      <p className="text-gray-600 leading-relaxed">{therapist.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {therapist.specializations.map((spec, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FiAward className="w-5 h-5 text-blue-600 mr-3" />
                            <span className="text-gray-700">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qualifications' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Education & Certifications</h3>
                    <div className="space-y-4">
                      {therapist.qualifications.map((qual, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <FiAward className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                          <span className="text-gray-700">{qual}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h3>
                    <div className="space-y-3">
                      {Object.entries(therapist.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900 capitalize">{day}</span>
                          <span className="text-gray-600">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Reviews</h3>
                    <div className="space-y-4">
                      {therapist.reviews.map(review => (
                        <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{review.name}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;

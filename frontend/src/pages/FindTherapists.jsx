import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiMapPin, FiStar, FiClock, FiDollarSign, FiArrowLeft } from 'react-icons/fi';

const FindTherapists = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock therapist data
  const mockTherapists = [
    {
      id: 1,
      name: 'Dr. Shanika Madumali',
      specialty: 'Speech-Language Pathology',
      experience: '8 years',
      rating: 4.9,
      reviews: 127,
      location: 'Colombo',
      image: '/speech_therapy.jpg',
      price: 25000,
      availability: 'Available',
      languages: ['English', 'Sinhala'],
      description: 'Specialized in speech therapy for children and adults with communication disorders.',
      qualifications: ['PhD in Speech-Language Pathology', 'Licensed SLP', 'SLMC Certified']
    },
    {
      id: 2,
      name: 'Dr. Umali Silva',
      specialty: 'Hearing & Auditory Processing',
      experience: '12 years',
      rating: 4.8,
      reviews: 89,
      location: 'Kandy',
      image: '/speech_therapy.jpg',
      price: 25000,
      availability: 'Available',
      languages: ['English', 'Sinhala', 'Tamil'],
      description: 'Expert in auditory processing disorders and hearing rehabilitation.',
      qualifications: ['MS in Audiology', 'Licensed Audiologist', 'Board Certified']
    },
    {
      id: 3,
      name: 'Dr. Pooja Jayanetti',
      specialty: 'Sign Language Therapy',
      experience: '6 years',
      rating: 4.7,
      reviews: 156,
      location: 'Galle',
      image: '/speech_therapy.jpg',
      price: 25000,
      availability: 'Busy',
      languages: ['English', 'Sinhala', 'ASL'],
      description: 'Specialized in sign language instruction and deaf/hard of hearing support.',
      qualifications: ['MA in Deaf Studies', 'ASL Interpreter Certification', 'Licensed SLP']
    },
    {
      id: 4,
      name: 'Dr. Randuni Silva',
      specialty: 'Communication Disorders',
      experience: '15 years',
      rating: 4.9,
      reviews: 203,
      location: 'Colombo',
      image: '/speech_therapy.jpg',
      price: 25000,
      availability: 'Available',
      languages: ['English', 'Sinhala'],
      description: 'Comprehensive communication disorder treatment for all age groups.',
      qualifications: ['PhD in Communication Sciences', 'Licensed SLP', 'Clinical Fellowship']
    }
  ];

  const specialties = [
    'all',
    'Speech-Language Pathology',
    'Hearing & Auditory Processing',
    'Sign Language Therapy',
    'Communication Disorders'
  ];

  const locations = ['all', 'Colombo', 'Kandy', 'Galle', 'Negombo', 'Matara'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTherapists(mockTherapists);
      setFilteredTherapists(mockTherapists);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = therapists;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(therapist =>
        therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(therapist => therapist.specialty === selectedSpecialty);
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(therapist => therapist.location === selectedLocation);
    }

    setFilteredTherapists(filtered);
  }, [searchTerm, selectedSpecialty, selectedLocation, therapists]);

  const handleBookSession = (therapistId) => {
    navigate(`/therapists/${therapistId}/book`);
  };

  const handleViewProfile = (therapistId) => {
    navigate(`/therapists/${therapistId}/profile`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading therapists...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Find Therapists</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search therapists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-blue-50 rounded-lg px-4 py-2">
              <span className="text-blue-700 font-medium">
                {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Therapists Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredTherapists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No therapists found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTherapists.map(therapist => (
              <div key={therapist.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                {/* Therapist Image */}
                <div className="relative">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    therapist.availability === 'Available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {therapist.availability}
                  </div>
                </div>

                {/* Therapist Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{therapist.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{therapist.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{therapist.rating}</span>
                      <span className="text-sm text-gray-500">({therapist.reviews})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{therapist.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="w-4 h-4 mr-2" />
                      {therapist.experience} experience
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      {therapist.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiDollarSign className="w-4 h-4 mr-2" />
                      LKR {therapist.price.toLocaleString()}/month (30 hours)
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    {therapist.languages.map(language => (
                      <span
                        key={language}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewProfile(therapist.id)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleBookSession(therapist.id)}
                      disabled={therapist.availability !== 'Available'}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        therapist.availability === 'Available'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {therapist.availability === 'Available' ? 'Book Session' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTherapists;

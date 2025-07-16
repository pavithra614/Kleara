import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCalendarDay, 
  FaPlay, 
  FaPause, 
  FaRedo, 
  FaBookmark,
  FaShare,
  FaVolumeUp,
  FaChevronLeft,
  FaChevronRight,
  FaCheck
} from 'react-icons/fa';
import SignAvatar from '../shared/SignAvatar';

const SignOfTheDay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todaySign, setTodaySign] = useState(null);
  const [isLearned, setIsLearned] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [savedSigns, setSavedSigns] = useState([]);

  const signDatabase = [
    {
      id: 1,
      sign: 'Hello',
      category: 'Greetings',
      difficulty: 'Beginner',
      description: 'A friendly greeting used to say hello to someone',
      instructions: 'Raise your hand and wave it side to side with a smile',
      examples: [
        'Hello, how are you today?',
        'Hello everyone, welcome!',
        'Hello, nice to meet you!'
      ],
      tips: 'Make eye contact and smile while signing hello',
      relatedSigns: ['Hi', 'Good morning', 'Welcome'],
      videoUrl: '/videos/hello.mp4' // Placeholder
    },
    {
      id: 2,
      sign: 'Thank you',
      category: 'Politeness',
      difficulty: 'Beginner',
      description: 'Express gratitude and appreciation',
      instructions: 'Touch your chin with your fingertips, then move your hand forward',
      examples: [
        'Thank you for your help',
        'Thank you very much',
        'Thank you for the gift'
      ],
      tips: 'Show genuine appreciation with your facial expression',
      relatedSigns: ['Please', 'You\'re welcome', 'Appreciate'],
      videoUrl: '/videos/thankyou.mp4'
    },
    {
      id: 3,
      sign: 'Love',
      category: 'Emotions',
      difficulty: 'Beginner',
      description: 'Express deep affection and care',
      instructions: 'Cross both arms over your chest, hugging yourself',
      examples: [
        'I love you',
        'I love my family',
        'Love is important'
      ],
      tips: 'Use warm facial expressions to convey genuine emotion',
      relatedSigns: ['Like', 'Care', 'Heart'],
      videoUrl: '/videos/love.mp4'
    },
    {
      id: 4,
      sign: 'Help',
      category: 'Assistance',
      difficulty: 'Beginner',
      description: 'Ask for or offer assistance',
      instructions: 'Place one hand flat under the other fist, then lift both hands up',
      examples: [
        'Can you help me?',
        'I need help',
        'Let me help you'
      ],
      tips: 'Use appropriate facial expressions - questioning when asking, caring when offering',
      relatedSigns: ['Support', 'Assist', 'Aid'],
      videoUrl: '/videos/help.mp4'
    },
    {
      id: 5,
      sign: 'Family',
      category: 'People',
      difficulty: 'Intermediate',
      description: 'Refer to family members or family unit',
      instructions: 'Make F handshapes with both hands, then move them in a circle',
      examples: [
        'My family is important',
        'Family dinner tonight',
        'I love my family'
      ],
      tips: 'Think about the circular connection that binds family together',
      relatedSigns: ['Mother', 'Father', 'Sister', 'Brother'],
      videoUrl: '/videos/family.mp4'
    }
  ];

  useEffect(() => {
    // Get sign of the day based on current date
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const signIndex = dayOfYear % signDatabase.length;
    setTodaySign(signDatabase[signIndex]);
    
    // Check if user has learned this sign
    const learnedSigns = JSON.parse(localStorage.getItem('learnedSigns') || '[]');
    setIsLearned(learnedSigns.includes(signDatabase[signIndex].id));
    
    // Load saved signs
    const saved = JSON.parse(localStorage.getItem('savedSigns') || '[]');
    setSavedSigns(saved);
  }, [currentDate]);

  const markAsLearned = () => {
    if (!todaySign) return;
    
    const learnedSigns = JSON.parse(localStorage.getItem('learnedSigns') || '[]');
    if (!learnedSigns.includes(todaySign.id)) {
      learnedSigns.push(todaySign.id);
      localStorage.setItem('learnedSigns', JSON.stringify(learnedSigns));
      setIsLearned(true);
      
      // Add XP (simulate)
      alert('Great job! You learned a new sign. +25 XP');
    }
  };

  const saveSign = () => {
    if (!todaySign) return;
    
    const saved = JSON.parse(localStorage.getItem('savedSigns') || '[]');
    if (!saved.find(s => s.id === todaySign.id)) {
      saved.push(todaySign);
      localStorage.setItem('savedSigns', JSON.stringify(saved));
      setSavedSigns(saved);
      alert('Sign saved to your collection!');
    }
  };

  const shareSign = () => {
    if (!todaySign) return;
    
    const shareData = {
      sign: todaySign.sign,
      description: todaySign.description,
      date: currentDate.toDateString()
    };
    
    console.log('Sharing sign:', shareData);
    alert('Sign shared successfully! (This is a prototype)');
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!todaySign) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-yellow-600 hover:text-yellow-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Sign of the Day</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateDate(-1)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
            >
              <FaChevronLeft />
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FaCalendarDay className="text-2xl text-yellow-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentDate.toDateString()}
                </h2>
              </div>
              <p className="text-gray-600">Discover a new sign every day!</p>
            </div>
            
            <button
              onClick={() => navigateDate(1)}
              disabled={currentDate >= new Date()}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Sign Information */}
          <div className="space-y-6">
            {/* Main Sign Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{todaySign.sign}</h3>
                  <div className="flex items-center mt-2 space-x-3">
                    <span className="text-sm text-gray-600">{todaySign.category}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(todaySign.difficulty)}`}>
                      {todaySign.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={saveSign}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Save sign"
                  >
                    <FaBookmark />
                  </button>
                  <button
                    onClick={shareSign}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    title="Share sign"
                  >
                    <FaShare />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{todaySign.description}</p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">How to Sign:</h4>
                <p className="text-blue-700">{todaySign.instructions}</p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tip:</h4>
                <p className="text-yellow-700">{todaySign.tips}</p>
              </div>
            </div>

            {/* Usage Examples */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Usage Examples</h4>
              <div className="space-y-3">
                {todaySign.examples.map((example, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">💬</span>
                    <span className="text-gray-800">{example}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Signs */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Related Signs</h4>
              <div className="flex flex-wrap gap-2">
                {todaySign.relatedSigns.map((relatedSign, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {relatedSign}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Practice and Avatar */}
          <div className="space-y-6">
            {/* Sign Avatar */}
            <SignAvatar 
              text={todaySign.sign}
              speed={1}
              autoPlay={true}
              showControls={true}
            />

            {/* Learning Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Learning Actions</h4>
              <div className="space-y-3">
                <button
                  onClick={markAsLearned}
                  disabled={isLearned}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                    isLearned
                      ? 'bg-green-100 text-green-800 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  <FaCheck className="mr-2" />
                  {isLearned ? 'Already Learned!' : 'Mark as Learned'}
                </button>
                
                <Link
                  to="/social-skills/practice-mode"
                  className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  <FaPlay className="mr-2" />
                  Practice This Sign
                </Link>
                
                <button
                  onClick={() => setShowExamples(!showExamples)}
                  className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium"
                >
                  {showExamples ? 'Hide' : 'Show'} More Examples
                </button>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Signs learned this week:</span>
                  <span className="font-semibold text-green-600">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current streak:</span>
                  <span className="font-semibold text-orange-600">12 days 🔥</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total signs learned:</span>
                  <span className="font-semibold text-blue-600">89</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg p-6 text-white">
              <h4 className="text-lg font-semibold mb-4">🎯 Daily Challenge</h4>
              <p className="mb-4">Learn today's sign and practice it 5 times to earn bonus XP!</p>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-sm">Progress: 1/5 practices</div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOfTheDay;

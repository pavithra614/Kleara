import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHandPaper, 
  FaComments, 
  FaLanguage, 
  FaBrain, 
  FaCamera, 
  FaPuzzlePiece, 
  FaExchangeAlt,
  FaChartLine,
  FaCalendarDay,
  FaPlay,
  FaGraduationCap,
  FaUsers,
  FaHeart,
  FaShare,
  FaRobot,
  FaEye,
  FaLightbulb,
  FaArrowLeft
} from 'react-icons/fa';

const SocialSkillsPlatform = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const expressionFeatures = [
    {
      id: 'sign-to-post',
      title: 'Sign-to-Post',
      icon: <FaHandPaper className="text-blue-500" />,
      description: 'Sign words, phrases, or sentences via webcam',
      route: '/social-skills/sign-to-post'
    },
    {
      id: 'symbol-expression',
      title: 'Symbol-Based Expression',
      icon: <FaComments className="text-green-500" />,
      description: 'Drag-and-drop emojis and pictograms to form messages',
      route: '/social-skills/symbol-expression'
    },
    {
      id: 'text-to-sign',
      title: 'Text-to-Sign Translator',
      icon: <FaLanguage className="text-purple-500" />,
      description: 'Type messages and see AI avatar perform sign language',
      route: '/social-skills/text-to-sign'
    },
    {
      id: 'smart-suggestions',
      title: 'Smart Suggestions',
      icon: <FaBrain className="text-orange-500" />,
      description: 'AI-powered predictive suggestions for phrases',
      route: '/social-skills/smart-suggestions'
    },
    {
      id: 'sign-moments',
      title: 'Sign Moments',
      icon: <FaCamera className="text-pink-500" />,
      description: 'Share pictures/videos of signs and expressions',
      route: '/social-skills/sign-moments'
    },
    {
      id: 'expression-builder',
      title: 'Expression Builder',
      icon: <FaPuzzlePiece className="text-indigo-500" />,
      description: 'Build expressions with face, body, and sign elements',
      route: '/social-skills/expression-builder'
    },
    {
      id: 'translate-wall',
      title: 'Translate Wall',
      icon: <FaExchangeAlt className="text-teal-500" />,
      description: 'Real-time translation of all shared thoughts',
      route: '/social-skills/translate-wall'
    }
  ];

  const learningFeatures = [
    {
      id: 'learning-progress',
      title: 'My Learning Progress',
      icon: <FaChartLine className="text-blue-600" />,
      description: 'Track learned signs and frequently used expressions',
      route: '/social-skills/learning-progress'
    },
    {
      id: 'sign-of-day',
      title: 'Sign of the Day',
      icon: <FaCalendarDay className="text-green-600" />,
      description: 'Learn a new sign daily with video and examples',
      route: '/social-skills/sign-of-day'
    },
    {
      id: 'practice-mode',
      title: 'Practice Mode',
      icon: <FaPlay className="text-purple-600" />,
      description: 'Copy signs from avatar with real-time AI feedback',
      route: '/social-skills/practice-mode'
    },
    {
      id: 'personalized-lessons',
      title: 'Personalized Lessons',
      icon: <FaGraduationCap className="text-orange-600" />,
      description: 'Adaptive lessons based on your level and needs',
      route: '/social-skills/personalized-lessons'
    }
  ];

  const socialFeatures = [
    {
      id: 'expression-feed',
      title: 'Expression Feed',
      icon: <FaUsers className="text-blue-700" />,
      description: 'Community wall with sign animations and messages',
      route: '/social-skills/expression-feed'
    },
    {
      id: 'reactions',
      title: 'Like/React/Comment',
      icon: <FaHeart className="text-red-500" />,
      description: 'Accessible reactions with sign icons and emojis',
      route: '/social-skills/reactions'
    },
    {
      id: 'private-message',
      title: 'Private Messages',
      icon: <FaShare className="text-green-700" />,
      description: 'Sign or text-based chat with AI translation',
      route: '/social-skills/private-messages'
    },
    {
      id: 'group-boards',
      title: 'Group Boards',
      icon: <FaPuzzlePiece className="text-purple-700" />,
      description: 'Shared expression boards around themes',
      route: '/social-skills/group-boards'
    }
  ];

  const aiFeatures = [
    {
      id: 'sign-feedback',
      title: 'Sign Accuracy Feedback',
      icon: <FaRobot className="text-blue-800" />,
      description: 'Real-time sign recognition and correction tips',
      route: '/social-skills/sign-feedback'
    },
    {
      id: 'emotion-detection',
      title: 'Emotion Detection',
      icon: <FaEye className="text-green-800" />,
      description: 'AI detects emotional tone from signs and expressions',
      route: '/social-skills/emotion-detection'
    },
    {
      id: 'smart-suggestions-panel',
      title: 'Smart Suggestions Panel',
      icon: <FaLightbulb className="text-yellow-600" />,
      description: 'Context-based suggestions for signs and words',
      route: '/social-skills/suggestions-panel'
    }
  ];

  const renderFeatureGrid = (features, title, bgColor) => (
    <div className={`${bgColor} rounded-xl p-6 mb-8`}>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.id}
            to={feature.route}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
            </div>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex items-center text-blue-600 hover:text-blue-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Social Skills Development Platform</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Platform Overview */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Sign Language Social Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect, learn, and express yourself through sign language with AI assistance. 
            Build social skills while communicating in an inclusive environment.
          </p>
        </div>

        {/* Feature Sections */}
        {renderFeatureGrid(expressionFeatures, "🔷 Expression Creation", "bg-blue-50")}
        {renderFeatureGrid(learningFeatures, "🔷 Learning & Personal Growth", "bg-green-50")}
        {renderFeatureGrid(socialFeatures, "🔷 Social & Interaction Features", "bg-purple-50")}
        {renderFeatureGrid(aiFeatures, "🔷 AI Tools & Feedback", "bg-orange-50")}

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Platform Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">7</div>
              <div className="text-gray-600">Expression Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">4</div>
              <div className="text-gray-600">Learning Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">4</div>
              <div className="text-gray-600">Social Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">3</div>
              <div className="text-gray-600">AI Tools</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSkillsPlatform;

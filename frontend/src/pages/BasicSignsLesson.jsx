import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiHome, 
  FiMove,
  FiPlay,
  FiPause,
  FiRotateCcw,
  FiCheck,
  FiX,
  FiEye,
  FiMic
} from 'react-icons/fi';

const BasicSignsLesson = () => {
  const navigate = useNavigate();
  const [currentSign, setCurrentSign] = useState(0);
  const [learningMode, setLearningMode] = useState('tutorial'); // 'tutorial', 'practice', 'flashcard'
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [masteredSigns, setMasteredSigns] = useState([]);
  const [sessionScore, setSessionScore] = useState(0);

  // Basic signs data for Lesson 1
  const basicSigns = [
    {
      id: 'hello',
      word: 'Hello',
      description: 'A friendly greeting gesture',
      instructions: 'Raise your dominant hand to shoulder height, palm facing forward, and wave gently',
      difficulty: 'Easy',
      category: 'Greetings',
      videoUrl: '/videos/hello.mp4', // Mock video URL
      keyPoints: ['Shoulder height', 'Palm forward', 'Gentle wave'],
      commonMistakes: ['Hand too low', 'Palm facing wrong direction', 'Too aggressive movement']
    },
    {
      id: 'goodbye',
      word: 'Goodbye',
      description: 'A farewell gesture',
      instructions: 'Raise your hand and move it side to side in a waving motion',
      difficulty: 'Easy',
      category: 'Greetings',
      videoUrl: '/videos/goodbye.mp4',
      keyPoints: ['Clear waving motion', 'Visible to recipient', 'Smooth movement'],
      commonMistakes: ['Too fast movement', 'Hand too close to body']
    },
    {
      id: 'please',
      word: 'Please',
      description: 'A polite request gesture',
      instructions: 'Place your flat hand on your chest and move it in a circular motion',
      difficulty: 'Medium',
      category: 'Politeness',
      videoUrl: '/videos/please.mp4',
      keyPoints: ['Flat hand on chest', 'Circular motion', 'Gentle pressure'],
      commonMistakes: ['Hand not flat', 'Motion too large', 'Wrong placement']
    },
    {
      id: 'thank-you',
      word: 'Thank You',
      description: 'An expression of gratitude',
      instructions: 'Touch your chin with your fingertips and move your hand forward',
      difficulty: 'Medium',
      category: 'Politeness',
      videoUrl: '/videos/thank-you.mp4',
      keyPoints: ['Fingertips to chin', 'Forward movement', 'Clear gesture'],
      commonMistakes: ['Wrong finger position', 'Movement too small']
    },
    {
      id: 'yes',
      word: 'Yes',
      description: 'Affirmative response',
      instructions: 'Make a fist and nod it up and down like a head nodding',
      difficulty: 'Easy',
      category: 'Responses',
      videoUrl: '/videos/yes.mp4',
      keyPoints: ['Closed fist', 'Up and down motion', 'Clear nodding'],
      commonMistakes: ['Open hand', 'Side to side motion']
    },
    {
      id: 'no',
      word: 'No',
      description: 'Negative response',
      instructions: 'Extend your index and middle finger and close them against your thumb',
      difficulty: 'Easy',
      category: 'Responses',
      videoUrl: '/videos/no.mp4',
      keyPoints: ['Two fingers extended', 'Closing motion', 'Clear gesture'],
      commonMistakes: ['Wrong fingers', 'Unclear closing']
    },
    {
      id: 'more',
      word: 'More',
      description: 'Request for additional quantity',
      instructions: 'Bring your fingertips together in front of you and tap them together',
      difficulty: 'Medium',
      category: 'Requests',
      videoUrl: '/videos/more.mp4',
      keyPoints: ['Fingertips together', 'Tapping motion', 'In front of body'],
      commonMistakes: ['Hands too far apart', 'Wrong finger position']
    },
    {
      id: 'eat',
      word: 'Eat',
      description: 'Action of eating food',
      instructions: 'Bring your fingertips to your mouth as if putting food in',
      difficulty: 'Easy',
      category: 'Actions',
      videoUrl: '/videos/eat.mp4',
      keyPoints: ['Fingertips to mouth', 'Eating motion', 'Natural movement'],
      commonMistakes: ['Hand too far from mouth', 'Wrong finger position']
    },
    {
      id: 'drink',
      word: 'Drink',
      description: 'Action of drinking liquid',
      instructions: 'Make a "C" shape with your hand and bring it to your mouth like holding a cup',
      difficulty: 'Easy',
      category: 'Actions',
      videoUrl: '/videos/drink.mp4',
      keyPoints: ['C-shaped hand', 'Cup-like motion', 'To mouth movement'],
      commonMistakes: ['Wrong hand shape', 'Motion unclear']
    }
  ];

  const currentSignData = basicSigns[currentSign];
  const totalSigns = basicSigns.length;

  // Mock gesture recognition
  const startGestureRecognition = () => {
    setIsRecognizing(true);
    setRecognitionResult(null);

    // Simulate AI processing
    setTimeout(() => {
      const accuracy = 70 + Math.random() * 30; // 70-100% accuracy
      const isCorrect = accuracy >= 80;
      
      const result = {
        accuracy: Math.round(accuracy),
        isCorrect,
        feedback: isCorrect ? 
          'Excellent! Your sign was recognized correctly!' : 
          'Good attempt! Try adjusting your hand position.',
        suggestions: isCorrect ? [] : currentSignData.commonMistakes.slice(0, 2)
      };

      setRecognitionResult(result);
      setIsRecognizing(false);

      if (isCorrect && !masteredSigns.includes(currentSignData.id)) {
        setMasteredSigns(prev => [...prev, currentSignData.id]);
        setSessionScore(prev => prev + 10);
      }
    }, 2000 + Math.random() * 1000);
  };

  const nextSign = () => {
    if (currentSign < totalSigns - 1) {
      setCurrentSign(prev => prev + 1);
      setRecognitionResult(null);
    }
  };

  const previousSign = () => {
    if (currentSign > 0) {
      setCurrentSign(prev => prev - 1);
      setRecognitionResult(null);
    }
  };

  const resetRecognition = () => {
    setRecognitionResult(null);
    setIsRecognizing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/sign-language')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">🤟 Basic Signs - Lesson 1</h1>
                <p className="text-gray-600">Learn essential signs for basic communication</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Sign {currentSign + 1} of {totalSigns}
              </div>
              <button
                onClick={() => navigate('/home')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiHome className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Learning Area */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Lesson Progress</span>
                <span className="text-sm text-gray-600">{Math.round(((currentSign + 1) / totalSigns) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSign + 1) / totalSigns) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Sign Display */}
            <div className="bg-white rounded-xl p-8 mb-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                  {currentSignData.category}
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{currentSignData.word}</h2>
                <p className="text-gray-600 text-lg">{currentSignData.description}</p>
              </div>

              {/* Video Tutorial Area */}
              <div className="bg-gray-100 rounded-lg p-8 mb-6 text-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMove className="w-16 h-16 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-4">Video tutorial would appear here</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FiPlay className="w-4 h-4 inline mr-2" />
                  Play Tutorial
                </button>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Sign "{currentSignData.word}"</h3>
                <p className="text-blue-800 mb-4">{currentSignData.instructions}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Key Points:</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      {currentSignData.keyPoints.map((point, index) => (
                        <li key={index}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Avoid These Mistakes:</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      {currentSignData.commonMistakes.map((mistake, index) => (
                        <li key={index}>• {mistake}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Practice Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Your Sign</h3>
                
                {!isRecognizing && !recognitionResult && (
                  <div>
                    <p className="text-gray-600 mb-6">Position yourself in front of the camera and click "Start Recognition" to practice</p>
                    <button
                      onClick={startGestureRecognition}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <FiEye className="w-5 h-5 inline mr-2" />
                      Start Recognition
                    </button>
                  </div>
                )}

                {isRecognizing && (
                  <div>
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-green-600 font-medium">Analyzing your gesture...</p>
                    <p className="text-gray-600 text-sm mt-2">Make sure your hands are clearly visible</p>
                  </div>
                )}

                {recognitionResult && (
                  <div className={`p-6 rounded-lg ${recognitionResult.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      {recognitionResult.isCorrect ? (
                        <FiCheck className="w-6 h-6 text-green-600" />
                      ) : (
                        <FiX className="w-6 h-6 text-orange-600" />
                      )}
                      <span className={`text-lg font-semibold ${recognitionResult.isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                        {recognitionResult.feedback}
                      </span>
                    </div>
                    <p className={`text-sm mb-4 ${recognitionResult.isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                      Accuracy: {recognitionResult.accuracy}%
                    </p>
                    
                    {recognitionResult.suggestions.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-orange-800 mb-2">Suggestions for improvement:</h4>
                        <ul className="text-orange-700 text-sm space-y-1">
                          {recognitionResult.suggestions.map((suggestion, index) => (
                            <li key={index}>• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={resetRecognition}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <FiRotateCcw className="w-4 h-4 inline mr-2" />
                        Try Again
                      </button>
                      {recognitionResult.isCorrect && currentSign < totalSigns - 1 && (
                        <button
                          onClick={nextSign}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Next Sign
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={previousSign}
                  disabled={currentSign === 0}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={nextSign}
                  disabled={currentSign === totalSigns - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Session Progress */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Progress</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{masteredSigns.length}</div>
                  <div className="text-sm text-blue-700">Signs Mastered</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{sessionScore}</div>
                  <div className="text-sm text-green-700">Session Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {masteredSigns.length > 0 ? Math.round((masteredSigns.length / totalSigns) * 100) : 0}%
                  </div>
                  <div className="text-sm text-purple-700">Completion</div>
                </div>
              </div>
            </div>

            {/* Signs Overview */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Signs</h3>
              <div className="space-y-2">
                {basicSigns.map((sign, index) => (
                  <button
                    key={sign.id}
                    onClick={() => setCurrentSign(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentSign 
                        ? 'bg-blue-100 border border-blue-300' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{sign.word}</span>
                      {masteredSigns.includes(sign.id) && (
                        <FiCheck className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="text-xs text-gray-600">{sign.category}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicSignsLesson;

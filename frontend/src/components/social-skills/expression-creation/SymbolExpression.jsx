import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTrash, FaShare, FaSave, FaRedo } from 'react-icons/fa';
import SymbolPicker from '../shared/SymbolPicker';

const SymbolExpression = () => {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [expressionText, setExpressionText] = useState('');
  const [aiInterpretation, setAiInterpretation] = useState('');
  const [emotionTag, setEmotionTag] = useState('');
  const [isGeneratingText, setIsGeneratingText] = useState(false);

  const handleSymbolSelect = (symbol) => {
    const isSelected = selectedSymbols.find(s => s.id === symbol.id);
    
    if (isSelected) {
      // Remove symbol
      setSelectedSymbols(prev => prev.filter(s => s.id !== symbol.id));
    } else {
      // Add symbol
      setSelectedSymbols(prev => [...prev, symbol]);
    }
  };

  const generateAIInterpretation = () => {
    if (selectedSymbols.length === 0) return;
    
    setIsGeneratingText(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const symbols = selectedSymbols.map(s => s.name.toLowerCase());
      let interpretation = '';
      let emotion = 'neutral';
      
      // Simple AI interpretation logic (replace with actual AI)
      if (symbols.includes('happy') || symbols.includes('excited')) {
        emotion = 'positive';
        interpretation = "I'm feeling great today! ";
      } else if (symbols.includes('sad') || symbols.includes('tired')) {
        emotion = 'negative';
        interpretation = "I'm having a tough time. ";
      } else if (symbols.includes('love') || symbols.includes('heart')) {
        emotion = 'loving';
        interpretation = "Sending love and positive vibes! ";
      }
      
      // Add context based on other symbols
      if (symbols.includes('family')) {
        interpretation += "Spending time with family ";
      }
      if (symbols.includes('food')) {
        interpretation += "enjoying some delicious food ";
      }
      if (symbols.includes('home')) {
        interpretation += "at home ";
      }
      if (symbols.includes('friend')) {
        interpretation += "with friends ";
      }
      
      // Add actions
      if (symbols.includes('wave')) {
        interpretation += "saying hello to everyone!";
      } else if (symbols.includes('pray')) {
        interpretation += "feeling grateful.";
      } else if (symbols.includes('clap')) {
        interpretation += "celebrating something special!";
      }
      
      // Fallback interpretation
      if (!interpretation.trim()) {
        interpretation = `Expressing myself through ${symbols.join(', ')}`;
      }
      
      setAiInterpretation(interpretation.trim());
      setEmotionTag(emotion);
      setIsGeneratingText(false);
    }, 1500);
  };

  const clearExpression = () => {
    setSelectedSymbols([]);
    setExpressionText('');
    setAiInterpretation('');
    setEmotionTag('');
  };

  const saveExpression = () => {
    const expressionData = {
      symbols: selectedSymbols,
      text: expressionText,
      aiInterpretation,
      emotionTag,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (simulate backend)
    const saved = JSON.parse(localStorage.getItem('savedExpressions') || '[]');
    saved.unshift(expressionData);
    localStorage.setItem('savedExpressions', JSON.stringify(saved.slice(0, 20))); // Keep last 20
    
    alert('Expression saved successfully!');
  };

  const shareExpression = () => {
    const shareData = {
      symbols: selectedSymbols,
      text: expressionText || aiInterpretation,
      emotionTag,
      timestamp: new Date().toISOString()
    };
    
    console.log('Sharing expression:', shareData);
    alert('Expression shared successfully! (This is a prototype)');
  };

  const moveSymbol = (fromIndex, toIndex) => {
    const newSymbols = [...selectedSymbols];
    const [movedSymbol] = newSymbols.splice(fromIndex, 1);
    newSymbols.splice(toIndex, 0, movedSymbol);
    setSelectedSymbols(newSymbols);
  };

  const removeSymbol = (symbolId) => {
    setSelectedSymbols(prev => prev.filter(s => s.id !== symbolId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-green-600 hover:text-green-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Symbol-Based Expression</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Symbol Picker */}
          <div>
            <SymbolPicker
              onSymbolSelect={handleSymbolSelect}
              selectedSymbols={selectedSymbols}
              maxSelections={10}
            />
          </div>

          {/* Right Column - Expression Builder */}
          <div className="space-y-6">
            {/* Expression Sequence */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Expression Sequence</h3>
              
              {selectedSymbols.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🎨</div>
                  <p>Select symbols to build your expression</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Symbol Sequence Display */}
                  <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg min-h-20">
                    {selectedSymbols.map((symbol, index) => (
                      <div
                        key={`${symbol.id}-${index}`}
                        className="relative group bg-white rounded-lg p-3 shadow-sm border-2 border-gray-200 hover:border-green-300 transition-colors"
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-1">{symbol.symbol}</div>
                          <div className="text-xs text-gray-600">{symbol.name}</div>
                        </div>
                        
                        {/* Remove button */}
                        <button
                          onClick={() => removeSymbol(symbol.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                        
                        {/* Order indicator */}
                        <div className="absolute -top-2 -left-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Interpretation Button */}
                  <button
                    onClick={generateAIInterpretation}
                    disabled={isGeneratingText}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isGeneratingText ? 'Generating interpretation...' : '🤖 Generate AI Interpretation'}
                  </button>
                </div>
              )}
            </div>

            {/* AI Interpretation */}
            {aiInterpretation && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Interpretation</h3>
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">🤖</span>
                    <span className="font-medium text-blue-800">AI says:</span>
                    {emotionTag && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        emotionTag === 'positive' ? 'bg-green-100 text-green-800' :
                        emotionTag === 'negative' ? 'bg-red-100 text-red-800' :
                        emotionTag === 'loving' ? 'bg-pink-100 text-pink-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {emotionTag}
                      </span>
                    )}
                  </div>
                  <p className="text-blue-900">{aiInterpretation}</p>
                </div>
              </div>
            )}

            {/* Custom Text Input */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Your Own Text (Optional)</h3>
              <textarea
                value={expressionText}
                onChange={(e) => setExpressionText(e.target.value)}
                placeholder="Add your own message or modify the AI interpretation..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
              />
            </div>

            {/* Expression Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Expression Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    U
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-800">You</div>
                    <div className="text-xs text-gray-500">Just now</div>
                  </div>
                </div>
                
                {/* Symbols Display */}
                {selectedSymbols.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSymbols.map((symbol, index) => (
                      <span key={`preview-${symbol.id}-${index}`} className="text-2xl">
                        {symbol.symbol}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Text Display */}
                <div className="text-gray-800 mb-3">
                  {expressionText || aiInterpretation || 'Your expression will appear here...'}
                </div>
                
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <button className="hover:text-green-500">👍 Like</button>
                  <button className="hover:text-green-500">💬 Comment</button>
                  <button className="hover:text-green-500">🔄 Share</button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={shareExpression}
                disabled={selectedSymbols.length === 0 && !expressionText}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <FaShare className="mr-2" />
                Share Expression
              </button>
              
              <button
                onClick={saveExpression}
                disabled={selectedSymbols.length === 0 && !expressionText}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <FaSave className="mr-2" />
                Save
              </button>
              
              <button
                onClick={clearExpression}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center"
              >
                <FaRedo className="mr-2" />
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymbolExpression;

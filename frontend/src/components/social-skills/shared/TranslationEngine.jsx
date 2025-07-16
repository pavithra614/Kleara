import React, { useState } from 'react';
import { FaExchangeAlt, FaLanguage, FaRobot } from 'react-icons/fa';

const TranslationEngine = ({ 
  inputText = '', 
  inputType = 'text', // text, signs, symbols
  outputType = 'signs', // text, signs, symbols
  onTranslationComplete 
}) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);

  const performTranslation = async () => {
    setIsTranslating(true);
    
    // Simulate AI translation processing
    setTimeout(() => {
      let result = '';
      
      if (inputType === 'text' && outputType === 'signs') {
        // Text to signs
        result = inputText.split(' ').map(word => word.toUpperCase()).join(' + ');
      } else if (inputType === 'signs' && outputType === 'text') {
        // Signs to text
        result = inputText.toLowerCase().replace(/\+/g, '');
      } else if (inputType === 'text' && outputType === 'symbols') {
        // Text to symbols (simplified)
        const symbolMap = {
          'happy': '😊',
          'sad': '😢',
          'love': '❤️',
          'hello': '👋',
          'thank': '🙏',
          'family': '👨‍👩‍👧‍👦',
          'food': '🍎',
          'home': '🏠'
        };
        
        result = inputText.split(' ').map(word => 
          symbolMap[word.toLowerCase()] || word
        ).join(' ');
      }
      
      setTranslationResult(result);
      setIsTranslating(false);
      
      if (onTranslationComplete) {
        onTranslationComplete(result);
      }
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <FaLanguage className="text-2xl text-blue-500 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">AI Translation Engine</h3>
      </div>
      
      <div className="space-y-4">
        {/* Input Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Input ({inputType}):</div>
          <div className="text-gray-800">{inputText || 'No input provided'}</div>
        </div>
        
        {/* Translation Arrow */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{inputType}</span>
            <FaExchangeAlt className="text-blue-500" />
            <span className="text-sm text-gray-500">{outputType}</span>
          </div>
        </div>
        
        {/* Output Section */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-600 mb-2">Output ({outputType}):</div>
          {isTranslating ? (
            <div className="flex items-center text-blue-700">
              <FaRobot className="mr-2 animate-pulse" />
              <span>Translating...</span>
            </div>
          ) : (
            <div className="text-blue-800">
              {translationResult || 'Click translate to see result'}
            </div>
          )}
        </div>
        
        {/* Translate Button */}
        <button
          onClick={performTranslation}
          disabled={!inputText || isTranslating}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isTranslating ? 'Translating...' : 'Translate'}
        </button>
      </div>
    </div>
  );
};

export default TranslationEngine;

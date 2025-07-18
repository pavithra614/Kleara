import React, { useState, useEffect, useRef } from 'react';
import { 
  FiMic, 
  FiMicOff, 
  FiVolume2, 
  FiVolumeX,
  FiSettings,
  FiGlobe,
  FiRefreshCw,
  FiCopy,
  FiDownload,
  FiShare2
} from 'react-icons/fi';
import translationEngine from '../../services/translationEngine';

const RealTimeTranslator = ({ 
  mode = 'speech-to-text',
  onTranslationResult,
  className = ""
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [interimText, setInterimText] = useState('');
  const [translationHistory, setTranslationHistory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [targetLanguage, setTargetLanguage] = useState('es-ES');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [emotion, setEmotion] = useState(null);
  const [context, setContext] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  const supportedLanguages = translationEngine.getSupportedLanguages();

  // Initialize audio visualization
  const initializeAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      startVisualization();
    } catch (error) {
      console.error('Error initializing audio visualization:', error);
    }
  };

  // Audio visualization
  const startVisualization = () => {
    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Calculate average volume for visual feedback
      const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
      
      // Update UI based on audio level
      if (isActive) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    
    draw();
  };

  // Start translation
  const startTranslation = async () => {
    setError(null);
    setIsActive(true);
    
    try {
      if (mode === 'speech-to-text') {
        await initializeAudioVisualization();
        await translationEngine.startSpeechToText(
          handleSpeechResult,
          handleError,
          handleTranslationEnd
        );
      }
    } catch (error) {
      setError(error.message);
      setIsActive(false);
    }
  };

  // Stop translation
  const stopTranslation = () => {
    setIsActive(false);
    translationEngine.stopSpeechToText();
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  // Handle speech recognition results
  const handleSpeechResult = async (result) => {
    setInterimText(result.interim);
    setConfidence(result.confidence || 0);
    
    if (result.final) {
      setCurrentText(result.final);
      setInterimText('');
      setIsProcessing(true);
      
      try {
        // Translate text if target language is different
        let translatedText = result.final;
        if (selectedLanguage !== targetLanguage) {
          const translation = await translationEngine.translateText(
            result.final,
            selectedLanguage.split('-')[0],
            targetLanguage.split('-')[0]
          );
          translatedText = translation.translatedText;
        }

        // Detect emotion and context
        const [emotionResult, contextResult] = await Promise.all([
          translationEngine.detectEmotion(null),
          translationEngine.analyzeContext([result.final])
        ]);

        setEmotion(emotionResult);
        setContext(contextResult);

        // Generate suggestions
        const suggestionResults = await translationEngine.generateSuggestions(
          result.final,
          contextResult
        );
        setSuggestions(suggestionResults);

        // Add to history
        const translationResult = {
          id: Date.now(),
          original: result.final,
          translated: translatedText,
          confidence: result.confidence,
          timestamp: new Date(),
          emotion: emotionResult,
          context: contextResult,
          fromLanguage: selectedLanguage,
          toLanguage: targetLanguage
        };

        setTranslationHistory(prev => [translationResult, ...prev.slice(0, 9)]);
        
        if (onTranslationResult) {
          onTranslationResult(translationResult);
        }

        // Speak translated text if different language
        if (selectedLanguage !== targetLanguage) {
          await translationEngine.textToSpeech(translatedText, {
            language: targetLanguage,
            rate: 0.9
          });
        }

      } catch (error) {
        setError(error.message);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Handle errors
  const handleError = (error) => {
    setError(error);
    setIsActive(false);
    setIsProcessing(false);
  };

  // Handle translation end
  const handleTranslationEnd = () => {
    setIsActive(false);
    setIsProcessing(false);
  };

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Clear history
  const clearHistory = () => {
    setTranslationHistory([]);
    setCurrentText('');
    setInterimText('');
    setSuggestions([]);
  };

  // Use suggestion
  const useSuggestion = async (suggestion) => {
    setCurrentText(suggestion);
    
    try {
      let translatedText = suggestion;
      if (selectedLanguage !== targetLanguage) {
        const translation = await translationEngine.translateText(
          suggestion,
          selectedLanguage.split('-')[0],
          targetLanguage.split('-')[0]
        );
        translatedText = translation.translatedText;
      }

      await translationEngine.textToSpeech(translatedText, {
        language: targetLanguage,
        rate: 0.9
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    translationEngine.setLanguage(selectedLanguage);
    
    return () => {
      stopTranslation();
    };
  }, [selectedLanguage]);

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-gray-900">Real-time Translator</h3>
          {emotion && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {emotion.emotion} ({Math.round(emotion.confidence * 100)}%)
            </span>
          )}
          {context && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              {context.context}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={clearHistory}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <FiRefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <FiSettings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Language Selection */}
      <div className="p-4 border-b bg-gray-50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Current Translation */}
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Current Input</span>
            {confidence > 0 && (
              <span className="text-xs text-gray-500">
                Confidence: {Math.round(confidence * 100)}%
              </span>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 min-h-[60px] flex items-center">
            {currentText || interimText ? (
              <div>
                <span className="text-gray-900">{currentText}</span>
                <span className="text-gray-500 italic">{interimText}</span>
              </div>
            ) : (
              <span className="text-gray-500">
                {isActive ? 'Listening...' : 'Click to start speaking'}
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={isActive ? stopTranslation : startTranslation}
            disabled={isProcessing}
            className={`p-4 rounded-full text-white transition-colors disabled:opacity-50 ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isActive ? <FiMicOff className="w-6 h-6" /> : <FiMic className="w-6 h-6" />}
          </button>
          
          {isProcessing && (
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Processing...</span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Suggestions</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => useSuggestion(suggestion)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Translation History */}
      {translationHistory.length > 0 && (
        <div className="border-t">
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Recent Translations</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {translationHistory.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm mb-1">{item.original}</p>
                      {item.translated !== item.original && (
                        <p className="text-blue-700 text-sm font-medium">{item.translated}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => copyToClipboard(item.translated)}
                        className="p-1 text-gray-600 hover:text-gray-900 rounded"
                      >
                        <FiCopy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => translationEngine.textToSpeech(item.translated, {
                          language: item.toLanguage
                        })}
                        className="p-1 text-gray-600 hover:text-gray-900 rounded"
                      >
                        <FiVolume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{item.timestamp.toLocaleTimeString()}</span>
                    <div className="flex items-center space-x-2">
                      {item.emotion && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded">
                          {item.emotion.emotion}
                        </span>
                      )}
                      <span>{Math.round(item.confidence * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeTranslator;

import React, { useState } from 'react';
import { FaSearch, FaTimes, FaHeart, FaStar } from 'react-icons/fa';

const SymbolPicker = ({ onSymbolSelect, selectedSymbols = [], maxSelections = null }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('emotions');

  const symbolCategories = {
    emotions: {
      name: 'Emotions',
      symbols: [
        { id: 'happy', symbol: '😊', name: 'Happy', keywords: ['happy', 'joy', 'smile'] },
        { id: 'sad', symbol: '😢', name: 'Sad', keywords: ['sad', 'cry', 'tears'] },
        { id: 'angry', symbol: '😠', name: 'Angry', keywords: ['angry', 'mad', 'upset'] },
        { id: 'excited', symbol: '🤩', name: 'Excited', keywords: ['excited', 'amazing', 'wow'] },
        { id: 'confused', symbol: '😕', name: 'Confused', keywords: ['confused', 'puzzled', 'unsure'] },
        { id: 'love', symbol: '😍', name: 'Love', keywords: ['love', 'heart', 'adore'] },
        { id: 'surprised', symbol: '😲', name: 'Surprised', keywords: ['surprised', 'shocked', 'wow'] },
        { id: 'tired', symbol: '😴', name: 'Tired', keywords: ['tired', 'sleepy', 'exhausted'] }
      ]
    },
    actions: {
      name: 'Actions',
      symbols: [
        { id: 'wave', symbol: '👋', name: 'Wave', keywords: ['wave', 'hello', 'hi'] },
        { id: 'thumbsup', symbol: '👍', name: 'Thumbs Up', keywords: ['good', 'yes', 'approve'] },
        { id: 'thumbsdown', symbol: '👎', name: 'Thumbs Down', keywords: ['bad', 'no', 'disapprove'] },
        { id: 'clap', symbol: '👏', name: 'Clap', keywords: ['clap', 'applause', 'good job'] },
        { id: 'point', symbol: '👉', name: 'Point', keywords: ['point', 'you', 'that'] },
        { id: 'pray', symbol: '🙏', name: 'Pray', keywords: ['pray', 'thank you', 'please'] },
        { id: 'hug', symbol: '🤗', name: 'Hug', keywords: ['hug', 'embrace', 'comfort'] },
        { id: 'peace', symbol: '✌️', name: 'Peace', keywords: ['peace', 'victory', 'two'] }
      ]
    },
    objects: {
      name: 'Objects',
      symbols: [
        { id: 'home', symbol: '🏠', name: 'Home', keywords: ['home', 'house', 'family'] },
        { id: 'food', symbol: '🍎', name: 'Food', keywords: ['food', 'eat', 'apple'] },
        { id: 'water', symbol: '💧', name: 'Water', keywords: ['water', 'drink', 'thirsty'] },
        { id: 'book', symbol: '📚', name: 'Book', keywords: ['book', 'read', 'study'] },
        { id: 'phone', symbol: '📱', name: 'Phone', keywords: ['phone', 'call', 'mobile'] },
        { id: 'car', symbol: '🚗', name: 'Car', keywords: ['car', 'drive', 'travel'] },
        { id: 'school', symbol: '🏫', name: 'School', keywords: ['school', 'learn', 'education'] },
        { id: 'hospital', symbol: '🏥', name: 'Hospital', keywords: ['hospital', 'doctor', 'sick'] }
      ]
    },
    people: {
      name: 'People',
      symbols: [
        { id: 'family', symbol: '👨‍👩‍👧‍👦', name: 'Family', keywords: ['family', 'parents', 'children'] },
        { id: 'mother', symbol: '👩', name: 'Mother', keywords: ['mother', 'mom', 'mama'] },
        { id: 'father', symbol: '👨', name: 'Father', keywords: ['father', 'dad', 'papa'] },
        { id: 'child', symbol: '🧒', name: 'Child', keywords: ['child', 'kid', 'young'] },
        { id: 'friend', symbol: '👫', name: 'Friend', keywords: ['friend', 'buddy', 'companion'] },
        { id: 'teacher', symbol: '👩‍🏫', name: 'Teacher', keywords: ['teacher', 'instructor', 'education'] },
        { id: 'doctor', symbol: '👩‍⚕️', name: 'Doctor', keywords: ['doctor', 'medical', 'health'] },
        { id: 'baby', symbol: '👶', name: 'Baby', keywords: ['baby', 'infant', 'small'] }
      ]
    },
    nature: {
      name: 'Nature',
      symbols: [
        { id: 'sun', symbol: '☀️', name: 'Sun', keywords: ['sun', 'sunny', 'bright'] },
        { id: 'moon', symbol: '🌙', name: 'Moon', keywords: ['moon', 'night', 'sleep'] },
        { id: 'tree', symbol: '🌳', name: 'Tree', keywords: ['tree', 'nature', 'green'] },
        { id: 'flower', symbol: '🌸', name: 'Flower', keywords: ['flower', 'beautiful', 'spring'] },
        { id: 'rain', symbol: '🌧️', name: 'Rain', keywords: ['rain', 'wet', 'weather'] },
        { id: 'snow', symbol: '❄️', name: 'Snow', keywords: ['snow', 'cold', 'winter'] },
        { id: 'fire', symbol: '🔥', name: 'Fire', keywords: ['fire', 'hot', 'warm'] },
        { id: 'earth', symbol: '🌍', name: 'Earth', keywords: ['earth', 'world', 'planet'] }
      ]
    }
  };

  const filteredSymbols = symbolCategories[activeCategory].symbols.filter(symbol =>
    symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symbol.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSymbolClick = (symbol) => {
    if (maxSelections && selectedSymbols.length >= maxSelections && !selectedSymbols.find(s => s.id === symbol.id)) {
      return; // Don't allow more selections
    }
    
    if (onSymbolSelect) {
      onSymbolSelect(symbol);
    }
  };

  const isSelected = (symbolId) => {
    return selectedSymbols.some(s => s.id === symbolId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Symbol Picker</h3>
        <p className="text-sm text-gray-600">Select symbols to express your thoughts</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search symbols..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(symbolCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Selected Symbols Display */}
      {selectedSymbols.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-blue-800">Selected Symbols:</h4>
            {maxSelections && (
              <span className="text-xs text-blue-600">
                {selectedSymbols.length}/{maxSelections}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSymbols.map((symbol) => (
              <div
                key={symbol.id}
                className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm"
              >
                <span className="text-2xl mr-2">{symbol.symbol}</span>
                <span className="text-sm text-gray-700">{symbol.name}</span>
                <button
                  onClick={() => handleSymbolClick(symbol)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Symbol Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-96 overflow-y-auto">
        {filteredSymbols.map((symbol) => (
          <button
            key={symbol.id}
            onClick={() => handleSymbolClick(symbol)}
            disabled={maxSelections && selectedSymbols.length >= maxSelections && !isSelected(symbol.id)}
            className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
              isSelected(symbol.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={symbol.name}
          >
            <div className="text-3xl mb-1">{symbol.symbol}</div>
            <div className="text-xs text-gray-600 truncate">{symbol.name}</div>
            
            {isSelected(symbol.id) && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                <FaStar className="text-xs" />
              </div>
            )}
          </button>
        ))}
      </div>

      {filteredSymbols.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <p>No symbols found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Usage Tips */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">Tips:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Click symbols to add them to your expression</li>
          <li>• Use search to find specific symbols quickly</li>
          <li>• Selected symbols will appear in your message</li>
          {maxSelections && <li>• Maximum {maxSelections} symbols allowed</li>}
        </ul>
      </div>
    </div>
  );
};

export default SymbolPicker;

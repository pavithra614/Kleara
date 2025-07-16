import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaHeart, 
  FaComment, 
  FaShare, 
  FaLanguage,
  FaPlay,
  FaUser,
  FaGlobe,
  FaFilter,
  FaPlus
} from 'react-icons/fa';

const ExpressionFeed = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all'); // all, signs, symbols, text
  const [showTranslations, setShowTranslations] = useState(true);

  const samplePosts = [
    {
      id: 1,
      user: { name: 'Sarah M.', avatar: '👩', level: 'Intermediate' },
      timestamp: '2 hours ago',
      type: 'sign-video',
      content: {
        text: 'Good morning everyone! Hope you have a wonderful day!',
        signs: ['Good', 'morning', 'everyone', 'hope', 'wonderful', 'day'],
        symbols: ['☀️', '😊', '🌟'],
        videoThumbnail: '/api/placeholder/300/200'
      },
      reactions: { likes: 24, hearts: 8, claps: 12 },
      comments: 5,
      shares: 3,
      isTranslated: false
    },
    {
      id: 2,
      user: { name: 'Mike R.', avatar: '👨', level: 'Beginner' },
      timestamp: '4 hours ago',
      type: 'symbol-expression',
      content: {
        text: 'Feeling grateful for my family today',
        symbols: ['👨‍👩‍👧‍👦', '❤️', '🙏', '😊'],
        aiInterpretation: 'Expressing love and gratitude for family'
      },
      reactions: { likes: 18, hearts: 15, claps: 6 },
      comments: 8,
      shares: 2,
      isTranslated: false
    },
    {
      id: 3,
      user: { name: 'Emma L.', avatar: '👧', level: 'Advanced' },
      timestamp: '6 hours ago',
      type: 'text-to-sign',
      content: {
        text: 'Thank you for helping me learn new signs!',
        signs: ['Thank', 'you', 'help', 'me', 'learn', 'new', 'signs'],
        translatedFrom: 'text'
      },
      reactions: { likes: 31, hearts: 12, claps: 18 },
      comments: 12,
      shares: 7,
      isTranslated: false
    },
    {
      id: 4,
      user: { name: 'Alex K.', avatar: '🧑', level: 'Intermediate' },
      timestamp: '8 hours ago',
      type: 'sign-moment',
      content: {
        text: 'Practicing my favorite sign - LOVE',
        signs: ['Love'],
        image: '/api/placeholder/300/300',
        description: 'Captured this moment while practicing'
      },
      reactions: { likes: 42, hearts: 28, claps: 15 },
      comments: 15,
      shares: 9,
      isTranslated: false
    },
    {
      id: 5,
      user: { name: 'Jordan P.', avatar: '👤', level: 'Beginner' },
      timestamp: '12 hours ago',
      type: 'mixed-expression',
      content: {
        text: 'Learning is fun when we do it together!',
        symbols: ['📚', '🎉', '👥', '💪'],
        signs: ['Learning', 'fun', 'together'],
        mood: 'excited'
      },
      reactions: { likes: 26, hearts: 19, claps: 22 },
      comments: 9,
      shares: 4,
      isTranslated: false
    }
  ];

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

  const handleReaction = (postId, reactionType) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [reactionType]: post.reactions[reactionType] + 1
            }
          };
        }
        return post;
      })
    );
  };

  const toggleTranslation = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, isTranslated: !post.isTranslated };
        }
        return post;
      })
    );
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'signs') return post.content.signs && post.content.signs.length > 0;
    if (filter === 'symbols') return post.content.symbols && post.content.symbols.length > 0;
    if (filter === 'text') return post.type === 'text-to-sign';
    return true;
  });

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'sign-video': return '🎥';
      case 'symbol-expression': return '🎨';
      case 'text-to-sign': return '🔤';
      case 'sign-moment': return '📸';
      case 'mixed-expression': return '🎭';
      default: return '💬';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/social-skills" className="flex items-center text-blue-600 hover:text-blue-800">
              <FaArrowLeft className="mr-2" />
              <span className="font-medium">Back to Social Skills</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Expression Feed</h1>
            <Link 
              to="/social-skills/sign-to-post"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" />
              New Post
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Community Feed</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showTranslations}
                  onChange={(e) => setShowTranslations(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Show translations</span>
              </label>
              <FaGlobe className="text-blue-500" />
            </div>
          </div>
          
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Posts', icon: '🌟' },
              { key: 'signs', label: 'Sign Language', icon: '🤟' },
              { key: 'symbols', label: 'Symbols', icon: '🎨' },
              { key: 'text', label: 'Text-to-Sign', icon: '🔤' }
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{filterOption.icon}</span>
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Post Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                      {post.user.avatar}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(post.user.level)}`}>
                          {post.user.level}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{post.timestamp}</span>
                        <span className="mx-2">•</span>
                        <span>{getPostTypeIcon(post.type)} {post.type.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleTranslation(post.id)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg"
                    title="Toggle translation"
                  >
                    <FaLanguage />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Symbols Display */}
                {post.content.symbols && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.content.symbols.map((symbol, index) => (
                      <span key={index} className="text-3xl">{symbol}</span>
                    ))}
                  </div>
                )}

                {/* Signs Display */}
                {post.content.signs && showTranslations && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 mb-1">Signs:</div>
                    <div className="flex flex-wrap gap-2">
                      {post.content.signs.map((sign, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm">
                          {sign}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Text */}
                <div className="text-gray-800 mb-4">
                  {post.isTranslated && post.content.aiInterpretation ? (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">AI Translation:</div>
                      <div className="italic">{post.content.aiInterpretation}</div>
                    </div>
                  ) : (
                    post.content.text
                  )}
                </div>

                {/* Media Content */}
                {post.content.image && (
                  <div className="mb-4">
                    <img 
                      src={post.content.image} 
                      alt="Sign moment"
                      className="w-full max-w-md rounded-lg"
                    />
                  </div>
                )}

                {post.content.videoThumbnail && (
                  <div className="mb-4 relative">
                    <img 
                      src={post.content.videoThumbnail} 
                      alt="Video thumbnail"
                      className="w-full max-w-md rounded-lg"
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-colors">
                      <FaPlay className="text-white text-3xl" />
                    </button>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => handleReaction(post.id, 'likes')}
                      className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <FaHeart className="mr-2" />
                      <span>{post.reactions.likes}</span>
                    </button>
                    
                    <button className="flex items-center text-gray-500 hover:text-green-500 transition-colors">
                      <FaComment className="mr-2" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center text-gray-500 hover:text-purple-500 transition-colors">
                      <FaShare className="mr-2" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>👏 {post.reactions.claps}</span>
                    <span>❤️ {post.reactions.hearts}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpressionFeed;

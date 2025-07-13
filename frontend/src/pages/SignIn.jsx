import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accessMode: 'self-guided' // 'self-guided' or 'therapist-guided'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Sign in attempt:', formData);
      setIsLoading(false);

      // Check if user selected therapist-guided mode
      if (formData.accessMode === 'therapist-guided') {
        // In a real app, check if user is already verified
        // For prototype, redirect to verification
        navigate('/age-verification');
      } else {
        // Self-guided mode - go directly to home
        navigate('/home');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="card w-full max-w-lg">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="heading-primary mb-3">KLEARA</h1>
            <p className="text-secondary text-lg">Empowering Communication Through AI</p>
            <p className="text-muted mt-2">Professional Therapy & Skill Building Platform</p>
          </div>

          {/* Access Mode Selection */}
          <div className="mb-6">
            <h3 className="heading-tertiary mb-4">Choose Your Access Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.accessMode === 'self-guided'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                onClick={() => setFormData({...formData, accessMode: 'self-guided'})}
              >
                <div className="text-center">
                  <h4 className="font-semibold text-primary mb-1">Self-Guided</h4>
                  <p className="text-sm text-secondary">Start therapy independently with AI assistance</p>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.accessMode === 'therapist-guided'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                onClick={() => setFormData({...formData, accessMode: 'therapist-guided'})}
              >
                <div className="text-center">
                  <h4 className="font-semibold text-primary mb-1">Therapist-Guided</h4>
                  <p className="text-sm text-secondary">Connect with licensed professionals</p>
                </div>
              </div>
            </div>
          </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="user@kleara.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              'SIGN IN'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            Continue with Twitter
          </button>
        </div>

          {/* Accessibility Options */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-primary mb-3">Accessibility Options</h4>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-sm btn-secondary">
                Large Text
              </button>
              <button type="button" className="btn btn-sm btn-secondary">
                High Contrast
              </button>
              <button type="button" className="btn btn-sm btn-secondary">
                Screen Reader
              </button>
              <button type="button" className="btn btn-sm btn-secondary">
                Sign Language
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-secondary">
              New to Kleara?{' '}
              <Link to="/signup" className="text-primary-blue font-medium hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

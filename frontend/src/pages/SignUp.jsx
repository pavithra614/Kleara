import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'individual', // 'individual', 'therapist', 'caregiver'
    accessMode: 'self-guided', // 'self-guided' or 'therapist-guided'
    age: '',
    communicationNeeds: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleCommunicationNeedToggle = (need) => {
    setFormData(prev => ({
      ...prev,
      communicationNeeds: prev.communicationNeeds.includes(need)
        ? prev.communicationNeeds.filter(n => n !== need)
        : [...prev.communicationNeeds, need]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.userType === 'individual' && (!formData.age || formData.age < 1)) {
      newErrors.age = 'Please enter a valid age';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Sign up attempt:', formData);
      setIsLoading(false);

      // Check if user selected therapist-guided mode
      if (formData.accessMode === 'therapist-guided') {
        // Redirect to verification process
        navigate('/age-verification');
      } else {
        // Self-guided mode - go directly to home
        navigate('/home');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="card w-full max-w-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="heading-primary mb-3">JOIN KLEARA</h1>
            <p className="text-secondary text-lg">Start Your Therapy Journey</p>
            <p className="text-muted mt-2">Accessible • Inclusive • AI-Enhanced</p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6">
            <h3 className="heading-tertiary mb-4">I am a...</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                formData.userType === 'individual'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => setFormData({...formData, userType: 'individual'})}
            >
              <div className="text-center">
                <h4 className="font-semibold text-primary text-sm">Individual</h4>
                <p className="text-xs text-secondary">Person seeking therapy</p>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                formData.userType === 'therapist'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => setFormData({...formData, userType: 'therapist'})}
            >
              <div className="text-center">
                <h4 className="font-semibold text-primary text-sm">Therapist</h4>
                <p className="text-xs text-secondary">Licensed professional</p>
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                formData.userType === 'caregiver'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => setFormData({...formData, userType: 'caregiver'})}
            >
              <div className="text-center">
                <h4 className="font-semibold text-primary text-sm">Caregiver</h4>
                <p className="text-xs text-secondary">Parent or guardian</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="John Doe"
                required
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {formData.userType === 'individual' && (
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`form-input ${errors.age ? 'error' : ''}`}
                  placeholder="16"
                  min="1"
                  max="120"
                />
                {errors.age && (
                  <p className="text-red-400 text-sm mt-1">{errors.age}</p>
                )}
              </div>
            )}
          </div>

          {/* Communication Needs for Individuals */}
          {formData.userType === 'individual' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Communication Support Needed (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'speech', label: 'Speech Therapy' },
                  { id: 'hearing', label: 'Hearing Support' },
                  { id: 'sign', label: 'Sign Language' },
                  { id: 'literacy', label: 'Reading & Writing' },
                  { id: 'social', label: 'Social Skills' },
                  { id: 'cognitive', label: 'Cognitive Skills' }
                ].map((need) => (
                  <div
                    key={need.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.communicationNeeds.includes(need.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    onClick={() => handleCommunicationNeedToggle(need.id)}
                  >
                    <span className="text-sm font-medium text-primary">{need.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`gaming-input w-full ${errors.email ? 'border-red-500' : ''}`}
              placeholder="player@kleara.com"
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`gaming-input w-full ${errors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`gaming-input w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Access Mode Selection - Only for individuals */}
          {formData.userType === 'individual' && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Choose Your Access Mode</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.accessMode === 'self-guided'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => setFormData({...formData, accessMode: 'self-guided'})}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-primary text-sm">Self-Guided</h4>
                    <p className="text-xs text-gray-400">Start therapy independently with AI assistance</p>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.accessMode === 'therapist-guided'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => setFormData({...formData, accessMode: 'therapist-guided'})}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-primary text-sm">Therapist-Guided</h4>
                    <p className="text-xs text-gray-400">Professional supervision and health reports</p>
                  </div>
                </div>
              </div>

              {formData.accessMode === 'therapist-guided' && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Therapist-guided mode requires age verification and admin approval.
                    You'll be redirected to complete this process after registration.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 mt-1"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
              I agree to the{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="gaming-btn w-full relative"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'CREATE ACCOUNT'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Social Sign Up */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>
          
          <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            Sign up with Twitter
          </button>
        </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-secondary">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary-blue font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

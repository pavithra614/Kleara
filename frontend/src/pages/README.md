# Pages Structure

This directory contains the main page components that represent different routes in the application.

## Directory Structure

```
pages/
├── Home.jsx      # Main dashboard page (refactored from complex component)
├── SignIn.jsx    # User authentication - sign in page
└── SignUp.jsx    # User authentication - sign up page
```

## Pages Overview

### Home.jsx
The main dashboard page that was refactored from a complex 800+ line component into a clean, maintainable structure:

**Key Features:**
- User profile and progress display
- Therapy method selection (for therapist-guided users)
- Communication skills tracking
- Health reports and analytics
- Therapy activities
- Recent sessions
- AI translation hub
- Therapist connection

**Component Composition:**
The Home page now composes multiple smaller components:
- UI components for basic display elements
- Therapy components for therapy-specific functionality
- Dashboard components for complex dashboard features

### SignIn.jsx
User authentication page for signing into the application.

### SignUp.jsx
User registration page for creating new accounts.

## Refactoring Benefits

The Home page was refactored from a monolithic 800+ line component to a clean composition of smaller components:

**Before:**
- Single large file with 800+ lines
- Mixed concerns and responsibilities
- Difficult to maintain and debug
- Hard to reuse functionality

**After:**
- Clean page component that composes smaller components
- Separated concerns by functionality
- Easy to maintain and extend
- Reusable components across the application
- Better error isolation and debugging

## Usage in Routing

Pages are imported in `App.jsx` for routing:

```javascript
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Used in Routes
<Route path="/home" element={<Home />} />
<Route path="/signin" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />
```

## Adding New Pages

When adding new pages:
1. Create the page component in this directory
2. Import and use appropriate components from `/components`
3. Add the route in `App.jsx`
4. Follow the same composition pattern as the Home page

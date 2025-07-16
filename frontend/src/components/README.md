# Components Structure

This directory contains reusable components organized by their purpose and functionality.

## Directory Structure

```
components/
├── ui/                     # Basic UI components
│   ├── Header.jsx         # Application header with user info and navigation
│   ├── ProgressCard.jsx   # Overall progress display card
│   ├── CommunicationSkillsCard.jsx  # Communication skills progress
│   ├── AchievementsCard.jsx         # Therapy milestones and achievements
│   └── index.js           # Barrel exports for clean imports
│
├── therapy/               # Therapy-specific components
│   ├── TherapyMethodToggle.jsx      # Toggle between self-guided and supervised
│   ├── TherapyActivitiesCard.jsx    # Therapy activity buttons and options
│   └── index.js           # Barrel exports for clean imports
│
├── speech-practice/       # Speech practice gamified activities
│   ├── games/            # Individual game components
│   │   ├── SoundSafari.jsx          # Jungle adventure sound practice
│   │   ├── BuildAWordLab.jsx        # Drag-and-drop word building
│   │   ├── MagicMirror.jsx          # Voice morphing feedback game
│   │   ├── SoundSorter.jsx          # Sound discrimination puzzle
│   │   ├── KnightOfSounds.jsx       # RPG-style final consonant practice
│   │   └── index.js                 # Game component exports
│   ├── shared/           # Shared speech practice components
│   │   ├── SpeechRecognition.jsx    # Mock speech recognition system
│   │   ├── GameProgress.jsx         # Progress tracking component
│   │   ├── GameFeedback.jsx         # AI feedback display component
│   │   └── index.js                 # Shared component exports
│   └── index.js          # Main speech practice exports
│
└── dashboard/             # Dashboard-specific components
    ├── HealthReportsCard.jsx        # Health reports and analytics (therapist-guided)
    ├── RecentSessionsCard.jsx       # Recent therapy sessions display
    ├── AITranslationHubCard.jsx     # AI translation features
    ├── TherapistConnectionCard.jsx  # Therapist connection and session info
    └── index.js           # Barrel exports for clean imports
```

## Component Categories

### UI Components (`/ui`)
Basic, reusable UI components that can be used across different pages:
- **Header**: Application header with user information and navigation buttons
- **ProgressCard**: Displays overall therapy progress with visual progress bar
- **CommunicationSkillsCard**: Shows progress in different communication skills
- **AchievementsCard**: Displays therapy milestones and achievements

### Therapy Components (`/therapy`)
Components specifically related to therapy functionality:
- **TherapyMethodToggle**: Allows switching between self-guided and therapist-supervised modes
- **TherapyActivitiesCard**: Displays available therapy activities with different states based on mode

### Dashboard Components (`/dashboard`)
Components that make up the main dashboard functionality:
- **HealthReportsCard**: Shows health reports and analytics (only for therapist-guided users)
- **RecentSessionsCard**: Displays recent therapy sessions with progress indicators
- **AITranslationHubCard**: AI-powered translation and communication features
- **TherapistConnectionCard**: Therapist connection status and session controls

## Usage

Components can be imported individually or using barrel exports:

```javascript
// Individual imports
import Header from '../components/ui/Header';
import ProgressCard from '../components/ui/ProgressCard';

// Barrel imports (recommended)
import { Header, ProgressCard } from '../components/ui';
import { TherapyMethodToggle } from '../components/therapy';
import { HealthReportsCard } from '../components/dashboard';
```

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused across different pages
3. **Maintainability**: Easier to locate and modify specific functionality
4. **Scalability**: Easy to add new components in appropriate categories
5. **Clean Imports**: Barrel exports provide cleaner import statements
6. **Error Prevention**: Smaller components reduce complexity and potential bugs

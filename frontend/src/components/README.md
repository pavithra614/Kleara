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
├── hearing-practice/      # Hearing practice auditory activities
│   ├── games/            # Individual hearing game components
│   │   ├── SoundHideAndSeek.jsx     # Puppy hiding directional sound detection
│   │   ├── WheresTheSound.jsx       # Toy sound explorer matching game
│   │   ├── PopSoundBubbles.jsx      # Bubble popping sound detection
│   │   ├── SleepyTeddyWakeUp.jsx    # Teddy wake-up sound-response game
│   │   └── index.js                 # Hearing game component exports
│   ├── shared/           # Shared hearing practice components
│   │   ├── AudioPlayer.jsx          # Audio playback and control system
│   │   ├── SoundDetection.jsx       # Sound detection and feedback
│   │   ├── HearingProgress.jsx      # Hearing-specific progress tracking
│   │   └── index.js                 # Shared hearing component exports
│   └── index.js          # Main hearing practice exports
│
├── sign-language/        # Sign language therapy with AI-based lessons
│   ├── lessons/          # Individual lesson components
│   │   ├── BasicSigns.jsx           # Lesson 1: Essential basic signs
│   │   ├── FamilySigns.jsx          # Lesson 2: Family member signs
│   │   ├── SimplePhrases.jsx        # Lesson 3: Combining signs into phrases
│   │   ├── EverydayObjects.jsx      # Lesson 4: Common everyday objects
│   │   ├── PracticeReinforcement.jsx # Lesson 5: Review and reinforcement
│   │   └── index.js                 # Lesson component exports
│   ├── shared/           # Shared sign language components
│   │   ├── GestureRecognition.jsx   # Mock AI gesture recognition system
│   │   ├── SignLearning.jsx         # Sign learning interface with tutorials
│   │   ├── AIFeedback.jsx           # AI feedback and progress tracking
│   │   ├── HandTracking.jsx         # Hand tracking visualization
│   │   └── index.js                 # Shared sign language exports
│   └── index.js          # Main sign language exports
│
├── sign-language/        # Sign language therapy with AI and computer vision
│   ├── lessons/          # Individual lesson components
│   │   ├── BasicSigns.jsx           # Lesson 1: Introduction to basic signs
│   │   ├── FamilyMembers.jsx        # Lesson 2: Signs for family members
│   │   ├── SimplePhrases.jsx        # Lesson 3: Simple phrase combinations
│   │   ├── EverydayObjects.jsx      # Lesson 4: Common everyday objects
│   │   ├── PracticeReinforcement.jsx # Lesson 5: Practice and reinforcement
│   │   └── index.js                 # Lesson component exports
│   ├── shared/           # Shared sign language components
│   │   ├── GestureRecognition.jsx   # Mock computer vision gesture tracking
│   │   ├── HandTracking.jsx         # Hand position tracking and feedback
│   │   ├── SignProgress.jsx         # Sign language progress tracking
│   │   ├── VoiceToSign.jsx          # Voice-to-sign translation component
│   │   ├── SignFeedback.jsx         # Real-time sign feedback system
│   │   └── index.js                 # Shared sign language exports
│   └── index.js          # Main sign language exports
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

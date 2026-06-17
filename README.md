# Quizzie - JSON-Based Quiz Application

A modern, efficient quiz application built with TypeScript that uses JSON to manage quiz data. The application supports both multiple-choice and open-ended questions with a clean state management system.

## Features

- ✅ **JSON-Based Quiz Data**: All quiz content is stored in JSON format for easy management and updates
- ✅ **State Machine Architecture**: Clean game state management with INTRO, QUESTION, and END states
- ✅ **Object-Oriented Design**: Base `Question` class with derived `MultipleChoiceQuestion` and `OpenQuestion` classes
- ✅ **Multiple Question Types**: Support for multiple-choice and open-ended questions
- ✅ **Flexible Answer Checking**: Handles exact matches and case-insensitive comparisons
- ✅ **Scoring System**: Automatic calculation of correct answers and score percentage
- ✅ **Browser-Based UI**: Beautiful, responsive web interface with modern design
- ✅ **TypeScript**: Fully typed codebase for type safety and better development experience

## Project Structure

```
Quizzie/
├── TS/
│   ├── models/
│   │   ├── Question.ts      # Base Question class and derived types
│   │   ├── QuizData.ts      # Quiz class and data interface
│   │   └── GameState.ts     # GameState enum
│   ├── quizzes/
│   │   ├── quiz1.json       # History quiz data
│   │   └── quiz2.json       # Science quiz data
│   └── app.ts               # Main application logic
├── Html/
│   └── quiz-browser.html    # Browser-based quiz interface
├── CSS/                     # Styling files
├── dist/                    # Compiled JavaScript output
├── package.json             # Project dependencies
└── tsconfig.json            # TypeScript configuration
```

## JSON Quiz Format

```json
{
  "title": "Quiz Title",
  "introduction": {
    "title": "Welcome Title",
    "text": "Introduction text explaining the quiz..."
  },
  "questions": [
    {
      "type": "MULTIPLECHOICE",
      "question": "Question text?",
      "answers": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Option 1"
    },
    {
      "type": "OPEN",
      "question": "What is your answer?",
      "correctAnswer": ["Answer 1", "Answer 2"]
    }
  ]
}
```

## Class Structure

### Question Classes

#### Base Class: `Question`
```typescript
abstract class Question {
    type: "MULTIPLECHOICE" | "OPEN";
    question: string;
    correctAnswer: string | string[];
    abstract checkAnswer(userAnswer: string): boolean;
}
```

#### MultipleChoiceQuestion
```typescript
class MultipleChoiceQuestion extends Question {
    answers: string[];
    checkAnswer(userAnswer: string): boolean;
}
```

#### OpenQuestion
```typescript
class OpenQuestion extends Question {
    checkAnswer(userAnswer: string): boolean;
}
```

### Game State Machine

```typescript
enum GameState {
    INTRO = "INTRO",      // Show introduction
    QUESTION = "QUESTION", // Show questions
    END = "END"           // Show results
}
```

### Quiz Manager

```typescript
class Quiz {
    title: string;
    introduction: { title: string; text: string };
    questions: Question[];
    currentQuestionIndex: number;
    correctAnswers: number;
    
    getCurrentQuestion(): Question;
    nextQuestion(): boolean;
    isComplete(): boolean;
    getTotalQuestions(): number;
    getScorePercentage(): number;
}
```

## Usage

### In Browser

1. Compile TypeScript:
```bash
tsc
```

2. Open `Html/quiz-browser.html` in your browser

3. The application will:
   - Display the quiz introduction
   - Show questions one at a time
   - Provide feedback on answers
   - Display final results with score percentage

### Application Flow

```
START
  ↓
Load Quiz JSON
  ↓
INTRO → [Show title & introduction] → User clicks "Start"
  ↓
QUESTION → [Display question & options] → User submits answer
  ↓
Check answer → Update score → Is quiz complete?
  ↓ (No)
[Next Question] → QUESTION
  ↓ (Yes)
END → [Show results] → User can restart or choose new quiz
  ↓
Restart / Change Quiz
```

## Selecting a Quiz

You can change which quiz file is loaded by:

1. **In Browser**: Click "Choose Different Quiz" button after completing a quiz
2. **In Code**: Modify the `quizFile` variable:
```typescript
const app = new QuizApplication();
await app.initialize("TS/quizzes/quiz2.json"); // Load different quiz
```

## Creating Your Own Quiz

1. Create a new JSON file in `TS/quizzes/`:
```json
{
  "title": "My Custom Quiz",
  "introduction": {
    "title": "Welcome",
    "text": "Instructions here..."
  },
  "questions": [
    // Add your questions here
  ]
}
```

2. Reference it in your application:
```typescript
await app.initialize("TS/quizzes/myquiz.json");
```

## Answer Handling

### Multiple Choice
- Answers are checked case-insensitively
- User must select one of the provided options
- Exact match required

### Open Questions
- Supports single or multiple correct answers
- Case-insensitive comparison
- Whitespace trimmed automatically
- Useful for questions with multiple valid answers

Example:
```json
{
  "type": "OPEN",
  "question": "Who discovered America?",
  "correctAnswer": ["Christopher Columbus", "columbus"]
}
```

## Scoring

- Each correct answer counts as 1 point
- Final score is calculated as: `(correct answers / total questions) × 100`
- Percentage is displayed on the end screen

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Dependencies

- TypeScript 6.0.3 (or later)
- Modern browser with ES6+ support

## Building from Source

1. Install dependencies:
```bash
npm install
```

2. Compile TypeScript:
```bash
tsc
```

3. The compiled JavaScript will be in the `dist/` directory

## Future Enhancements

- [ ] Console-based CLI version
- [ ] Quiz timer functionality
- [ ] Difficulty levels
- [ ] Quiz categories
- [ ] Leaderboard system
- [ ] Question shuffling
- [ ] Image support in questions
- [ ] Export quiz results
- [ ] Admin panel for quiz management

## License

ISC

## Author

NexusSnakeZ

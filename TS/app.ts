import { Quiz, IQuizData } from "./models/QuizData";
import { GameState } from "./models/GameState";

/**
 * Main Quiz Application class
 */
class QuizApplication {
    private quiz: Quiz | null = null;
    private currentState: GameState = GameState.INTRO;
    private quizContainer: HTMLElement | null = null;
    private feedbackElement: HTMLElement | null = null;

    /**
     * Initialize the quiz application
     */
    async initialize(quizFile: string = "TS/quizzes/quiz.json"): Promise<void> {
        try {
            const response = await fetch(quizFile);
            const quizData: IQuizData = await response.json();
            this.quiz = new Quiz(quizData);
            this.setupEventListeners();
            this.showIntro();
        } catch (error) {
            console.error("Failed to load quiz:", error);
        }
    }

    /**
     * Setup DOM element references and event listeners
     */
    private setupEventListeners(): void {
        this.quizContainer = document.getElementById("quiz");
        this.feedbackElement = document.getElementById("feedback");

        const startButton = document.getElementById("startQuiz");
        const submitButton = document.getElementById("submitAnswer");
        const nextButton = document.getElementById("nextQuestion");

        if (startButton) {
            startButton.addEventListener("click", () => this.startQuiz());
        }
        if (submitButton) {
            submitButton.addEventListener("click", () => this.submitAnswer());
        }
        if (nextButton) {
            nextButton.addEventListener("click", () => this.nextQuestion());
        }
    }

    /**
     * Show the introduction screen
     */
    private showIntro(): void {
        if (!this.quiz || !this.quizContainer) return;

        this.currentState = GameState.INTRO;
        this.quizContainer.innerHTML = `
            <div class="intro-screen">
                <h1>${this.quiz.introduction.title}</h1>
                <p>${this.quiz.introduction.text}</p>
                <button id="startQuiz" class="btn btn-primary">Start Quiz</button>
            </div>
        `;
        this.setupEventListeners();
    }

    /**
     * Start the quiz
     */
    private startQuiz(): void {
        this.currentState = GameState.QUESTION;
        this.showQuestion();
    }

    /**
     * Display the current question
     */
    private showQuestion(): void {
        if (!this.quiz || !this.quizContainer) return;

        const question = this.quiz.getCurrentQuestion();
        if (!question) {
            this.showResults();
            return;
        }

        const questionNumber = this.quiz.currentQuestionIndex + 1;
        const totalQuestions = this.quiz.getTotalQuestions();

        let questionHTML = `
            <div class="question-screen">
                <div class="question-header">
                    <h2>Question ${questionNumber} of ${totalQuestions}</h2>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(questionNumber / totalQuestions) * 100}%"></div>
                    </div>
                </div>
                <div class="question-content">
                    <p class="question-text">${question.question}</p>
        `;

        if (question.type === "MULTIPLECHOICE") {
            const answers = (question as any).answers;
            questionHTML += `<div class="answer-options">`;
            answers.forEach((answer: string, index: number) => {
                questionHTML += `
                    <button class="answer-btn" data-answer="${answer}">
                        ${String.fromCharCode(65 + index)}) ${answer}
                    </button>
                `;
            });
            questionHTML += `</div>`;
        } else {
            questionHTML += `
                <div class="answer-input">
                    <input type="text" id="answerInput" placeholder="Type your answer..." />
                    <button id="submitAnswer" class="btn btn-primary">Submit Answer</button>
                </div>
            `;
        }

        questionHTML += `
                </div>
                <div id="feedback" class="feedback"></div>
            </div>
        `;

        this.quizContainer.innerHTML = questionHTML;

        // Add event listeners for multiple choice answers
        if (question.type === "MULTIPLECHOICE") {
            const answerButtons = document.querySelectorAll(".answer-btn");
            answerButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    const selectedAnswer = (e.target as HTMLElement).getAttribute("data-answer");
                    this.checkAnswer(selectedAnswer || "");
                });
            });
        } else {
            this.setupEventListeners();
        }
    }

    /**
     * Submit answer for open-ended questions
     */
    private submitAnswer(): void {
        const answerInput = document.getElementById("answerInput") as HTMLInputElement;
        if (answerInput) {
            this.checkAnswer(answerInput.value);
        }
    }

    /**
     * Check if the answer is correct
     */
    private checkAnswer(userAnswer: string): void {
        if (!this.quiz || !this.feedbackElement || !this.quizContainer) return;

        const question = this.quiz.getCurrentQuestion();
        if (!question) return;

        const isCorrect = question.checkAnswer(userAnswer);

        if (isCorrect) {
            this.quiz.recordCorrectAnswer();
            this.feedbackElement.innerText = "✓ Correct!";
            this.feedbackElement.className = "feedback green-text";
            this.quizContainer.classList.add("fade-out");

            setTimeout(() => {
                if (this.quiz && !this.quiz.isComplete()) {
                    this.quiz.nextQuestion();
                    this.quizContainer?.classList.remove("fade-out");
                    this.showQuestion();
                } else {
                    this.showResults();
                }
            }, 1500);
        } else {
            this.feedbackElement.innerText = "✗ Incorrect!";
            this.feedbackElement.className = "feedback red-text";
            this.quizContainer.classList.add("flash-red");

            setTimeout(() => {
                this.quizContainer?.classList.remove("flash-red");
            }, 500);
        }
    }

    /**
     * Move to next question
     */
    private nextQuestion(): void {
        if (!this.quiz) return;

        if (this.quiz.nextQuestion()) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    /**
     * Display final results
     */
    private showResults(): void {
        if (!this.quiz || !this.quizContainer) return;

        this.currentState = GameState.END;
        const percentage = this.quiz.getScorePercentage();
        const correct = this.quiz.correctAnswers;
        const total = this.quiz.getTotalQuestions();

        let message = "Great job!";
        if (percentage < 50) {
            message = "Keep practicing!";
        } else if (percentage < 75) {
            message = "Good effort!";
        } else if (percentage < 90) {
            message = "Excellent work!";
        } else {
            message = "Outstanding!";
        }

        this.quizContainer.innerHTML = `
            <div class="results-screen">
                <h1>Quiz Complete!</h1>
                <p class="message">${message}</p>
                <div class="score">
                    <p class="score-text">Your Score</p>
                    <div class="score-circle">
                        <p class="score-percentage">${percentage}%</p>
                    </div>
                    <p class="score-details">${correct} out of ${total} correct</p>
                </div>
                <button id="restartQuiz" class="btn btn-primary">Take Quiz Again</button>
                <button id="changeQuiz" class="btn btn-secondary">Choose Different Quiz</button>
            </div>
        `;

        const restartButton = document.getElementById("restartQuiz");
        const changeButton = document.getElementById("changeQuiz");

        if (restartButton) {
            restartButton.addEventListener("click", () => {
                this.quiz?.reset();
                this.showIntro();
            });
        }

        if (changeButton) {
            changeButton.addEventListener("click", () => {
                // Could implement quiz selection here
                this.quiz?.reset();
                this.showIntro();
            });
        }
    }
}

// Initialize the application when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const app = new QuizApplication();
    app.initialize("TS/quizzes/quiz.json");
});

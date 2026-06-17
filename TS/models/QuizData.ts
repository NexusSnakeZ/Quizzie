import { Question, MultipleChoiceQuestion, OpenQuestion } from "./Question";

/**
 * Interface for quiz JSON data
 */
export interface IQuizData {
    title: string;
    introduction: {
        title: string;
        text: string;
    };
    questions: IQuestionData[];
}

/**
 * Interface for question data from JSON
 */
export interface IQuestionData {
    type: "MULTIPLECHOICE" | "OPEN";
    question: string;
    answers?: string[];
    correctAnswer: string | string[];
}

/**
 * Quiz manager class
 */
export class Quiz {
    public title: string;
    public introduction: { title: string; text: string };
    public questions: Question[];
    public currentQuestionIndex: number = 0;
    public correctAnswers: number = 0;

    constructor(data: IQuizData) {
        this.title = data.title;
        this.introduction = data.introduction;
        this.questions = this.parseQuestions(data.questions);
    }

    /**
     * Parse question data from JSON and create Question instances
     */
    private parseQuestions(questionData: IQuestionData[]): Question[] {
        return questionData.map((q) => {
            if (q.type === "MULTIPLECHOICE") {
                return new MultipleChoiceQuestion(
                    q.question,
                    q.answers || [],
                    q.correctAnswer as string
                );
            } else {
                return new OpenQuestion(q.question, q.correctAnswer);
            }
        });
    }

    /**
     * Get the current question
     */
    getCurrentQuestion(): Question | null {
        if (this.currentQuestionIndex < this.questions.length) {
            return this.questions[this.currentQuestionIndex];
        }
        return null;
    }

    /**
     * Move to the next question
     */
    nextQuestion(): boolean {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    /**
     * Check if quiz is complete
     */
    isComplete(): boolean {
        return this.currentQuestionIndex >= this.questions.length - 1;
    }

    /**
     * Get total number of questions
     */
    getTotalQuestions(): number {
        return this.questions.length;
    }

    /**
     * Get score percentage
     */
    getScorePercentage(): number {
        return Math.round((this.correctAnswers / this.questions.length) * 100);
    }

    /**
     * Record a correct answer
     */
    recordCorrectAnswer(): void {
        this.correctAnswers++;
    }

    /**
     * Reset the quiz
     */
    reset(): void {
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
    }
}

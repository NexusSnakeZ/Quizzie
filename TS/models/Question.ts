/**
 * Base abstract class for all question types
 */
export abstract class Question {
    public type: "MULTIPLECHOICE" | "OPEN";
    public question: string;
    public correctAnswer: string | string[];

    constructor(
        type: "MULTIPLECHOICE" | "OPEN",
        question: string,
        correctAnswer: string | string[]
    ) {
        this.type = type;
        this.question = question;
        this.correctAnswer = correctAnswer;
    }

    /**
     * Check if the provided answer is correct
     */
    abstract checkAnswer(userAnswer: string): boolean;
}

/**
 * Multiple choice question class
 */
export class MultipleChoiceQuestion extends Question {
    public answers: string[];

    constructor(
        question: string,
        answers: string[],
        correctAnswer: string
    ) {
        super("MULTIPLECHOICE", question, correctAnswer);
        this.answers = answers;
    }

    checkAnswer(userAnswer: string): boolean {
        return userAnswer.toLowerCase() === this.correctAnswer.toString().toLowerCase();
    }
}

/**
 * Open question class
 */
export class OpenQuestion extends Question {
    constructor(question: string, correctAnswer: string | string[]) {
        super("OPEN", question, correctAnswer);
    }

    checkAnswer(userAnswer: string): boolean {
        const userAnswerLower = userAnswer.toLowerCase().trim();
        
        if (Array.isArray(this.correctAnswer)) {
            return this.correctAnswer.some(
                answer => userAnswerLower === answer.toLowerCase().trim()
            );
        }
        
        return userAnswerLower === this.correctAnswer.toString().toLowerCase().trim();
    }
}

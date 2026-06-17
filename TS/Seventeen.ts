function checkAnswer() {
    const correctAnswer = "Asia Africa North America"; // Exact answer required

    // Get the input element and cast it to HTMLInputElement
    const userAnswerInput = document.getElementById("answerInput") as HTMLInputElement | null;
    const feedback = document.getElementById("feedback") as HTMLElement | null;
    const quizContainer = document.getElementById("quiz") as HTMLElement | null;

    if (!userAnswerInput || !feedback || !quizContainer) {
        console.error("Required DOM elements are missing.");
        return;
    }

    const userAnswer = userAnswerInput.value;

    if (userAnswer === correctAnswer) {
        feedback.innerText = "Correct!";
        feedback.className = "green-text";

        // Fade out and redirect after 1.5 seconds
        setTimeout(() => {
            quizContainer.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "Eighteen.html";
            }, 1500);
        }, 500);
    } else {
        feedback.innerText = "Incorrect!";
        feedback.className = "red-text";

        // Flash red background
        quizContainer.classList.add("flash-red");
        setTimeout(() => quizContainer.classList.remove("flash-red"), 500);
    }
}
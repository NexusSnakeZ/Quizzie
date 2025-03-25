function checkAnswer() {
    const correctAnswer = "Asia Africa North America";  // Exact answer required
    const userAnswer = document.getElementById("answerInput").value;
    const feedback = document.getElementById("feedback");
    const quizContainer = document.getElementById("quiz");

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
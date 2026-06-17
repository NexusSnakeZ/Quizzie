function checkAnswer(element, selectedAnswer) {
    const correctAnswer = "2"; //here is the right answer 
    const feedback = document.getElementById("feedback");
    const quizContainer = document.getElementById("quiz");

    if (selectedAnswer === correctAnswer) {
        element.classList.add("correct"); //causes positive feedback if correct
        feedback.innerText = "Correct!";
        feedback.className = "green-text"; 

        //  adds a Fade out and redirect after 1.5 seconds
        setTimeout(() => {
            quizContainer.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "Ten.html"; 
            }, 1500);
        }, 500);
    } else {
        element.classList.add("incorrect"); //causes negative feedback if answer is incorrect
        feedback.innerText = "Incorrect!";
        feedback.className = "red-text";

        // Flash red background
        quizContainer.classList.add("flash-red");
        setTimeout(() => {
            quizContainer.classList.remove("flash-red");
            element.classList.remove("incorrect");
        }, 500);
    }
}

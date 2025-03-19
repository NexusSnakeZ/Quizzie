// Click on button to start quiz
// Done 

// Show question and answers 
// Done

// After answering question, check if answer is correct or not
// EventHandler (click) to check value of multiple choice
// Check against correct answers ?

// If correct - change UI to show that it was correct (flash green ?)
// documentGetElementbyID change styling

// If incorrect - flashes red, incorrect 
// documentGetElementbyID change styling
function checkAnswer(element, selectedAnswer) {
    const correctAnswer = "Paris";  
    const feedback = document.getElementById("feedback");
    const quizContainer = document.getElementById("quiz");

    if (selectedAnswer === correctAnswer) {
        element.classList.add("correct");
        feedback.innerText = "Correct!";
        feedback.className = "green-text"; 

        // Fade out and redirect after 1.5 seconds
        setTimeout(() => {
            quizContainer.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "next-page.html"; 
            }, 1500);
        }, 500);
    } else {
        element.classList.add("incorrect");
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

//Quiz typewriter functions
// Splits the text into sentences or phrases
const sentences = [
    "Welcome to the final part of the quiz!",
    "You ready for the final challenge?",
    "If you are click the button to continue!"
];

const speed = 80; // Typing speed in milliseconds
const delayBetweenSentences = 1000; // Delay between sentences (in ms)
const deleteSpeed = 50; // Speed at which text is deleted
let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentSentence = sentences[sentenceIndex];

    // If not deleting, type the sentence
    if (!isDeleting) {
        if (charIndex < currentSentence.length) {
            document.getElementById("typewriter").textContent += currentSentence.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed); // Continue typing the next character
        } else {
            // Once the sentence is typed, start deleting after a short delay
            isDeleting = true;
            setTimeout(typeWriter, delayBetweenSentences); // Delay before starting deletion
        }
    } else {
        // If deleting, remove one character at a time
        if (charIndex > 0) {
            document.getElementById("typewriter").textContent = currentSentence.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, deleteSpeed); // Continue deleting the next character
        } else {
            // Once the sentence is fully deleted, move to the next sentence
            isDeleting = false;
            sentenceIndex++;
            setTimeout(typeWriter, delayBetweenSentences); // Delay before typing the next sentence
        }
    }
}

// Start typing after a 3-second delay
setTimeout(() => {
    typeWriter();
}, 3000); // 3 seconds delay before starting the typing effect


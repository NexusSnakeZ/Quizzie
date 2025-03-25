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
//multiple choice question  code 
function checkAnswer(element, selectedAnswer) {
    const correctAnswer = "Paris"; //here is the right answer 
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
                window.location.href = "next-page.html"; 
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

//Sliderbar question 

document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById("Sliderquestion");
    var selector = document.getElementById("selector");
    var SelectValue = document.getElementById("SelectValue");
    var submitBtn = document.getElementById("submitBtn");
    
    // Initialize
    SelectValue.innerHTML = slider.value;
    updateSelectorPosition(slider.value);
    
    slider.oninput = function() {
        SelectValue.innerHTML = this.value;
        updateSelectorPosition(this.value);
    };
    
    function updateSelectorPosition(value) {
        var sliderWidth = slider.offsetWidth;
        var thumbPosition = (value / 100) * sliderWidth;
        selector.style.left = thumbPosition + "px";
    }
    
    submitBtn.addEventListener('click', function() {
        var userAnswer = parseInt(slider.value);
        var correctAnswer = 75; // Set your correct answer here
        
        if (userAnswer === correctAnswer) {
            // Proceed to next page
            window.location.href = "next-page.html"; // Change to your question page
        } else {
            alert("Incorrect answer. Try again!");
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        updateSelectorPosition(slider.value);
    });
});
 

//open question 

document.getElementById("checkButton").addEventListener("click", function () {
    // Predefined correct answer
    const correctAnswer = "Paris";
  
    // Get the user's answer
    const userAnswer = document.getElementById("userAnswer").value.trim();
  
    // Check if the user's answer matches the correct answer
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      document.getElementById("result").textContent = "Correct! ";
      document.getElementById("result").style.color = "green";
    } else {
      document.getElementById("result").textContent = "Incorrect. Try again! ";
      document.getElementById("result").style.color = "red";
    }
  });



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
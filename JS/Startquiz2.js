const sentences = [
    "Welcome to the final part of the quiz!",
    "You ready for the final challenge?",
    "If you are, click the button to continue!"
];

const speed = 80;
const delayBetweenSentences = 1000;
const deleteSpeed = 50;
let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const typewriterElement = document.getElementById("typewriter");
    const currentSentence = sentences[sentenceIndex];

    if (!isDeleting) {
        if (charIndex < currentSentence.length) {
            typewriterElement.textContent += currentSentence.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed);
        } else {
            isDeleting = true;
            setTimeout(typeWriter, delayBetweenSentences);
        }
    } else {
        if (charIndex > 0) {
            typewriterElement.textContent = currentSentence.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, deleteSpeed);
        } else {
            isDeleting = false;
            sentenceIndex++;

            if (sentenceIndex < sentences.length) {
                setTimeout(typeWriter, delayBetweenSentences);
            } else {
                document.getElementById("nextButton").style.display = "block"; // Show button
                document.getElementById("nextButton").style.opacity = "1";
            }
        }
    }
}

function nextPage() {
    const sound = document.getElementById("clickSound");
    sound.play(); // Play button click sound
    document.body.style.opacity = "0"; // Fade out effect
    setTimeout(() => {
        window.location.href = "nextpage.html"; // Redirect after fade
    }, 4000); // Now waits 4 seconds before redirecting
}


// Ensure the page starts fully visible
document.body.style.opacity = "1";

setTimeout(() => {
    typeWriter();
}, 3000);
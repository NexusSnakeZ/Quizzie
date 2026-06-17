function newQuiz() {
    playSound(); // Play the sound first
    setTimeout(() => {
        window.location.href = "../../Html/Quiz2/SecondQuiz.html"; 
    }, 1000); // Adjust time (milliseconds) based on sound length
}

function goToMainMenu() {
    playSound(); // Play the sound first
    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000); // Adjust delay to match sound duration
}

function playSound() {
    const sound = document.getElementById("buttonSound");
    sound.currentTime = 0; // Reset audio to start
    sound.play(); // Play sound
}


const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];

function createConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 + 1
        });
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateConfetti);
}

createConfetti();
animateConfetti();

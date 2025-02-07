const topics = ["Giraffe", "Spaceship", "Underwater City", "Flying Car", "Magical Forest"];

const topicDisplay = document.getElementById('topic-display');
const generateButton = document.getElementById('generate-button');
const timerInput = document.getElementById('timer-input');
const timerDisplay = document.getElementById('timer-display');
const slider = document.getElementById('slider');
const sliderItem = document.getElementById('slider-item');
const announcerText = document.getElementById('announcer-text');

let timerInterval;
let currentTopicIndex = 0;

function initializeSlider() {
    topics.forEach((topic, index) => {
        const topicElement = document.createElement('div');
        topicElement.classList.add('slider-topic');
        topicElement.textContent = topic;
        topicElement.style.left = `${index * 100}%`;
        slider.appendChild(topicElement);
    });
}

function generateTopic() {
    clearInterval(timerInterval);
    announcerText.textContent = "And the topic is...";
    announcerText.classList.add('announcer-animate');

    sliderItem.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
    currentTopicIndex = Math.floor(Math.random() * topics.length);
    sliderItem.style.transform = `translateX(-${currentTopicIndex * 100}%)`;

    setTimeout(() => {
        const selectedTopic = topics[currentTopicIndex];
        topicDisplay.textContent = selectedTopic;
        announcerText.textContent = `${selectedTopic}!`;
        startTimer();
    }, 3000);

    setTimeout(() => {
        announcerText.classList.remove('announcer-animate');
    }, 4000);
}

function startTimer() {
    let timeLeft = parseInt(timerInput.value, 10);
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            announcerText.textContent = "Time's up!";
            announcerText.classList.add('announcer-animate');
            setTimeout(() => {
                announcerText.classList.remove('announcer-animate');
            }, 2000);
        }
    }, 1000);
}

generateButton.addEventListener('click', generateTopic);

// Initialize particles.js
particlesJS('particles', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Glitch effect for the title
const glitchElement = document.querySelector('.glitch');
setInterval(() => {
    glitchElement.classList.add('glitch-effect');
    setTimeout(() => {
        glitchElement.classList.remove('glitch-effect');
    }, 200);
}, 3000);

// Initialize the slider
initializeSlider();

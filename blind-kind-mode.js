// blind-kind-mode.js

// Blind-Kind Rules
const blindKindRules = [
    {
        name: "Ugly Duckling",
        description: "The ugliest drawing wins! Embrace imperfection and create the most unappealing artwork possible.",
        criteria: "Judges will look for intentionally poor aesthetics, awkward compositions, and unconventional color choices."
    },
    {
        name: "Minimalist Masterpiece",
        description: "Less is more. Create a drawing using the fewest possible lines or shapes while still conveying the prompt.",
        criteria: "Judges will evaluate based on simplicity, clarity of concept, and effective use of negative space."
    },
    {
        name: "Sensory Overload",
        description: "Overwhelm the senses! Your drawing should be as busy, colorful, and complex as possible.",
        criteria: "Judges will look for intricate details, a wide color palette, and multiple layers of visual information."
    },
    {
        name: "Emotion",
        description: "Focus on evoking a strong emotion through your art, regardless of technical skill or realism.",
        criteria: "Judges will assess the emotional impact of the piece, use of color and composition to convey feeling."
    },
    {
        name: "Unpredictable",
        description: "Reimagine the prompt as if it existed in a completely different reality or dimension.",
        criteria: "Judges will evaluate creativity in world-building, unique interpretations, and imaginative details."
    }
];

// DOM Elements
const categorySelect = document.getElementById('category-select');
const generateButton = document.getElementById('generate-button');
const currentTopic = document.getElementById('current-topic');
const timerInput = document.getElementById('timer-input');
const timerDisplay = document.getElementById('timer-display');
const topicHistory = document.getElementById('topic-history');
const topicSlider = document.getElementById('topic-slider');

// Global variables
let isBlindKindMode = false;
let currentRule = null;
let timerInterval = null;
let isRuleRevealed = false;

// Add Blind-Kind option to category select
function addBlindKindOption() {
    const option = document.createElement('option');
    option.value = 'blind-kind';
    option.textContent = 'Blind-Kind Mode';
    categorySelect.appendChild(option);
}

// Initialize Blind-Kind Mode
function initBlindKindMode() {
    addBlindKindOption();
    categorySelect.addEventListener('change', handleCategoryChange);
    generateButton.addEventListener('click', handleGenerateClick);
}

// Handle category change
function handleCategoryChange(event) {
    isBlindKindMode = event.target.value === 'blind-kind';
    updateUI();
}

// Update UI based on mode
function updateUI() {
    if (isBlindKindMode) {
        generateButton.textContent = 'START BLIND-KIND';
        currentTopic.textContent = 'Blind-Kind Mode Active';
        clearSlider();
    } else {
        generateButton.textContent = 'SLIDE';
        currentTopic.textContent = 'Results appear here';
        // Restore normal slider functionality
    }
    isRuleRevealed = false;
}

// Clear slider for Blind-Kind Mode
function clearSlider() {
    topicSlider.innerHTML = '';
}

// Handle generate button click
function handleGenerateClick() {
    if (isBlindKindMode) {
        if (!isRuleRevealed) {
            startBlindKindRound();
        } else {
            revealBlindKindRule();
        }
    } else {
        // Normal topic generation logic
    }
}

// Start Blind-Kind round
function startBlindKindRound() {
    currentRule = getRandomRule();
    isRuleRevealed = false;
    Swal.fire({
        title: 'Blind-Kind Round Started!',
        text: 'The hidden rule has been set. Start drawing based on the regular prompt. The rule will be revealed when the timer ends!',
        icon: 'info',
        confirmButtonText: 'Begin Drawing'
    }).then(() => {
        currentTopic.textContent = 'Hidden Rule Set - Draw Normally';
        generateButton.textContent = 'REVEAL RULE (for testing)';
        startTimer();
    });
}

// Get random rule
function getRandomRule() {
    const index = Math.floor(Math.random() * blindKindRules.length);
    return blindKindRules[index];
}

// Reveal Blind-Kind Rule
function revealBlindKindRule() {
    isRuleRevealed = true;
    displayRule(currentRule);
    addToHistory(currentRule.name);
}

// Display rule
function displayRule(rule) {
    Swal.fire({
        title: 'Hidden Rule Revealed!',
        html: `<h3>${rule.name}</h3><p>${rule.description}</p><p><strong>Judging Criteria:</strong> ${rule.criteria}</p>`,
        icon: 'info',
        confirmButtonText: 'Continue Drawing',
        customClass: {
            popup: 'animate__animated animate__fadeInDown'
        }
    }).then(() => {
        currentTopic.textContent = `Active Rule: ${rule.name}`;
        generateButton.textContent = 'RULE REVEALED';
        generateButton.disabled = true;
    });
}

// Start timer
function startTimer() {
    clearInterval(timerInterval);
    let timeLeft = parseInt(timerInput.value, 10);
    updateTimerDisplay(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerEndAlert();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay(time) {
    timerDisplay.textContent = time;
}

// Timer end alert
function timerEndAlert() {
    revealBlindKindRule();
    Swal.fire({
        title: 'Time\'s Up!',
        text: 'The hidden rule has been revealed. Are you ready to judge the drawings?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, let\'s judge!',
        cancelButtonText: 'No, need more time',
    }).then((result) => {
        if (result.isConfirmed) {
            showJudgingCriteria();
        } else {
            extendTimer();
        }
    });
}

// Show judging criteria
function showJudgingCriteria() {
    Swal.fire({
        title: 'Judging Criteria',
        html: `<p><strong>${currentRule.name}</strong></p><p>${currentRule.criteria}</p>`,
        icon: 'info',
        confirmButtonText: 'Start Judging'
    });
}

// Extend timer
function extendTimer() {
    const extendedTime = 60; // 1 minute extension
    startTimer();
    Swal.fire({
        title: 'Timer Extended',
        text: `You have ${extendedTime} more seconds. The rule has been revealed.`,
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
    });
}

// Add to history
function addToHistory(ruleName) {
    const listItem = document.createElement('li');
    listItem.textContent = `Blind-Kind: ${ruleName}`;
    listItem.classList.add('animate__animated', 'animate__fadeInDown');
    topicHistory.prepend(listItem);

    // Keep only the latest 5 items
    while (topicHistory.children.length > 5) {
        topicHistory.removeChild(topicHistory.lastChild);
    }
}

// Initialize Blind-Kind Mode
document.addEventListener('DOMContentLoaded', initBlindKindMode);

// Export functions for potential use in other scripts
export {
    initBlindKindMode,
    handleCategoryChange,
    handleGenerateClick,
    revealBlindKindRule,
    startTimer
};

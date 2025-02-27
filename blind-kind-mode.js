// blind-kind-mode.js

// Declare timerInterval only once at the top of the script using var
var timerInterval = null;

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

// Global variables
let isBlindKindMode = false;
let currentRule = null;
let isRuleRevealed = false;

// Add Blind-Kind option to category select
function addBlindKindOption() {
    const categorySelect = document.getElementById('category-select');
    if (categorySelect && !categorySelect.querySelector('option[value="blind-kind"]')) {
        const option = document.createElement('option');
        option.value = 'blind-kind';
        option.textContent = 'Blind-Kind Mode';
        categorySelect.appendChild(option);
    }
}

// Initialize Blind-Kind Mode
function initBlindKindMode() {
    addBlindKindOption();
    const categorySelect = document.getElementById('category-select');
    const generateButton = document.getElementById('generate-button');
    if (categorySelect) {
        categorySelect.addEventListener('change', handleCategoryChange);
    }
    if (generateButton) {
        generateButton.addEventListener('click', handleGenerateClick);
    }
}

// Handle category change
function handleCategoryChange(event) {
    isBlindKindMode = event.target.value === 'blind-kind';
    updateUI();
}

// Update UI based on mode
function updateUI() {
    const generateButton = document.getElementById('generate-button');
    const currentTopic = document.getElementById('current-topic');
    const topicSlider = document.getElementById('topic-slider');

    if (isBlindKindMode) {
        if (generateButton) generateButton.textContent = 'START BLIND-KIND';
        if (currentTopic) currentTopic.textContent = 'Blind-Kind Mode Active';
        if (topicSlider) topicSlider.innerHTML = '';
    } else {
        if (generateButton) generateButton.textContent = 'SLIDE';
        if (currentTopic) currentTopic.textContent = 'Results appear here';
        // Restore normal slider functionality
    }
    isRuleRevealed = false;
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
        const currentTopic = document.getElementById('current-topic');
        const generateButton = document.getElementById('generate-button');
        if (currentTopic) currentTopic.textContent = 'Hidden Rule Set - Draw Normally';
        if (generateButton) {
            generateButton.textContent = 'REVEAL RULE (for testing)';
            generateButton.onclick = revealBlindKindRule;
        }
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
        const currentTopic = document.getElementById('current-topic');
        const generateButton = document.getElementById('generate-button');
        if (currentTopic) currentTopic.textContent = `Active Rule: ${rule.name}`;
        if (generateButton) {
            generateButton.textContent = 'RULE REVEALED';
            generateButton.disabled = true;
        }
    });
}

// Start timer
function startTimer() {
    const timerInput = document.getElementById('timer-input');
    const timerDisplay = document.getElementById('timer-display');
    clearInterval(timerInterval);
    let timeLeft = parseInt(timerInput.value, 10);
    updateTimerDisplay(timeLeft);

    timerInterval = setInterval(() => { // Use timerInterval here without redeclaring
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
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.textContent = time;
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
    const topicHistory = document.getElementById('topic-history');
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

// Make functions globally available
window.startBlindKindMode = initBlindKindMode;
window.handleCategoryChange = handleCategoryChange;
window.handleGenerateClick = handleGenerateClick;
window.revealBlindKindRule = revealBlindKindRule;
window.startTimer = startTimer;

// Only declare timerInterval if it's not already declared
if (typeof timerInterval === 'undefined') {
    timerInterval = null;
}

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

    // Set the category to 'visualprompts' when Blind-Kind mode is activated
    if (isBlindKindMode) {
        const categorySelect = document.getElementById('category-select');
        if (categorySelect) {
            categorySelect.value = 'visualprompts'; // Programmatically set the category
        }
    }
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
        generateTopic(); // This function is assumed to be in script.js and handles topic generation
    }
}

// Start Blind-Kind round
function startBlindKindRound() {
    currentRule = getRandomRule();
    isRuleRevealed = false;

    Swal.fire({
        title: 'Blind-Kind Round Started!',
        text: 'The hidden rule has been set. Start drawing based on the visual image. The rule will be revealed when the timer ends!',
        icon: 'info',
        confirmButtonText: 'Begin Drawing'
    }).then(() => {
        const currentTopic = document.getElementById('current-topic');
        const generateButton = document.getElementById('generate-button');

        if (currentTopic) currentTopic.textContent = 'Hidden Rule Set - Draw Based on the Visual Image';
        if (generateButton) {
            generateButton.textContent = 'REVEAL RULE (for testing)';
            generateButton.onclick = revealBlindKindRule;
        }

        // Start the timer with 180 seconds (3 minutes)
        startTimer(180);
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

// Start Timer Functionality
function startTimer(duration) {
    let timeLeft = duration;
    const timerDisplay = document.getElementById('timer-display');

    if (!timerDisplay) return;

    // Clear any existing timer interval
    if (timerInterval) clearInterval(timerInterval);

    // Update the timer display
    const updateTimerDisplay = () => {
        timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;
    };

    // Start the timer
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Time\'s up!';

            // Ask if the user needs more time
            Swal.fire({
                title: 'Time\'s Up!',
                text: 'Do you need more time?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    startTimer(180); // Restart the timer for another 3 minutes
                } else {
                    revealBlindKindRule(); // Reveal the rule if no more time is needed
                }
            });
        } else {
            updateTimerDisplay();
        }
    }, 1000);
}

// Initialize Blind-Kind Mode
document.addEventListener('DOMContentLoaded', initBlindKindMode);

// Make functions globally available
window.startBlindKindMode = initBlindKindMode;
window.handleCategoryChange = handleCategoryChange;
window.handleGenerateClick = handleGenerateClick;
window.revealBlindKindRule = revealBlindKindRule;

const topics = {
    art: ["Abstract Expressionism", "Renaissance Sculpture", "Pop Art", "Impressionism", "Surrealism", "Cubism", "Street Art", "Digital Art", "Photography", "Minimalism"],
    science: ["Quantum Mechanics", "Genetic Engineering", "Dark Matter", "Artificial Intelligence", "Climate Change", "Neuroscience", "Nanotechnology", "Astrophysics", "Renewable Energy", "Evolutionary Biology"],
    technology: ["Blockchain", "5G Networks", "Internet of Things", "Virtual Reality", "Augmented Reality", "Cybersecurity", "Cloud Computing", "Machine Learning", "Robotics", "3D Printing"],
    nature: ["Rainforest Ecosystem", "Marine Biology", "Volcanic Activity", "Glaciers", "Biodiversity", "Bioluminescence", "Symbiotic Relationships", "Migratory Patterns", "Camouflage in Nature", "Pollination"],
    history: ["Ancient Civilizations", "Industrial Revolution", "World War II", "Renaissance Period", "Cold War", "Age of Exploration", "French Revolution", "Civil Rights Movement", "Fall of the Roman Empire", "Space Race"]
};

const currentTopic = document.getElementById('current-topic');
const generateButton = document.getElementById('generate-button');
const timerInput = document.getElementById('timer-input');
const timerDisplay = document.getElementById('timer-display');
const categorySelect = document.getElementById('category-select');
const topicHistory = document.getElementById('topic-history');
const topicSlider = document.getElementById('topic-slider');

let timerInterval;
let currentTopicIndex = 0;
let selectedCategory = 'all';

function initializeSlider() {
    const allTopics = Object.values(topics).flat();
    topicSlider.innerHTML = ''; // Clear existing slider items
    allTopics.forEach((topic, index) => {
        const sliderItem = document.createElement('div');
        sliderItem.classList.add('slider-item');
        sliderItem.textContent = topic;
        sliderItem.style.transform = `translateX(${index * 100}%)`;
        topicSlider.appendChild(sliderItem);
    });
}

function generateTopic() {
    clearInterval(timerInterval);
    
    let availableTopics = selectedCategory === 'all' 
        ? Object.values(topics).flat() 
        : topics[selectedCategory];

    currentTopicIndex = Math.floor(Math.random() * availableTopics.length);
    const selectedTopic = availableTopics[currentTopicIndex];

    showTopicAnimation(selectedTopic);
    updateSlider(currentTopicIndex);
}

function updateSlider(index) {
    if (topicSlider) {
        topicSlider.style.transform = `translateX(-${index * 100}%)`;
    }
}

function showTopicAnimation(topic) {
    Swal.fire({
        title: 'Generating Topic...',
        html: '<div class="spinner"></div>',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: 'animate__animated animate__fadeIn'
        },
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        }
    }).then(() => {
        Swal.fire({
            title: 'Your Topic Is:',
            html: `<h2 class="animate__animated animate__bounceIn">${topic}</h2>`,
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Close',
            customClass: {
                popup: 'animate__animated animate__zoomIn',
                cancelButton: 'btn btn-danger'
            }
        }).then(() => {
            if (currentTopic) currentTopic.textContent = topic;
            startTimer();
            addToHistory(topic);
        });
    });
}

function startTimer() {
    let timeLeft = parseInt(timerInput.value, 10);
    updateTimerDisplay(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft -= 1;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showTimeUpAnimation();
        }
    }, 1000);
}

function updateTimerDisplay(time) {
    timerDisplay.textContent = time;
    if (time <= 10) {
        timerDisplay.classList.add('animate__animated', 'animate__pulse');
    } else {
        timerDisplay.classList.remove('animate__animated', 'animate__pulse');
    }
}

function showTimeUpAnimation() {
    Swal.fire({
        title: 'Time\'s Up!',
        text: 'Ready for the next topic?',
        icon: 'info',
        showConfirmButton: true,
        confirmButtonText: 'Generate New Topic',
        showCancelButton: true,
        cancelButtonText: 'Close',
        customClass: {
            popup: 'animate__animated animate__shakeX',
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            generateTopic();
        }
    });
}

function addToHistory(topic) {
    const listItem = document.createElement('li');
    listItem.textContent = topic;
    listItem.classList.add('animate__animated', 'animate__fadeInDown');
    topicHistory.prepend(listItem);

    if (topicHistory.children.length > 5) {
        const lastChild = topicHistory.lastChild;
        lastChild.classList.add('animate__fadeOutDown');
        setTimeout(() => {
            topicHistory.removeChild(lastChild);
        }, 500);
    }
}

generateButton.addEventListener('click', generateTopic);

categorySelect.addEventListener('change', (e) => {
    selectedCategory = e.target.value;
    initializeSlider();
});

// Initialize the slider
initializeSlider();

// Event listeners
if (generateButton) generateButton.addEventListener('click', generateTopic);
if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
        selectedCategory = e.target.value;
        initializeSlider();
    });
}
// Add some extra animations for UI elements
generateButton.addEventListener('mouseenter', () => {
    generateButton.classList.add('animate__animated', 'animate__pulse');
});

generateButton.addEventListener('mouseleave', () => {
    generateButton.classList.remove('animate__animated', 'animate__pulse');
});

// Animate category select on change
categorySelect.addEventListener('change', () => {
    categorySelect.classList.add('animate__animated', 'animate__flipInX');
    setTimeout(() => {
        categorySelect.classList.remove('animate__animated', 'animate__flipInX');
    }, 1000);
});

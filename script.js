const topics = {
    animals: [
        "African Elephant", "Alaskan Malamute", "American Quarter Horse", "Arctic Fox", "Bald Eagle",
        "Bengal Tiger", "Black Labrador", "Blue Macaw", "Border Collie", "Bottlenose Dolphin",
        "British Shorthair", "Brown Bear", "Camel", "Canadian Lynx", "Cardinal",
        "Chimpanzee", "Clydesdale Horse", "Cobra", "Common Goldfish", "Corn Snake",
        "Dalmatian", "Dart Frog", "Doberman Pinscher", "Dragonfly", "Emperor Penguin",
        "Fennec Fox", "French Bulldog", "Gecko", "Giant Panda", "Giraffe",
        "Great White Shark", "Grey Wolf", "Hedgehog", "Himalayan Cat", "Honeybee",
        "Hummingbird", "Iguana", "Jack Russell Terrier", "Japanese Koi", "King Cobra",
        "Koala", "Lion", "Maine Coon Cat", "Mandrill", "Monarch Butterfly",
        "Orca", "Ostrich", "Otter", "Persian Cat", "Pug"
    ],
    objects: [
        "Antique Pocket Watch", "Art Deco Lamp", "Astronaut Helmet", "Acoustic Guitar", "Bamboo Flute",
        "Baseball Glove", "Bicycle with Basket", "Binoculars", "Brass Telescope", "Bronze Statue",
        "Candelabra", "Canvas Tent", "Ceramic Teapot", "Chess Set", "Clay Vase",
        "Cobblestone Street", "Compass", "Crystal Chandelier", "Desktop Computer", "Diamond Ring",
        "Easel with Painting", "Electric Guitar", "Feather Quill Pen", "Fireplace with Logs", "Fountain Pen",
        "Garden Gnome", "Gas Lantern", "Glass Bottle", "Golden Crown", "Grand Piano",
        "Handmade Quilt", "Harmonica", "Hourglass", "Iron Gate", "Ivory Chess Piece",
        "Jade Necklace", "Kaleidoscope", "Leather Journal", "Lighthouse", "Lock and Key",
        "Magnifying Glass", "Maraca", "Metal Detector", "Microphone", "Mosaic Tile",
        "Oil Lamp", "Origami Crane", "Outdoor Grill", "Oboe", "Pocket Knife"
    ],
    food: [
        "Apple Pie", "Bacon Cheeseburger", "Baked Ziti", "Banana Split", "Beef Stir Fry",
        "Black Forest Cake", "Blueberry Pancakes", "Buffalo Wings", "Caesar Salad", "Cannoli",
        "Caramel Apple", "Cheese Pizza", "Chicken Fajitas", "Chocolate Brownie", "Coconut Shrimp",
        "Corn on the Cob", "Crab Rangoon", "Croissant", "Donut", "Egg Rolls",
        "Fish and Chips", "French Dip Sandwich", "Fried Rice", "Garlic Bread", "Gingerbread Cookie",
        "Grapefruit", "Green Smoothie", "Grilled Cheese Sandwich", "Gyro", "Hamburger",
        "Hot Dog", "Ice Cream Sundae", "Jalapeno Poppers", "Key Lime Pie", "Lasagna",
        "Lemon Meringue Pie", "Lobster Bisque", "Macaroon", "Mango Sorbet", "Meatball Sub",
        "Nachos", "Onion Rings", "Oreo Milkshake", "Paella", "Peach Cobbler",
        "Philly Cheesesteak", "Pineapple Pizza", "Pork BBQ Sandwich", "Pretzel", "Pumpkin Pie" "diddy in prison"
    ],
    nature: [
        "Aurora Borealis", "Bamboo Forest", "Canyon Sunset", "Cherry Blossom Tree", "Clear Mountain Lake",
        "Coastal Cliff", "Coral Reef", "Desert Oasis", "Double Rainbow", "Eucalyptus Grove",
        "Field of Lavender", "Fireflies at Dusk", "Glacier Cave", "Grand Canyon", "Green Meadow",
        "Iceberg", "Jungle Waterfall", "Lightning Storm", "Limestone Cave", "Maple Tree in Autumn",
        "Midnight Sky", "Misty Mountain Range", "Mossy Forest Floor", "Northern Lights", "Oak Tree",
        "Ocean Waves", "Palm Tree on Beach", "Pine Forest", "Poppy Field", "Rainforest Canopy",
        "Rocky Beach", "Sand Dunes", "Sequoia Tree", "Snow Covered Mountain", "Spring Meadow",
        "Starry Night", "Sunflower Field", "Sunset over Ocean", "Thunderstorm", "Tropical Beach",
        "Volcanic Eruption", "Waterfall", "Wheat Field", "Wildflower Meadow", "Windy Desert",
        "Winter Forest", "Zen Garden", "Arctic Tundra", "Autumn Leaves", "Bayou (Specific Swamp region)"
    ],
    fantasy: [
        "Ancient Dragon Hoard", "Crystal Ball", "Enchanted Forest", "Elven Archer", "Fairy Circle",
        "Flying Carpet", "Gryphon", "Haunted Castle", "Ice Queen", "Invisible Cloak", 
        "Jeweled Dagger", "Knight Errant", "Lost City of Atlantis", "Magic Potion", "Minotaur",
        "Necromancer", "Ogre", "Phoenix Rising", "Pixie Dust", "Questing Beast",
        "Rainbow Bridge", "Rune Stone", "Sea Serpent", "Shadow Walker", "Sorcerer's Apprentice",
        "Talking Tree", "Teleportation Device", "Unicorn Meadow", "Vampire Bat", "Wishing Well",
        "Xenomorph", "Yggdrasil", "Zombie Horde", "Angelic Halo", "Bag of Holding",
        "Cursed Artifact", "Dimensional Portal", "Elemental Golem", "Fountain of Youth", "Gate to Another World",
        "Holy Grail", "Illusionist's Wand", "Jinn in a Lamp", "Kraken", "Leviathan",
        "Mystic Amulet", "Nymph", "Orb of Power", "Pegasus"
    ]
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

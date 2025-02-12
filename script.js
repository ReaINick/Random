const topics = {
    animals: [
        "Dog", "Cat", "Horse", "Cow", "Pig", "Sheep", "Goat", "Chicken", "Duck", "Goose",
        "Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Hippo", "Rhino", "Monkey", "Gorilla", "Chimpanzee",
        "Kangaroo", "Koala", "Penguin", "Polar Bear", "Grizzly Bear", "Panda", "Wolf", "Fox", "Deer", "Moose",
        "Rabbit", "Squirrel", "Raccoon", "Skunk", "Beaver", "Otter", "Seal", "Walrus", "Dolphin", "Whale",
        "Shark", "Octopus", "Jellyfish", "Starfish", "Crab", "Lobster", "Turtle", "Frog", "Toad", "Snake",
        "Lizard", "Crocodile", "Alligator", "Eagle", "Hawk", "Owl", "Parrot", "Toucan", "Flamingo", "Peacock",
        "Ostrich", "Hummingbird", "Swan", "Pelican", "Seagull", "Crow", "Pigeon", "Bat", "Mouse", "Rat",
        "Hamster", "Guinea Pig", "Hedgehog", "Porcupine", "Sloth", "Armadillo", "Anteater", "Camel", "Llama", "Donkey",
        "Mule", "Buffalo", "Bison", "Hyena", "Cheetah", "Leopard", "Jaguar", "Lynx", "Badger", "Meerkat",
        "Weasel", "Platypus", "Tasmanian Devil", "Komodo Dragon", "Iguana", "Chameleon", "Scorpion", "Butterfly", "Ladybug", "Ant"
    ],
    objects: [
        "Watch", "Lamp", "Helmet", "Guitar", "Flute", "Baseball", "Bicycle", "Binoculars", "Telescope", "Statue",
        "Candle", "Tent", "Teapot", "Chess Set", "Vase", "Compass", "Chandelier", "Computer", "Ring", "Painting",
        "Pen", "Fireplace", "Gnome", "Lantern", "Bottle", "Crown", "Piano", "Quilt", "Harmonica", "Hourglass",
        "Gate", "Necklace", "Journal", "Lighthouse", "Lock", "Key", "Magnifying Glass", "Microphone", "Tile", "Oil Lamp",
        "Crane", "Grill", "Knife", "Typewriter", "Chair", "Ship Model", "Sword", "Window", "Sundial", "Thimble",
        "Mask", "Dollhouse", "Camera", "Violin", "Basket", "Wind Chimes", "Rocking Horse", "Xylophone", "Yarn", "Clock",
        "TV", "Anvil", "Birdcage", "Forge", "Broom", "Chalkboard", "Pencil", "Ruler", "Scissors", "Glue",
        "Stapler", "Eraser", "Notebook", "Backpack", "Lunchbox", "Thermos", "Mug", "Plate", "Bowl", "Fork",
        "Spoon", "Kettle", "Toaster", "Blender", "Mixer", "Fridge", "Stove", "Oven", "Microwave", "Dishwasher",
        "Washing Machine", "Dryer", "Vacuum", "Mop", "Bucket", "Sponge", "Towel", "Soap", "Toothbrush", "Comb"
    ],
    food: [
        "Pizza", "Burger", "Fries", "Hot Dog", "Taco", "Burrito", "Sandwich", "Pasta", "Spaghetti", "Lasagna",
        "Salad", "Soup", "Steak", "Chicken", "Pork Chop", "Bacon", "Ham", "Sausage", "Fish", "Shrimp",
        "Crab", "Lobster", "Rice", "Beans", "Potato", "Carrot", "Broccoli", "Cauliflower", "Corn", "Peas",
        "Tomato", "Cucumber", "Lettuce", "Onion", "Garlic", "Pepper", "Mushroom", "Egg", "Cheese", "Yogurt",
        "Milk", "Butter", "Bread", "Toast", "Bagel", "Muffin", "Croissant", "Pancake", "Waffle", "Cereal",
        "Oatmeal", "Apple", "Banana", "Orange", "Grape", "Strawberry", "Blueberry", "Raspberry", "Peach", "Pear",
        "Plum", "Cherry", "Watermelon", "Melon", "Pineapple", "Mango", "Kiwi", "Lemon", "Lime", "Coconut",
        "Avocado", "Olive", "Peanut", "Almond", "Walnut", "Cashew", "Ice Cream", "Cake", "Pie", "Cookie",
        "Brownie", "Donut", "Candy", "Chocolate", "Popcorn", "Chips", "Pretzel", "Nachos", "Salsa", "Guacamole",
        "Hummus", "Ketchup", "Mustard", "Mayonnaise", "Soy Sauce", "Honey", "Jam", "Jelly", "Sugar", "Salt"
    ],
    nature: [
        "Mountain", "Valley", "Hill", "Cliff", "Cave", "River", "Lake", "Ocean", "Beach", "Island",
        "Forest", "Jungle", "Desert", "Oasis", "Glacier", "Iceberg", "Volcano", "Geyser", "Waterfall", "Canyon",
        "Gorge", "Prairie", "Meadow", "Field", "Grassland", "Tundra", "Savanna", "Marsh", "Swamp", "Coral Reef",
        "Tide Pool", "Lagoon", "Bay", "Peninsula", "Fjord", "Dune", "Delta", "Estuary", "Spring", "Pond",
        "Creek", "Stream", "Rapids", "Flood Plain", "Basin", "Plateau", "Mesa", "Butte", "Crevasse", "Cavern",
        "Grotto", "Ravine", "Gully", "Bluff", "Ridge", "Peak", "Summit", "Crag", "Pinnacle", "Spire",
        "Arch", "Pillar", "Monolith", "Boulder", "Pebble", "Sand", "Soil", "Clay", "Mud", "Lava",
        "Magma", "Ash", "Smoke", "Cloud", "Rain", "Snow", "Hail", "Sleet", "Fog", "Mist",
        "Dew", "Frost", "Ice", "Rainbow", "Aurora", "Lightning", "Thunder", "Tornado", "Hurricane", "Typhoon",
        "Cyclone", "Earthquake", "Tsunami", "Avalanche", "Landslide", "Erosion", "Sedimentation", "Weathering", "Fossil", "Geode"
    ],
    fantasy: [
        "Dragon", "Unicorn", "Mermaid", "Centaur", "Griffin", "Phoenix", "Pegasus", "Fairy", "Elf", "Dwarf",
        "Goblin", "Orc", "Troll", "Ogre", "Giant", "Wizard", "Witch", "Sorcerer", "Warlock", "Necromancer",
        "Paladin", "Knight", "Warrior", "Archer", "Rogue", "Bard", "Cleric", "Druid", "Monk", "Vampire",
        "Werewolf", "Zombie", "Ghost", "Demon", "Angel", "God", "Goddess", "Titan", "Cyclops", "Minotaur",
        "Hydra", "Chimera", "Kraken", "Leviathan", "Basilisk", "Cockatrice", "Manticore", "Sphinx", "Harpy", "Siren",
        "Nymph", "Dryad", "Satyr", "Faun", "Leprechaun", "Gnome", "Pixie", "Sprite", "Imp", "Gremlin",
        "Golem", "Elemental", "Djinn", "Ifrit", "Banshee", "Wraith", "Lich", "Mummy", "Skeleton", "Gargoyle",
        "Doppelganger", "Shapeshifter", "Naga", "Kitsune", "Tanuki", "Yeti", "Sasquatch", "Loch Ness Monster", "Chupacabra", "Alien",
        "Robot", "Cyborg", "Android", "Mutant", "Superhero", "Supervillain", "Time Traveler", "Psychic", "Telepath", "Telekinetic",
        "Pyrokinetic", "Cryokinetic", "Electrokinetic", "Invisible Man", "Shrinking Man", "Giant Man", "Elastic Man", "Flying Man", "Speedster", "Mind Reader"
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
let animationFrame;
let sliderItems;

// Validate if elements exist
if (!currentTopic) console.error('current-topic element not found');
if (!generateButton) console.error('generate-button element not found');
if (!timerInput) console.error('timer-input element not found');
if (!timerDisplay) console.error('timer-display element not found');
if (!categorySelect) console.error('category-select element not found');
if (!topicHistory) console.error('topic-history element not found');
if (!topicSlider) console.error('topic-slider element not found');

function initializeSlider() {
    if (!topicSlider) return;

    const categoriesToUse = selectedCategory === 'all' ? Object.keys(topics) : [selectedCategory];
    const topicsToUse = categoriesToUse.flatMap(category => topics[category]);

    topicSlider.innerHTML = ''; // Clear existing slider items
    topicsToUse.forEach((topic) => {
        const sliderItem = document.createElement('span'); // Use span instead of div
        sliderItem.classList.add('slider-item'); // Add class for styling and animation
        sliderItem.textContent = topic;
        topicSlider.appendChild(sliderItem);
    });

    sliderItems = topicSlider.querySelectorAll('.slider-item'); // Cache all slider items
    startSliderAnimation();
}

function startSliderAnimation() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame); // Cancel any ongoing animation
    }
    animateSlider();
}

function animateSlider() {
    if (!sliderItems || sliderItems.length === 0) return;

    const containerWidth = topicSlider.offsetWidth;
    const itemWidth = sliderItems[0].offsetWidth;
    const totalWidth = itemWidth * sliderItems.length;

    sliderItems.forEach((item, index) => {
        const x =
            ((index - currentTopicIndex) * itemWidth + containerWidth) % totalWidth - itemWidth;
        const scale =
            1 + Math.max(0, 1 - Math.abs(x) / (containerWidth / 2)) * 0.2; // Enlarge in the center
        const opacity =
            Math.max(0.2, 1 - Math.abs(x) / (containerWidth / 2)); // Fade in/out effect

        item.style.transform = `translateX(${x}px) scale(${scale})`;
        item.style.opacity = opacity;
    });

    currentTopicIndex += 0.01; // Adjust speed of sliding
    if (currentTopicIndex >= sliderItems.length) {
        currentTopicIndex = 0;
    }

    animationFrame = requestAnimationFrame(animateSlider);
}

function generateTopic() {
    if (!currentTopic) return;

    clearInterval(timerInterval);

    let availableTopics =
        selectedCategory === 'all'
            ? Object.values(topics).flat()
            : topics[selectedCategory];

    if (!availableTopics || availableTopics.length === 0) {
        console.error('No topics available for the selected category');
        currentTopic.textContent =
            'No topics available. Please select another category.';
        return;
    }

    currentTopicIndex = Math.floor(Math.random() * availableTopics.length);
    const selectedTopic = availableTopics[currentTopicIndex];

    displayFinalTopic(selectedTopic); // Display the final topic
}

function updateTimerDisplay(time) {
    if (!timerDisplay) return;

    timerDisplay.textContent = time;
    if (time <= 10) {
        timerDisplay.classList.add('animate__animated', 'animate__pulse');
    } else {
        timerDisplay.classList.remove('animate__animated', 'animate__pulse');
    }
}

function showTimeUpAnimation() {
    Swal.fire({
        title: "Time's Up!",
        text: 'Ready for the next topic?',
        icon: 'info',
        showConfirmButton: true,
        confirmButtonText: 'Generate New Topic',
        showCancelButton: true,
        cancelButtonText: 'Close',
        customClass: {
            popup: 'animate__animated animate__shakeX',
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            generateTopic();
        }
    });
}

function addToHistory(topic) {
    if (!topicHistory) return;

    const listItem = document.createElement('li');
    listItem.textContent = topic;
    listItem.classList.add('animate__animated', 'animate__fadeInDown');
    topicHistory.prepend(listItem);

    // Limit history items
    while (topicHistory.children.length > 5) {
        topicHistory.removeChild(topicHistory.lastChild);
    }
}

function displayFinalTopic(topic) {
    Swal.fire({
        title: 'Your Topic Is:',
        html: `<h2 class="animate__animated animate__bounceIn">${topic}</h2>`,
        icon: 'success',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Close',
        customClass: {
            popup: 'animate__animated animate__zoomIn',
            cancelButton: 'btn btn-danger',
        },
    }).then(() => {
        if (currentTopic) currentTopic.textContent = topic;
        startTimer();
        addToHistory(topic);
    });
}

function startTimer() {
    if (!timerInput || !timerDisplay) return;

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

// Correct the eventlistener categoryselect
if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
        selectedCategory = e.target.value;

        const categoryMap = {
            all: 'all',
            animals: 'animals',
            objects: 'objects',
            food: 'food',
            nature: 'nature',
            fantasy: 'fantasy',
        };

        selectedCategory = categoryMap[e.target.value] || 'all'; // Ensure correct mapping
        initializeSlider();
        generateTopic();
    });
}

// Event listeners
if (generateButton) {
    generateButton.addEventListener('click', () => {
        // Play button sound
        const buttonAudio = new Audio('https://cdn.pixabay.com/audio/2021/08/09/audio_7232134569.mp3');
        buttonAudio.play();

        generateTopic(); // Generate the topic

        // Trigger the sliding animation and sound
        startSlideAnimation();
    });
}


// Initialize the slider on page load
initializeSlider();

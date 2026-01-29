// Set the date we're counting down to - Feb 17, 2026
const targetDate = new Date('February 17, 2026 00:00:00').getTime();

// Mexico fun facts
const mexicoFacts = [
    "🌮 Mexico is the birthplace of chocolate! The Mayans and Aztecs were drinking it 3,000 years ago.",
    "🏖️ Mexico has 450 beaches spanning over 9,000 km of coastline!",
    "🎨 Mexico City has more museums than any other city in the world - over 150!",
    "🌎 Mexico is the 13th largest country in the world by area.",
    "🦅 The golden eagle on Mexico's flag is eating a snake while perched on a cactus.",
    "🎉 Mexico invented the piñata! It was originally used to celebrate birthdays.",
    "🏛️ Chichen Itza is one of the Seven Wonders of the World!",
    "🌮 Corn was first domesticated in Mexico 10,000 years ago.",
    "🎵 Mariachi music is a UNESCO Intangible Cultural Heritage.",
    "🌺 Mexico has 68 official indigenous languages plus Spanish!",
    "🏔️ Mexico City is built on a lake! The ancient Aztec capital Tenochtitlan was on Lake Texcoco.",
    "🎭 Day of the Dead (Día de los Muertos) is a beautiful celebration of life and remembrance.",
    "🌶️ Mexico gave the world avocados, vanilla, tomatoes, and chili peppers!",
    "🏖️ Cancún was a small fishing village with only 3 residents until the 1970s!",
    "🦎 Mexico is one of the world's 17 megadiverse countries with 10-12% of Earth's biodiversity!"
];

let excitementLevel = 50;

// Countdown timer function
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Calculate progress
    const startDate = new Date('January 1, 2026').getTime();
    const totalTime = targetDate - startDate;
    const timeElapsed = now - startDate;
    const progress = (timeElapsed / totalTime) * 100;
    
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '% there!';
    
    // Check if countdown is finished
    if (distance < 0) {
        document.querySelector('.countdown-container').innerHTML = 
            '<h1 style="text-align: center; font-size: 3rem;">🎉 ¡FELIZ VIAJE! 🎉<br>You\'re in Mexico!</h1>';
        createEmojiExplosion();
    }
}

// Random Mexico fact
function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * mexicoFacts.length);
    const factElement = document.getElementById('fact');
    
    // Fade out
    factElement.style.opacity = '0';
    
    setTimeout(() => {
        factElement.textContent = mexicoFacts[randomIndex];
        // Fade in
        factElement.style.opacity = '1';
    }, 300);
}

// Excitement meter
function addExcitement() {
    excitementLevel = Math.min(excitementLevel + 10, 100);
    document.getElementById('excitementMeter').style.width = excitementLevel + '%';
    createEmojiExplosion();
    
    if (excitementLevel === 100) {
        document.getElementById('excitementButton').textContent = '🔥 MAX EXCITEMENT! 🔥';
    }
}

// Create floating emojis
function createEmojiExplosion() {
    const emojis = ['🌮', '🌴', '☀️', '🏖️', '🎉', '🦜', '🌺', '🥑', '🌊', '⭐'];
    const container = document.getElementById('emojiCelebration');
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (2 + Math.random() * 2) + 's';
            container.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 3500);
        }, i * 100);
    }
}

// Create animated background stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${1 + Math.random() * 3}s infinite`;
        starsContainer.appendChild(star);
    }
}

// Add twinkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    #fact {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Event listeners
document.getElementById('factButton').addEventListener('click', showRandomFact);
document.getElementById('excitementButton').addEventListener('click', addExcitement);

// Save checkbox state
const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
checkboxes.forEach((checkbox, index) => {
    // Load saved state
    const saved = localStorage.getItem(`checkbox-${index}`);
    if (saved === 'true') {
        checkbox.checked = true;
    }
    
    // Save on change
    checkbox.addEventListener('change', () => {
        localStorage.setItem(`checkbox-${index}`, checkbox.checked);
        if (checkbox.checked) {
            createEmojiExplosion();
        }
    });
});

// Initialize
createStars();
updateCountdown();
setInterval(updateCountdown, 1000);

// Welcome animation
setTimeout(() => {
    createEmojiExplosion();
}, 500);

// Show a random fact on load
setTimeout(() => {
    showRandomFact();
}, 1000);

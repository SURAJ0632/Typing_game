const typingText = document.querySelector('.typing-test p');
const input = document.querySelector('.wrapper .input-feild');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const button = document.querySelector('button'); // Corrected button selector


// Set values

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraph() {
    const paragraph = [
        "The morning sun rose over the horizon, casting a warm glow across the tranquil meadow. Birds chirped their cheerful melodies as a gentle breeze danced through the grass. It was a perfect day for a leisurely stroll in nature's embrace.",
        "In the bustling city streets, people hurried about their daily lives, consumed by the rhythm of urban existence. Cars honked, sirens blared, and voices melded into a cacophony of sound. Amidst the chaos, individuals pursued their dreams and aspirations.",
        "High above the earth, fluffy white clouds drifted lazily across the boundless sky. The sun's rays peeked through, painting the heavens with hues of orange and pink. Below, mountains rose majestically, their peaks reaching for the heavens in silent reverence.",
        "Deep within the ancient forest, towering trees stood sentinel over the verdant landscape. Shafts of sunlight filtered through the dense canopy, illuminating the forest floor in a dappled pattern. Creatures of all shapes and sizes roamed freely, in harmony with their surroundings.",
        "Along the rugged coastline, waves crashed against jagged cliffs with relentless force. Sea spray filled the air, carrying with it the salty tang of the ocean. Seagulls soared overhead, their plaintive cries echoing across the vast expanse of blue.",
        "In the heart of the desert, the sun beat down mercilessly on the barren landscape. Sand dunes stretched for miles, their golden grains shimmering in the intense heat. Despite the harsh conditions, resilient desert plants found a way to thrive, their roots delving deep into the arid soil.",
        "Within the confines of a bustling marketplace, vendors hawked their wares with fervent enthusiasm. The air was thick with the aroma of spices, mingling with the scent of freshly baked bread. Customers haggled good-naturedly, seeking the best deals amidst a sea of colorful goods."
    ];

    const randomIndex = Math.floor(Math.random() * paragraph.length);

    typingText.innerHTML = '';
    for (const char of paragraph[randomIndex]) {
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }

    typingText.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('keydown', () => input.focus());

    typingText.addEventListener("click", () => { input.focus() })

}

// Handle user input


function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }


        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
        }
        else {
            mistake++;
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;

        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;

        // Calculate CPM
        let cpmVal = Math.round((charIndex / (maxTime - timeLeft)) * 60);
        cpm.innerText = cpmVal;
    }
    else {
        clearInterval(timer);
        input.value = '';

    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmVal;
    }
    else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;

}

input.addEventListener("input", initTyping);
button.addEventListener("click", reset); // Added event listener for the button
loadParagraph();

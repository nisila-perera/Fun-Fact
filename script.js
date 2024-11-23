let customFacts = [];

async function getRandomFact() {
    try {
        const response = await fetch('fact.json');
        const facts = await response.json();
        const allFacts = [...facts.generalFacts, ...customFacts];
        const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
        displayFact(randomFact);
    } catch (error) {
        console.error('Error fetching facts:', error);
        displayFact('Oops! Failed to load facts. Please try again.');
    }
}

async function getNisilaFact() {
    try {
        const response = await fetch('fact.json');
        const facts = await response.json();
        const nisilaFact = facts.nisilaFacts[Math.floor(Math.random() * facts.nisilaFacts.length)];
        displayFact(nisilaFact);
    } catch (error) {
        console.error('Error fetching Nisila facts:', error);
        displayFact('Oops! Failed to load facts. Please try again.');
    }
}

async function getAIFact() {
    try {
        displayFact('Generating an interesting fact with AI... ');
        
        const API_KEY = 'AIzaSyDWl7vdKzq5mdsuoqedkgknoBtrjkr2uLs';
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Generate a single interesting and surprising fun fact that is concise (max 2 sentences). Make it engaging and educational. Don't include any prefix like 'Fun fact:' or 'Did you know?'"
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const fact = data.candidates[0].content.parts[0].text.trim();
            displayFact(fact);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error generating AI fact:', error);
        displayFact('Oops! Failed to generate an AI fact. Please try again.');
    }
}

function displayFact(fact) {
    const factText = document.getElementById('factText');
    factText.classList.remove('animate__animated', 'animate__fadeIn');
    
    // Trigger reflow
    void factText.offsetWidth;
    
    factText.classList.add('animate__animated', 'animate__fadeIn');
    factText.textContent = fact;
}

function addCustomFact() {
    const customFactInput = document.getElementById('customFact');
    const fact = customFactInput.value.trim();
    
    if (fact) {
        customFacts.push(fact);
        customFactInput.value = '';
        displayFact(' Custom fact added successfully!');
        
        // Add animation to the input
        customFactInput.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            customFactInput.classList.remove('animate__animated', 'animate__pulse');
        }, 1000);
    } else {
        customFactInput.classList.add('animate__animated', 'animate__shakeX');
        setTimeout(() => {
            customFactInput.classList.remove('animate__animated', 'animate__shakeX');
        }, 1000);
    }
}

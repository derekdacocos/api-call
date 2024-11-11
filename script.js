let jokeHistory = [];
let currentJokeIndex = -1;

// Function to fetch random joke
async function getJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
        const data = await response.json();

        // Check if joke is already in the history
        const joke = data.joke || `${data.setup} - ${data.delivery}`;

        // Add the joke to the history array and update the current joke index
        jokeHistory.push(joke);
        currentJokeIndex++;

        // Display the current joke
        const jokeText = document.getElementById('joke-text');
        jokeText.innerHTML = `"${joke}"`;

        // Show the GIFs
        showGif();

    } catch (error) {
        console.error('Error fetching joke:', error);
        const jokeText = document.getElementById('joke-text');
        jokeText.innerHTML = "Oops! Something went wrong. Try again!";
    }
}

// Function to go to the previous joke
function previousJoke() {
    if (currentJokeIndex > 0) {
        currentJokeIndex--;
        const jokeText = document.getElementById('joke-text');
        jokeText.innerHTML = `"${jokeHistory[currentJokeIndex]}"`;

        // Show the GIFs
        showGif();
    } else {
        const jokeText = document.getElementById('joke-text');
        jokeText.innerHTML = "No previous jokes available.";
    }
}

// Function to show the GIF on both sides
function showGif() {
    const leftGif = document.getElementById('left-gif');
    const rightGif = document.getElementById('right-gif');

    leftGif.style.display = 'block';
    rightGif.style.display = 'block';

    // Hide the GIFs after 1.5 seconds
    setTimeout(() => {
        leftGif.style.display = 'none';
        rightGif.style.display = 'none';
    }, 1500);
}

// Initially get a random joke when the page loads
window.onload = getJoke;

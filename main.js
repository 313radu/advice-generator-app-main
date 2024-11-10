
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas size to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Hexagon properties
const hexSize = 40; // Size of the hexagons (distance from center to a corner)
const hexHeight = Math.sqrt(3) * hexSize; // Height of a hexagon
const hexWidth = 2 * hexSize; // Width of a hexagon
const gap = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.3; // 0.3em gap in pixels

// Function to draw a hexagon at a given position
function drawHexagon(x, y) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i; // Calculate the angle for each vertex
        const dx = x + hexSize * Math.cos(angle); // X position of the vertex
        const dy = y + hexSize * Math.sin(angle); // Y position of the vertex
        if (i === 0) {
            ctx.moveTo(dx, dy); // Move to the first vertex
        } else {
            ctx.lineTo(dx, dy); // Draw a line to the next vertex
        }
    }
    ctx.closePath();
    ctx.fillStyle = "#222"; // Fill color of hexagon
    ctx.fill(); // Apply the fill
}

// Function to tile hexagons across the entire canvas with a gap
function fillCanvasWithHexagons() {
    const rows = Math.ceil(canvas.height / (hexHeight + gap)); // Calculate number of rows
    const cols = Math.ceil(canvas.width / (hexWidth + gap)); // Calculate number of columns

    // Clear the canvas before re-rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hexagons in a staggered grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Calculate the x and y position for each hexagon
            const x = col * (hexWidth + gap) + (row % 2 === 0 ? 0 : (hexWidth + gap) / 2);
            const y = row * (hexHeight + gap);
            drawHexagon(x, y); // Draw hexagon at the calculated position
        }
    }
}

// Render the hexagons on the canvas initially
fillCanvasWithHexagons();

// Listen for window resize events to adjust the canvas size and redraw hexagons
window.addEventListener("resize", () => {
    // Set canvas size to new window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Re-render hexagons after resize
    fillCanvasWithHexagons();
});

const mouseFollower = document.getElementById("mouse-follower");

// Mouse move event listener to track cursor position
document.addEventListener("mousemove", (event) => {
    // Get the mouse position relative to the window
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Update the position of the mouse follower
    mouseFollower.style.left = `${mouseX}px`;
    mouseFollower.style.top = `${mouseY}px`;
});


const adviceNr = document.getElementById("advice-nr");
const adviceText = document.getElementById("advice-text");
const button = document.getElementById("button");

let url = 'https://api.adviceslip.com/advice';

async function getData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Log the response for debugging

            // Update the advice immediately after fetching
            adviceNr.innerHTML = "#" + data.slip.id;
            adviceText.innerHTML = data.slip.advice;
        } else {
            console.log('Failed to fetch advice');
        }
    } catch (error) {
        console.log('Something went wrong: ' + error);
    }
}

// Fetch new advice when the button is clicked
button.addEventListener("click", getData);

// Call the function once when the page loads to display initial advice
getData();


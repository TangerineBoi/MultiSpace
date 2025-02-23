// Global flags
let isWorking = true; // Default is work time
let isPaused = false; // Flag to track pause state
let timeWorked = 0; // Track time worked

// Define times in seconds
let workTimer = 25 * 60; // 25 minutes
let breakTimer = 5 * 60;  // 5 minutes
let fiveMinuteTimer = 5 * 60; // 5 minutes
let tenMinuteTimer = 10 * 60; // 10 minutes

// Define elements of the timer display and buttons
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const fiveMinuteButton = document.getElementById("fiveMinuteButton");
const tenMinuteButton = document.getElementById("tenMinuteButton");

let timer; // To hold the interval ID

// Function to update timer display
function updateDisplay(seconds) {
    timerDisplay.textContent = formatTime(seconds);
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        if (isPaused) return; // Check if paused

        // Handle work or break timer countdown
        if (isWorking) {
            if (workTimer <= 0) {
                clearInterval(timer);
                startBreakTimer(); // Start break timer
            } else {
                workTimer--; // Decrease timer by 1 second
                timeWorked++; // Increase total time worked
                updateDisplay(workTimer); // Update display
            }
        } else {
            if (breakTimer <= 0) {
                clearInterval(timer);
                startWorktimer(); // Start work timer again
            } else {
                breakTimer--; // Decrease timer by 1 second
                updateDisplay(breakTimer); // Update display
            }
        }
    }, 1000); // Execute every second
}

////////////////// Work Timer //////////////////
function startWorktimer() {
    clearInterval(timer); // Clear any existing interval
    isWorking = true; // Set working state
    updateDisplay(workTimer); // Display initial work time
    startTimer(); // Start the timer
}

//////////////// BREAK TIMER //////////////////
function startBreakTimer() {
    clearInterval(timer); // Clear any existing interval
    isWorking = false; // Set non-working state
    updateDisplay(breakTimer); // Display initial break time
    startTimer(); // Start the timer
}

/////////////// Reset Timer ///////////////////
function resetTimer() {
    clearInterval(timer); // Clear the timer if it's running
    timer = null; // Reset the timer variable
    workTimer = 25 * 60; // Reset work timer to 25 minutes
    breakTimer = 5 * 60;  // Reset break timer to 5 minutes
    updateDisplay(workTimer); // Display initial time
    isWorking = true; // Reset to work state
    isPaused = false; // Reset paused state
}

// Pause Functionality
function pauseTimer() {
    isPaused = !isPaused; // Toggle paused state
    pauseButton.textContent = isPaused ? "Resume" : "Pause"; // Update button text
}

// Start 5-minute timer
function startFiveMinuteTimer() {
    clearInterval(timer); // Clear the timer if it's running
    workTimer = fiveMinuteTimer; // Set work timer to 5 minutes
    updateDisplay(workTimer); // Update display
    isPaused = false; // Ensure the timer is not paused
    startWorktimer(); // Start the timer immediately
}

// Start 10-minute timer
function startTenMinuteTimer() {
    clearInterval(timer); // Clear the timer if it's running
    workTimer = tenMinuteTimer; // Set work timer to 10 minutes
    updateDisplay(workTimer); // Update display
    isPaused = false; // Ensure the timer is not paused
    startWorktimer(); // Start the timer immediately
}

// Add event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener("click", startWorktimer); // Start work timer
    pauseButton.addEventListener("click", pauseTimer); // Pause/Resume timer
    resetButton.addEventListener("click", resetTimer); // Reset timer
    fiveMinuteButton.addEventListener("click", startFiveMinuteTimer); // Start 5 minute timer
    tenMinuteButton.addEventListener("click", startTenMinuteTimer); // Start 10 minute timer
});

// Function to format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Initialize the display
updateDisplay(workTimer); // Show the initial timer value

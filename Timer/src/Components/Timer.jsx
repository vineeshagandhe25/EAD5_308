// Import necessary hooks from React
import React, { useState, useEffect, useRef } from 'react';

// Define the Timer component
function Timer() {
    // State hook to keep track of elapsed seconds
    const [seconds, setSeconds] = useState(0);

    // State hook to determine if the timer is active
    const [isActive, setIsActive] = useState(false);

    // State hook to determine if the timer is paused
    const [isPaused, setIsPaused] = useState(false);

    // Ref hook to keep a reference to the interval ID
    const intervalRef = useRef(null);

    // Effect hook to manage the timer's behavior
    useEffect(() => {
        // Check if the timer should be running (active and not paused)
        if (isActive && !isPaused) {
            // Start a new interval that updates the seconds every second
            intervalRef.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);

            // Cleanup function to clear the interval when the component unmounts or dependencies change
            return () => clearInterval(intervalRef.current);
        } else {
            // Clear the interval if the timer is not active or is paused
            clearInterval(intervalRef.current);
        }
    }, [isActive, isPaused]); // Dependencies: effect runs when isActive or isPaused changes

    // Handler to start the timer
    const startTimer = () => {
        setIsActive(true);  // Set the timer as active
        setIsPaused(false); // Ensure the timer is not paused
    };

    // Handler to pause the timer
    const pauseTimer = () => {
        setIsPaused(true); // Set the timer as paused
    };

    // Handler to reset the timer
    const resetTimer = () => {
        setIsActive(false); // Deactivate the timer
        setIsPaused(false); // Ensure the timer is not paused
        setSeconds(0);      // Reset the elapsed seconds to zero
    };

    // Render the Timer component
    return (
        <div>
            <h1>Timer</h1>
            {/* Display the timer in minutes and seconds format */}
            <p>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</p>
            {/* Button to start the timer */}
            <button onClick={startTimer} disabled={isActive && !isPaused}>Start</button>
            {/* Button to pause the timer */}
            <button onClick={pauseTimer} disabled={!isActive || isPaused}>Pause</button>
            {/* Button to reset the timer */}
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

// Export the Timer component for use in other files
export default Timer;

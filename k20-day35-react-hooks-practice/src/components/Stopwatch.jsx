import { useEffect, useState, useRef } from "react";
import StopwatchView from "./StopwatchView.jsx";

function Stopwatch() {
    const timerRef = useRef(null);

    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);

    const handleStart = () => {
        if (timerRef.current !== null) return;

        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
        }, 10);
        setIsRunning(true);
    };

    const handleStop = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsRunning(false);
    };

    const handleReset = () => {
        handleStop();
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps((prevLaps) => [...prevLaps, time]);
    };

    const handleDeleteLap = (index) => {
        setLaps((prevLaps) =>
            prevLaps.filter((lap, currentIndex) => currentIndex !== index),
        );
    };

    const handleDeleteAllLaps = () => {
        setLaps([]);
    };

    return (
        <StopwatchView
            time={time}
            laps={laps}
            isRunning={isRunning}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            onLap={handleLap}
            onDeleteLap={handleDeleteLap}
            onDeleteAllLaps={handleDeleteAllLaps}
        />
    );
}

export default Stopwatch;

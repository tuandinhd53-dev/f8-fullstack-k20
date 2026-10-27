import { useRef, useState, useEffect } from "react";
import AudioPlayerView from "../components/AudioPlayerView.jsx";
import StopwatchView from "../components/StopwatchView.jsx";
import { audioTracks } from "../data/audioTracks.js";

function AudioPlayerPage() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const curentTrack = audioTracks[currentTrackIndex];
    const audioSrc = curentTrack.src;

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.load();

        if (isPlaying) {
            audio.play();
        }
    }, [audioSrc]);

    const handleSelectTrack = (index) => {
        setCurrentTrackIndex(index);
    };

    const handleNextTrack = () => {
        setCurrentTrackIndex(
            (prevIndex) => (prevIndex + 1) % audioTracks.length,
        );
    };

    const handleEnded = () => {
        handleNextTrack();
    };

    const handlePreviousTrack = () => {
        setCurrentTrackIndex(
            (prevIndex) =>
                (prevIndex - 1 + audioTracks.length) % audioTracks.length,
        );
    };

    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };
    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handleToggleMute = () => {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolumeUp = () => {
        const nextVolume = Math.min(1, audioRef.current.volume + 0.1);

        audioRef.current.volume = nextVolume;
        setVolume(nextVolume);
    };

    const handleVolumeDown = () => {
        const nextVolume = Math.max(0, audioRef.current.volume - 0.1);

        audioRef.current.volume = nextVolume;
        setVolume(nextVolume);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (time) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setCurrentTime(audioRef.current.currentTime);
    };

    return (
        <main className="mx-auto max-w-5xl space-y-6 bg-slate-50 p-6">
            <AudioPlayerView
                audioRef={audioRef}
                audioSrc={audioSrc}
                trackTitle={curentTrack.title}
                tracks={audioTracks}
                onSelectTrack={handleSelectTrack}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
                volume={volume}
                volumeUp={handleVolumeUp}
                volumeDown={handleVolumeDown}
                currentTime={currentTime}
                duration={duration}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onSeek={handleSeek}
                nextIndex={handleNextTrack}
                prevIndex={handlePreviousTrack}
                onEnded={handleEnded}
            />

            <StopwatchView />
        </main>
    );
}

export default AudioPlayerPage;
//

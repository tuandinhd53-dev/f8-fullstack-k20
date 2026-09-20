import { showToast } from "../../libs/toast.js";
import { openGuestModal } from "../../libs/guestModal.js";

// =========================================================
// PLAYER DOM
// =========================================================

const audioPlayer = document.querySelector("#audio-player");

const playAllButton = document.querySelector("#btn-play-all");
const playAllIcon = document.querySelector("#play-all-icon");

const shuffleButton = document.querySelector("#shuffle-button");
const shuffleIconPlay = shuffleButton?.querySelector("svg");

const repeatButton = document.querySelector("#repeat-button");
const repeatIcon = repeatButton?.querySelector("svg");
const repeatOneIndicator = document.querySelector("#repeat-one-indicator");

const previousButton = document.querySelector("#player-previous");
const nextButton = document.querySelector("#player-next");

const playerCoverElement = document.querySelector("#player-cover");
const playerTitleElement = document.querySelector("#player-title");
const playerArtistElement = document.querySelector("#player-artist");

const currentTimeElement = document.querySelector("#current-time");
const durationElement = document.querySelector("#duration");

const progressBarElement = document.querySelector("#progress-bar");
const progressFillElement = document.querySelector("#progress-fill");
const progressThumb = document.querySelector("#progress-thumb");

const volumeButton = document.querySelector("#volume-button");
const volumeBar = document.querySelector("#volume-bar");
const volumeProgress = document.querySelector("#volume-progress");
const volumeThumb = document.querySelector("#volume-thumb");
const volumeIcon = volumeButton?.querySelector("svg");

const playButton = document.querySelector("#player-play");
const playIcon = document.querySelector("#player-play-icon");

// =========================================================
// STATE
// =========================================================

const PLAYER_STORAGE_KEY = "spotify_player_state";

let queue = [];

let currentTrackIndex = -1;

let currentTrack = null;

let isShuffle = false;

let repeatMode = "off";

let isDragging = false;

let isDraggingVolume = false;

let previousVolume = 0.7;

// =========================================================
// FORMAT DURATION
// =========================================================

const formatDuration = (seconds) => {
    const safeSeconds = Number(seconds);

    if (!Number.isFinite(safeSeconds) || safeSeconds < 0) {
        return "0:00";
    }

    const minutes = Math.floor(safeSeconds / 60);

    const remainingSeconds = Math.floor(safeSeconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

// =========================================================
// PLAYER STATE
// =========================================================

const savePlayerState = () => {
    if (!currentTrack) return;

    localStorage.setItem(
        PLAYER_STORAGE_KEY,
        JSON.stringify({
            track: currentTrack,
            currentTime: audioPlayer.currentTime,
            volume: audioPlayer.volume,
            isPlaying: !audioPlayer.paused,
            isShuffle,
            repeatMode,
        }),
    );
};

const restorePlayerState = () => {
    const savedState = localStorage.getItem(PLAYER_STORAGE_KEY);

    if (!savedState) return;

    try {
        const state = JSON.parse(savedState);

        currentTrack = state.track || null;

        isShuffle = Boolean(state.isShuffle);

        repeatMode = state.repeatMode || "off";

        if (state.volume !== undefined) {
            audioPlayer.volume = state.volume;

            previousVolume = state.volume;
        }

        updateShuffleUI();

        updateRepeatUI();

        if (!currentTrack) return;

        // Khôi phục thông tin Player
        playerCoverElement.src = currentTrack.image_url || "";

        playerTitleElement.textContent = currentTrack.title || "";

        playerArtistElement.textContent = currentTrack.artist_name || "";

        // Khôi phục bài hát
        audioPlayer.src = currentTrack.audio_url;

        // Chờ audio load xong mới set currentTime
        audioPlayer.addEventListener(
            "loadedmetadata",
            () => {
                audioPlayer.currentTime = Number(state.currentTime) || 0;

                updateProgress();

                durationElement.textContent = formatDuration(
                    audioPlayer.duration,
                );

                updatePlayIcon();

                if (state.isPlaying) {
                    audioPlayer
                        .play()
                        .then(() => {
                            updatePlayIcon();
                        })
                        .catch((error) => {
                            console.warn("Browser blocked autoplay:", error);
                        });
                }
            },
            { once: true },
        );

        // Sau khi listener đã sẵn sàng mới load audio
        audioPlayer.src = currentTrack.audio_url;
        audioPlayer.load();
    } catch (error) {
        console.error("Failed to restore player state:", error);

        localStorage.removeItem(PLAYER_STORAGE_KEY);
    }
};

// =========================================================
// QUEUE
// =========================================================

const setPlayerQueue = (tracks = []) => {
    queue = Array.isArray(tracks) ? tracks : [];

    if (currentTrack) {
        currentTrackIndex = queue.findIndex(
            (track) => track.id === currentTrack.id,
        );
    }
};

const getPlayerQueue = () => {
    return queue;
};

const getCurrentTrack = () => {
    return currentTrack;
};

// =========================================================
// PLAY ICON
// =========================================================

const updatePlayIcon = () => {
    const trackListElement = document.querySelector("#track-list");

    if (trackListElement) {
        const trackRows = trackListElement.querySelectorAll(".track-row");

        trackRows.forEach((trackRow) => {
            const trackId = trackRow.dataset.id;

            const trackIcon = trackRow.querySelector(".track-play-icon");

            const trackNumber = trackRow.querySelector(".track-number");

            const trackTitle = trackRow.querySelector(".track-title");

            if (!trackIcon) return;

            const isCurrentTrack = trackId === currentTrack?.id;

            const isPlaying = isCurrentTrack && !audioPlayer.paused;

            trackRow.classList.remove("is-playing");

            trackIcon.classList.remove("fa-pause");
            trackIcon.classList.add("fa-play");

            trackNumber?.classList.remove("text-[#1ed760]");

            trackNumber?.classList.add("text-[#B3B3B3]");

            trackTitle?.classList.remove("text-[#1ed760]");

            trackTitle?.classList.add("text-white");

            if (isPlaying) {
                trackRow.classList.add("is-playing");

                trackIcon.classList.remove("fa-play");
                trackIcon.classList.add("fa-pause");
            }

            if (isCurrentTrack) {
                trackNumber?.classList.remove("text-[#B3B3B3]");

                trackNumber?.classList.add("text-[#1ed760]");

                trackTitle?.classList.remove("text-white");

                trackTitle?.classList.add("text-[#1ed760]");
            }
        });
    }

    // Player Play / Pause icon
    if (playIcon) {
        playIcon.setAttribute(
            "d",
            audioPlayer.paused ? "M8 5v14l11-7z" : "M6 5h4v14H6zm8 0h4v14h-4z",
        );
    }

    // Tooltip
    if (playButton) {
        const isPlaying = !audioPlayer.paused;

        playButton.dataset.tooltip = isPlaying ? "Pause" : "Play";

        playButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    }

    // Play All icon
    if (playAllIcon) {
        playAllIcon.setAttribute(
            "d",
            audioPlayer.paused
                ? "M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"
                : "M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z",
        );
    }
};

// =========================================================
// PLAY / PAUSE
// =========================================================

const isPaused = () => {
    if (audioPlayer.paused) {
        audioPlayer.play().catch(() => {});
    } else {
        audioPlayer.pause();
    }
};

const playTrack = (track) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        openGuestModal();
        return;
    }

    if (!track) return;
    if (!track) return;

    // Click lại bài đang phát
    if (track.id === currentTrack?.id) {
        isPaused();
        return;
    }

    currentTrack = track;

    currentTrackIndex = queue.findIndex((item) => item.id === track.id);

    playerCoverElement.src = track.image_url || "";
    playerTitleElement.textContent = track.title || "";
    playerArtistElement.textContent = track.artist_name || "";

    audioPlayer.src = track.audio_url;

    audioPlayer
        .play()
        .then(() => {
            // Chỉ lưu sau khi audio thực sự bắt đầu phát
            savePlayerState();
            updatePlayIcon();
        })
        .catch((error) => {
            console.warn("Unable to autoplay:", error);

            // Nếu browser chặn autoplay,
            // vẫn lưu bài hiện tại nhưng trạng thái là pause.
            savePlayerState();
            updatePlayIcon();
        });
};
if (playButton) {
    playButton.addEventListener("click", () => {
        if (!currentTrack) {
            if (queue.length > 0) {
                playTrack(queue[0]);
            }

            return;
        }

        isPaused();
    });
}

// =========================================================
// NEXT TRACK
// =========================================================

const playNextTrack = () => {
    if (!queue.length) return;

    if (isShuffle) {
        let randomIndex = Math.floor(Math.random() * queue.length);

        while (queue.length > 1 && randomIndex === currentTrackIndex) {
            randomIndex = Math.floor(Math.random() * queue.length);
        }

        currentTrackIndex = randomIndex;

        playTrack(queue[currentTrackIndex]);

        showToast(`Đang phát: ${queue[currentTrackIndex].title}`);

        return;
    }

    if (currentTrackIndex >= queue.length - 1) {
        if (repeatMode === "all") {
            currentTrackIndex = 0;

            playTrack(queue[currentTrackIndex]);
        }

        return;
    }

    currentTrackIndex += 1;

    playTrack(queue[currentTrackIndex]);

    showToast(`Đang phát: ${queue[currentTrackIndex].title}`);
};

// =========================================================
// PREVIOUS TRACK
// =========================================================

const playPreviousTrack = () => {
    if (!queue.length) return;

    if (currentTrackIndex <= 0) return;

    currentTrackIndex -= 1;

    playTrack(queue[currentTrackIndex]);

    showToast(`Đang phát: ${queue[currentTrackIndex].title}`);
};

// =========================================================
// AUDIO ENDED
// =========================================================

audioPlayer.addEventListener("ended", () => {
    if (!queue.length) return;

    if (repeatMode === "one") {
        playTrack(queue[currentTrackIndex]);

        return;
    }

    playNextTrack();
});

// =========================================================
// PROGRESS
// =========================================================

const updateProgress = () => {
    const currentTime = audioPlayer.currentTime;

    const duration = audioPlayer.duration;

    currentTimeElement.textContent = formatDuration(currentTime);

    if (!duration || !Number.isFinite(duration)) {
        return;
    }

    const percent = (currentTime / duration) * 100;

    progressFillElement.style.width = `${percent}%`;

    progressThumb.style.left = `${percent}%`;
};

const seekAudio = (event) => {
    const rect = progressBarElement.getBoundingClientRect();

    const clickX = event.clientX;

    const clickPosition = clickX - rect.left;

    const percent = (clickPosition / rect.width) * 100;

    if (!Number.isFinite(audioPlayer.duration)) {
        return;
    }

    const time = (percent / 100) * audioPlayer.duration;

    audioPlayer.currentTime = time;

    savePlayerState();
};

audioPlayer.addEventListener("timeupdate", () => {
    updateProgress();

    savePlayerState();
});

audioPlayer.addEventListener("loadedmetadata", () => {
    durationElement.textContent = formatDuration(audioPlayer.duration);
});

progressBarElement.addEventListener("click", (event) => {
    seekAudio(event);
});

progressBarElement.addEventListener("pointerdown", (event) => {
    isDragging = true;

    progressBarElement.classList.add("is-dragging");

    progressBarElement.setPointerCapture(event.pointerId);

    seekAudio(event);
});

document.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    seekAudio(event);
});

document.addEventListener("pointerup", (event) => {
    if (!isDragging) return;

    isDragging = false;

    progressBarElement.classList.remove("is-dragging");

    if (progressBarElement.hasPointerCapture(event.pointerId)) {
        progressBarElement.releasePointerCapture(event.pointerId);
    }

    savePlayerState();
});

// =========================================================
// VOLUME
// =========================================================

const updateVolumeIcon = (volume) => {
    if (!volumeIcon) return;

    if (volume === 0) {
        volumeIcon.innerHTML = `
            <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 1 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06"></path>
            <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.64 3.64 0 0 0-1.33 4.967 3.64 3.64 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.7 4.7 0 0 1-1.5-.694v1.3L2.817 9.852a2.14 2.14 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694z"></path>
        `;

        volumeButton.dataset.tooltip = "Unmute";
    } else {
        volumeIcon.innerHTML = `
            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88"></path>
            <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127z"></path>
        `;

        volumeButton.dataset.tooltip = "Mute";
    }
};

const getVolume = (event) => {
    const rect = volumeBar.getBoundingClientRect();

    return (event.clientX - rect.left) / rect.width;
};

const setVolume = (volume) => {
    volume = Math.max(0, Math.min(1, volume));

    audioPlayer.volume = volume;

    volumeProgress.style.width = `${volume * 100}%`;

    volumeThumb.style.left = `${volume * 100}%`;

    updateVolumeIcon(volume);

    savePlayerState();
};

audioPlayer.volume = 0.7;

previousVolume = audioPlayer.volume;

volumeBar.addEventListener("click", (event) => {
    setVolume(getVolume(event));
});

volumeButton.addEventListener("click", () => {
    if (audioPlayer.volume === 0) {
        setVolume(previousVolume);
    } else {
        previousVolume = audioPlayer.volume;

        setVolume(0);
    }
});

volumeBar.addEventListener("pointerdown", (event) => {
    isDraggingVolume = true;

    setVolume(getVolume(event));
});

volumeBar.addEventListener("pointermove", (event) => {
    if (!isDraggingVolume) return;

    setVolume(getVolume(event));
});

document.addEventListener("pointerup", () => {
    isDraggingVolume = false;
});

setVolume(audioPlayer.volume);

// =========================================================
// REPEAT
// =========================================================

const updateRepeatUI = () => {
    if (!repeatIcon || !repeatOneIndicator) {
        return;
    }

    if (repeatMode === "off") {
        repeatIcon.classList.add("fill-[#B3B3B3]");

        repeatIcon.classList.remove("fill-[#1ED760]");

        repeatOneIndicator.classList.add("hidden");

        repeatButton.dataset.tooltip = "Enable Repeat";
    }

    if (repeatMode === "all") {
        repeatIcon.classList.remove("fill-[#B3B3B3]");

        repeatIcon.classList.add("fill-[#1ED760]");

        repeatOneIndicator.classList.add("hidden");

        repeatButton.dataset.tooltip = "Enable Repeat One";
    }

    if (repeatMode === "one") {
        repeatIcon.classList.remove("fill-[#B3B3B3]");

        repeatIcon.classList.add("fill-[#1ED760]");

        repeatOneIndicator.classList.remove("hidden");

        repeatButton.dataset.tooltip = "Disable Repeat";
    }
};

repeatButton.addEventListener("click", () => {
    if (repeatMode === "off") {
        repeatMode = "all";
    } else if (repeatMode === "all") {
        repeatMode = "one";
    } else {
        repeatMode = "off";
    }

    updateRepeatUI();

    savePlayerState();
});

// =========================================================
// SHUFFLE
// =========================================================

const updateShuffleUI = () => {
    if (!shuffleButton || !shuffleIconPlay) {
        return;
    }

    if (isShuffle) {
        shuffleIconPlay.classList.add("text-[#1ED760]");

        shuffleIconPlay.classList.remove("text-[#B3B3B3]");
    } else {
        shuffleIconPlay.classList.remove("text-[#1ED760]");

        shuffleIconPlay.classList.add("text-[#B3B3B3]");
    }
};

const toggleShuffle = () => {
    isShuffle = !isShuffle;

    updateShuffleUI();

    savePlayerState();
};

shuffleButton.addEventListener("click", toggleShuffle);

// =========================================================
// PLAY ALL BUTTON
// =========================================================

playAllButton.addEventListener("click", () => {
    if (!currentTrack) {
        if (queue.length > 0) {
            playTrack(queue[0]);
        }

        return;
    }

    isPaused();
});

// =========================================================
// PREVIOUS / NEXT BUTTON
// =========================================================

previousButton.addEventListener("click", playPreviousTrack);

nextButton.addEventListener("click", playNextTrack);

// =========================================================
// AUDIO EVENTS
// =========================================================

audioPlayer.addEventListener("play", () => {
    updatePlayIcon();

    savePlayerState();
});

audioPlayer.addEventListener("pause", () => {
    updatePlayIcon();

    savePlayerState();
});

// =========================================================
// SAVE BEFORE LEAVING PAGE
// =========================================================

window.addEventListener("beforeunload", () => {
    savePlayerState();
});

// =========================================================
// AUTO RESTORE
// =========================================================

// Quan trọng:
// Mỗi lần player.js được load trên Home hoặc Detail,
// tự động khôi phục bài hát đã lưu.

restorePlayerState();

// =========================================================
// EXPORT
// =========================================================

export {
    playTrack,
    isPaused,
    setPlayerQueue,
    getPlayerQueue,
    getCurrentTrack,
    updatePlayIcon,
    savePlayerState,
    restorePlayerState,
    formatDuration,
};

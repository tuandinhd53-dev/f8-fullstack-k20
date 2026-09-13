import "../../assets/style.css";
import { httpRequest } from "../../libs/httpRequest.js";
import { showToast } from "../../libs/toast.js";

// DOM
const loadingElement = document.querySelector("#loading");
const errorElement = document.querySelector("#error");
const footerMainElement = document.querySelector("#footer-main");
const entityDetailView = document.querySelector("#entity-detail-view");
const coverElement = document.querySelector("#entity-cover");
const typeElement = document.querySelector("#entity-type");
const titleElement = document.querySelector("#entity-title");
const authorAvatarElement = document.querySelector("#entity-author-avatar");
const authorNameElement = document.querySelector("#entity-author-name");
const releaseYearElement = document.querySelector("#entity-release-year");
const statsElement = document.querySelector("#entity-stats");
const trackListElement = document.querySelector("#track-list");
const albumElement = document.querySelector("#entity-album");
const artistVerifiedElement = document.querySelector("#artist-verified");
const commonMeta = document.querySelector("#common-meta");
const artistMonthlyListeners = document.querySelector(
    "#artist-monthly-listeners",
);
const heroBannerElement = document.querySelector("#entity-hero-banner");

const moreBySectionElement = document.querySelector("#more-by-section");
const moreByAuthorNameElement = document.querySelector("#more-by-author-name");
const moreByListElement = document.querySelector("#more-by-list");
const moreOptionsButton = document.querySelector("#btn-more-options");
const moreOptionsMenu = document.querySelector("#more-options-menu");
const addToPlaylistButton = document.querySelector("#btn-add-to-playlist");
const playlistSubmenu = document.querySelector("#playlist-submenu");

const playButton = document.querySelector("#player-play");
const playAllButton = document.querySelector("#btn-play-all");
const audioPlayer = document.querySelector("#audio-player");
const toggleLibraryButton = document.querySelector("#btn-toggle-library");
const btnFollow = document.querySelector("#btn-follow");
const shuffleButton = document.querySelector("#btn-shuffle");
const shuffleButtonPlay = document.querySelector("#shuffle-button");
const shuffleIconPlay = shuffleButtonPlay.querySelector("svg");
const shuffleIcon = shuffleButton.querySelector("svg");
const repeatButton = document.querySelector("#repeat-button");
const repeatIcon = repeatButton.querySelector("svg");
const repeatOneIndicator = document.querySelector("#repeat-one-indicator");
const volumeButton = document.querySelector("#volume-button");
const volumeBar = document.querySelector("#volume-bar");
const volumeProgress = document.querySelector("#volume-progress");
const volumeThumb = document.querySelector("#volume-thumb");
const volumeIcon = volumeButton.querySelector("svg");

const playerCoverElement = document.querySelector("#player-cover");
const playerTitleElement = document.querySelector("#player-title");
const playerArtistElement = document.querySelector("#player-artist");

// Dom path icon
const playIcon = document.querySelector("#player-play-icon");
const playAllIcon = document.querySelector("#play-all-icon");

// Dom Player
const currentTimeElement = document.querySelector("#current-time");
const progressBarElement = document.querySelector("#progress-bar");
const progressFillElement = document.querySelector("#progress-fill");
const progressThumb = document.querySelector("#progress-thumb");
const previousButton = document.querySelector("#player-previous");
const nextButton = document.querySelector("#player-next");

const durationEl = document.querySelector("#duration");

// Get data from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");
const url = `/api/${type}/${id}`;

// Format Duration

const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

// Cập nhật thanh thời lượng bài hát
const updateProgress = () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    // Hiển thị thời gian hiện tại
    currentTimeElement.textContent = formatDuration(currentTime);

    const percent = (currentTime / duration) * 100;

    progressFillElement.style.width = `${percent}%`;
    progressThumb.style.left = `${percent}%`;
};

// Audio đang chạy
audioPlayer.addEventListener("timeupdate", updateProgress);

// Hiển thị tổng thời gian
audioPlayer.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatDuration(audioPlayer.duration);
});

// Click để tua nhạc
let isDragging = false;

const seekAudio = (e) => {
    // Lấy tọa độ ProgressBarElement
    const rect = progressBarElement.getBoundingClientRect();

    // Lấy tọa độ Click
    const clickX = e.clientX;

    const clickPosition = clickX - rect.left;

    // Lấy khoảng cách từ đầu PBE đến vị trí Click
    const percent = (clickPosition / rect.width) * 100;

    // Đổi % thành thời gian
    const time = (percent / 100) * audioPlayer.duration;

    audioPlayer.currentTime = time;
};

progressBarElement.addEventListener("click", (e) => {
    seekAudio(e);
});

progressBarElement.addEventListener("pointerdown", (e) => {
    isDragging = true;
    progressBarElement.classList.add("is-dragging");
    progressBarElement.setPointerCapture(e.pointerId);
    seekAudio(e);
});

document.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    seekAudio(e);
});

document.addEventListener("pointerup", (e) => {
    isDragging = false;
    progressBarElement.classList.remove("is-dragging");

    progressBarElement.releasePointerCapture(e.pointerId);
});

// State
let currentTrackIndex = -1;
let currentTrack = null;
let detailTrack = null;
let tracks = [];
let myPlaylists = [];

// Play / Paused
const playTrack = (track) => {
    if (track.id === currentTrack?.id) {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    } else {
        currentTrack = track;
        // Cập nhật thông tin bài đang phát
        playerCoverElement.src = track.image_url;
        playerTitleElement.textContent = track.title;
        playerArtistElement.textContent = track.artist_name;

        audioPlayer.src = track.audio_url;
        audioPlayer.play();

        currentTrackIndex = tracks.findIndex((item) => item.id === track.id);
    }
};

// Hết nhạc tự động next

audioPlayer.addEventListener("ended", () => {
    // Repeat One
    if (repeatMode === "one") {
        playTrack(tracks[currentTrackIndex]);
        return;
    }

    // Đang ở bài cuối
    if (currentTrackIndex >= tracks.length - 1) {
        if (repeatMode === "all") {
            currentTrackIndex = 0;
            playTrack(tracks[currentTrackIndex]);
        }
        return;
    }

    // Sang bài tiếp theo
    currentTrackIndex += 1;

    playTrack(tracks[currentTrackIndex]);
    // Thông báo bài mới
    showToast(`Đang phát: ${tracks[currentTrackIndex].title}`);
});

// Previous
previousButton.addEventListener("click", () => {
    if (currentTrackIndex <= 0) return;

    currentTrackIndex -= 1;

    playTrack(tracks[currentTrackIndex]);
    showToast(`Đang phát: ${tracks[currentTrackIndex].title}`);
});

// Next
let isShuffle = false;
let repeatMode = "off";
nextButton.addEventListener("click", () => {
    // Shuffle ON → random

    if (isShuffle) {
        let randomIndex = Math.floor(Math.random() * tracks.length);

        while (randomIndex === currentTrackIndex) {
            randomIndex = Math.floor(Math.random() * tracks.length);
        }
        currentTrackIndex = randomIndex;
        playTrack(tracks[currentTrackIndex]);
        showToast(`Đang phát: ${tracks[currentTrackIndex].title}`);
    } else {
        if (currentTrackIndex >= tracks.length - 1) return;

        currentTrackIndex += 1;

        playTrack(tracks[currentTrackIndex]);
        showToast(`Đang phát: ${tracks[currentTrackIndex].title}`);
    }
});
// Volume

// Cập nhật icon volume
const updateVolumeIcon = (volume) => {
    if (volume === 0) {
        volumeIcon.innerHTML = `
            <!-- Volume mute -->
            <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06"></path>

        <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.64 3.64 0 0 0-1.33 4.967 3.64 3.64 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.7 4.7 0 0 1-1.5-.694v1.3L2.817 9.852a2.14 2.14 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694z"></path>
        `;

        volumeButton.dataset.tooltip = "Unmute";
    } else {
        volumeIcon.innerHTML = `
            <!-- Volume high -->
            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88"></path>

            <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127z"></path>
        `;

        volumeButton.dataset.tooltip = "Mute";
    }
};

const getVolume = (e) => {
    const rect = volumeBar.getBoundingClientRect();
    return (e.clientX - rect.left) / rect.width;
};

const setVolume = (volume) => {
    volume = Math.max(0, Math.min(1, volume));

    audioPlayer.volume = volume;
    volumeProgress.style.width = `${volume * 100}%`;
    volumeThumb.style.left = `${volume * 100}%`;
    updateVolumeIcon(volume);
};

audioPlayer.volume = 0.7;
let previousVolume = audioPlayer.volume;
let isDraggingVolume = false;

volumeBar.addEventListener("click", (e) => {
    setVolume(getVolume(e));
});

volumeButton.addEventListener("click", () => {
    if (audioPlayer.volume === 0) {
        setVolume(previousVolume);
    } else {
        previousVolume = audioPlayer.volume;
        setVolume(0);
    }
});

volumeBar.addEventListener("pointerdown", (e) => {
    isDraggingVolume = true;
    setVolume(getVolume(e));
});

volumeBar.addEventListener("pointermove", (e) => {
    if (!isDraggingVolume) return;

    setVolume(getVolume(e));
});

document.addEventListener("pointerup", () => {
    isDraggingVolume = false;
});

setVolume(audioPlayer.volume);

// Repeat
repeatButton.addEventListener("click", () => {
    if (repeatMode === "off") {
        repeatMode = "all";
        repeatIcon.classList.remove("fill-[#B3B3B3]");
        repeatIcon.classList.add("fill-[#1ED760]");
        repeatOneIndicator.classList.add("hidden");
        repeatButton.dataset.tooltip = "Enable Repeat One";
    } else if (repeatMode === "all") {
        repeatMode = "one";
        repeatIcon.classList.remove("fill-[#B3B3B3]");
        repeatIcon.classList.add("fill-[#1ED760]");
        repeatOneIndicator.classList.remove("hidden");
        repeatButton.dataset.tooltip = "Disable Repeat";
    } else if (repeatMode === "one") {
        repeatMode = "off";
        repeatIcon.classList.add("fill-[#B3B3B3]");
        repeatIcon.classList.remove("fill-[#1ED760]");
        repeatOneIndicator.classList.add("hidden");
        repeatButton.dataset.tooltip = "Enable Repeat";
    }
});

// Shuffle
shuffleButton.addEventListener("click", () => {
    toggleShuffle(shuffleIcon);
});

shuffleButtonPlay.addEventListener("click", () => {
    toggleShuffle(shuffleIconPlay);
});

// Play Button
playButton.addEventListener("click", () => {
    if (!currentTrack) {
        if (detailTrack) {
            playTrack(detailTrack);
        } else if (tracks.length > 0) {
            playTrack(tracks[0]);
        }
    } else {
        isPaused();
    }
});

// Button Player
playAllButton.addEventListener("click", () => {
    if (!currentTrack) return;
    isPaused();
});

// Kiểm tra có đang dừng hay phát
const isPaused = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
};

const toggleShuffle = (icon) => {
    isShuffle = !isShuffle;
    if (isShuffle) {
        icon.classList.add("text-[#1ED760]");
        icon.classList.remove("text-[#B3B3B3]");
        shuffleIcon.classList.remove("hover:fill-white");
        shuffleIconPlay.classList.remove("hover:fill-white");
    } else {
        icon.classList.remove("text-[#1ED760]");
        icon.classList.add("text-[#B3B3B3]");
        shuffleIcon.classList.add("hover:fill-white");
        shuffleIconPlay.classList.add("hover:fill-white");
    }
};

// Cập nhật trạng thái Track + icon Player
const updatePlayIcon = () => {
    const trackRows = trackListElement.querySelectorAll(".track-row");

    trackRows.forEach((trackRow) => {
        const trackId = trackRow.dataset.id;
        const trackIcon = trackRow.querySelector(".track-play-icon");

        const trackNumber = trackRow.querySelector(".track-number");
        const trackTitle = trackRow.querySelector(".track-title");

        if (!trackIcon) return;

        // Kiểm tra Track này có phải bài hiện tại không
        const isCurrentTrack = trackId === currentTrack?.id;

        // Kiểm tra Track hiện tại có đang phát không
        const isPlaying = isCurrentTrack && !audioPlayer.paused;

        // Reset trạng thái
        trackRow.classList.remove("is-playing");

        trackIcon.classList.remove("fa-pause");
        trackIcon.classList.add("fa-play");

        trackNumber?.classList.remove("text-[#1ed760]");
        trackNumber?.classList.add("text-[#B3B3B3]");

        trackTitle?.classList.remove("text-[#1ed760]");
        trackTitle?.classList.add("text-white");

        // Track hiện tại đang phát
        if (isPlaying) {
            trackRow.classList.add("is-playing");

            trackIcon.classList.remove("fa-play");
        }

        if (isCurrentTrack) {
            trackNumber?.classList.remove("text-[#B3B3B3]");
            trackNumber?.classList.add("text-[#1ed760]");

            trackTitle?.classList.remove("text-white");
            trackTitle?.classList.add("text-[#1ed760]");
        }
    });

    // Icon Player chính
    if (audioPlayer.paused) {
        playIcon.setAttribute("d", "M8 5v14l11-7z");

        playAllIcon.setAttribute(
            "d",
            "M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z",
        );
    } else {
        playIcon.setAttribute(
            "d",
            "M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z",
        );

        playAllIcon.setAttribute(
            "d",
            "M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z",
        );
    }
};

// Render thông tin Detail
const renderDetail = (data, type) => {
    // Hiển thị ảnh
    coverElement.src = data.cover_image_url || data.image_url || "";

    // Artist dùng ảnh tròn, loại khác dùng ảnh vuông
    if (type === "artists") {
        coverElement.classList.remove("rounded");
        coverElement.classList.add("rounded-full");
    } else {
        coverElement.classList.remove("rounded-full");
        coverElement.classList.add("rounded");
    }

    // Hiển thị tên
    titleElement.textContent =
        type === "artists" ? data.name || "" : data.title || "";

    // Hiển thị loại nội dung
    if (type === "tracks") {
        typeElement.textContent = "single";
    } else if (type === "albums") {
        typeElement.textContent = "Album";
    } else if (type === "artists") {
        typeElement.textContent = "Artist";
    } else if (type === "playlists") {
        typeElement.textContent = "Playlist";
    }

    // Reset Artist UI
    artistVerifiedElement.classList.add("hidden");
    artistVerifiedElement.classList.remove("flex");

    artistMonthlyListeners.classList.add("hidden");

    btnFollow.classList.add("hidden");
    toggleLibraryButton.classList.remove("hidden");
    moreOptionsButton.classList.remove("hidden");

    // Reset metadata chung
    commonMeta.classList.remove("hidden");

    authorAvatarElement.src = "";
    authorNameElement.textContent = "";
    releaseYearElement.textContent = "";
    statsElement.textContent = "";

    // Reset Album của Track
    albumElement.textContent = "";
    albumElement.removeAttribute("data-album-id");
    albumElement.classList.remove("cursor-pointer", "hover:underline");

    // Reset More by
    moreBySectionElement.classList.add("hidden");

    // Hiển thị Album của Track
    if (type === "tracks") {
        albumElement.innerHTML = `
            <button
                type="button"
                data-album-id="${data.album_id}"
                class="text-white hover:underline"
            >
                Album: ${data.album_title}
            </button>
        `;

        authorNameElement.textContent = data.artist_name || "";
        authorAvatarElement.src = data.artist_image_url || "";

        if (data.release_date) {
            const releaseYear = new Date(data.release_date).getFullYear();

            releaseYearElement.textContent = releaseYear;
        }

        statsElement.textContent = formatDuration(data.duration);
    }

    // Hiển thị Album
    if (type === "albums") {
        authorNameElement.textContent = data.artist_name || "";
        authorAvatarElement.src = data.artist_image_url || "";

        if (data.release_date) {
            const releaseYear = new Date(data.release_date).getFullYear();

            releaseYearElement.textContent = releaseYear;
        }

        statsElement.textContent = `${data.total_tracks || 0} songs • ${formatDuration(
            data.total_duration || 0,
        )}`;

        if (data.play_count !== undefined) {
            statsElement.textContent += ` • ${data.play_count.toLocaleString()} plays`;
        }
    }

    // Hiển thị Artist
    if (type === "artists") {
        // Background
        heroBannerElement.style.backgroundImage = `url("${data.background_image_url}")`;

        // Verified
        if (data.is_verified) {
            artistVerifiedElement.classList.remove("hidden");
            artistVerifiedElement.classList.add("flex");
        }

        // Monthly listeners
        artistMonthlyListeners.textContent = `${data.monthly_listeners?.toLocaleString() || 0} monthly listeners`;

        artistMonthlyListeners.classList.remove("hidden");

        // Ẩn metadata chung
        commonMeta.classList.add("hidden");

        // Hiện More by
        moreBySectionElement.classList.remove("hidden");
        moreByAuthorNameElement.textContent = data.name || "";

        // Follow
        btnFollow.classList.remove("hidden");
        toggleLibraryButton.classList.add("hidden");
        moreOptionsButton.classList.add("hidden");
    }
};
// Render Artists Popular
const renderArtistTracks = (tracks) => {
    if (!tracks.length) {
        trackListElement.innerHTML = `
            <p class="py-6 text-sm text-[#B3B3B3]">
                No tracks available.
            </p>
        `;
        return;
    }

    trackListElement.innerHTML = tracks
        .map(
            (track, index) => `
                <div
                    class="group grid grid-cols-[16px_1fr_100px_60px] items-center gap-4 rounded-md px-4 py-2 text-sm transition-colors hover:bg-[#1f1f1f]"
                    data-track-id="${track.id}"
                >
                    <!-- STT + nút Play -->
                    <div class="relative flex items-center justify-center">
                        <span class="track-number text-[#B3B3B3] group-hover:hidden">
                            ${index + 1}
                        </span>

                        <button
                            type="button"
                            class="track-play hidden group-hover:block"
                            data-track-id="${track.id}"
                        >
                            <i class="fa-solid fa-play text-white"></i>
                        </button>
                    </div>

                    <!-- Thông tin bài hát -->
                    <div class="flex min-w-0 items-center gap-3">
                        <img
                            src="${track.image_url}"
                            alt="${track.title}"
                            class="h-10 w-10 shrink-0 rounded object-cover"
                        />

                        <div class="min-w-0">
                            <p class="truncate font-medium text-white">
                                ${track.title}
                            </p>

                            <p class="truncate text-xs text-[#B3B3B3]">
                                ${track.artist_name}
                            </p>
                        </div>
                    </div>

                    <!-- Lượt nghe -->
                    <span class="truncate text-right text-xs text-[#B3B3B3]">
                        ${track.play_count.toLocaleString()}
                    </span>

                    <!-- Thời lượng -->
                    <span class="text-right text-xs text-[#B3B3B3]">
                        ${formatDuration(track.duration)}
                    </span>
                </div>
            `,
        )
        .join("");
};

// Render Artists Albums

const renderArtistAlbums = (albums) => {
    // Nếu ko có album
    if (!albums.length) {
        moreByListElement.innerHTML = `
            <p class="py-6 text-sm text-[#B3B3B3]">
                No albums available.
            </p>
        `;
        return;
    }

    moreByListElement.innerHTML = albums
        .map(
            (album) =>
                `
            <article
                class="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-[#1f1f1f]"
                data-id="${album.id}"
                data-type="albums"
            >
                <div class="relative aspect-square overflow-hidden rounded-md">
                    <img
                        src="${album.cover_image_url}"
                        alt="${album.title}"
                        class="h-full w-full object-cover"
                    />

                    <button
                        type="button"
                        class="absolute right-2 bottom-2 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        <i class="fa-solid fa-play"></i>
                    </button>
                </div>

                <div class="mt-3 min-w-0">
                    <h3 class="truncate text-sm font-semibold text-white">
                        ${album.title}
                    </h3>

                    <p class="mt-1 text-sm text-[#B3B3B3]">
                        ${new Date(album.release_date).getFullYear()}
                    </p>
                </div>
            </article>
        `,
        )
        .join("");
};

// Render danh sách bài hát
const renderTracks = (tracks) => {
    if (!tracks.length) {
        trackListElement.innerHTML = `
            <p class="py-6 text-sm text-[#B3B3B3]">
                No tracks available.
            </p>
        `;
        return;
    }

    trackListElement.innerHTML = tracks
        .map(
            (track, index) =>
                `

<div
    class="track-row group grid grid-cols-[40px_1fr_120px] items-center gap-4 rounded-md px-4 py-2 hover:bg-white/10"
    data-id="${track.id}"
    data-type="tracks"
>
    
    <!-- Khu vực số thứ tự / Play / Equalizer -->
<div class="relative flex h-8 w-8 items-center justify-center">
    <div class="track-number text-sm text-[#B3B3B3]">
        ${index + 1}
    </div>

    <button
        type="button"
        class="track-play-button  h-8 w-8 items-center justify-center"
        aria-label="Play ${track.title}"
        data-track-id="${track.id}"
    >
        <i class="track-play-icon fa-solid fa-play text-sm text-white"></i>
    </button>

    <div
    class="track-equalizer  items-end justify-center gap-[1px]"
    aria-hidden="true"
>
    <span class="equalizer-bar"></span>
    <span class="equalizer-bar"></span>
    <span class="equalizer-bar"></span>
    <span class="equalizer-bar"></span>
</div>
</div>

    <!-- Thông tin bài hát -->
    <div class="flex min-w-0 items-center gap-3">
        <img
            src="${track.image_url}"
            alt="${track.title}"
            class="h-10 w-10 shrink-0 rounded object-cover"
        />

        <div class="min-w-0">
            <p data-album-id="${track.album_id}" class="track-title truncate hover:underline text-sm font-medium text-white">
                ${track.title}
            </p>

            <p class="truncate text-sm text-[#B3B3B3]">${track.artist_name}</p>
        </div>
    </div>

    <!-- Thời lượng -->
    <span class="text-right text-sm text-[#B3B3B3]">
        ${formatDuration(track.duration)}
    </span>
</div>
`,
        )
        .join("");
};

// State

let artistAlbums = [];
let artistTracks = [];
let detailData = null;

// Fetch dữ liệu Detail
const loadDetail = async () => {
    try {
        let data;

        if (type === "tracks") {
            // Track → lấy trực tiếp Track
            data = await httpRequest.get(`/api/tracks/${id}`);

            // Lưu Track hiện tại cho Player
            detailTrack = data;
        } else {
            // Album / Artist / Playlist
            data = await httpRequest.get(`/api/${type}/${id}`);
        }

        console.log("DATA:", data);

        if (type === "tracks") {
            // Track Detail chỉ hiển thị bài hiện tại
            tracks = [data];

            renderTracks(tracks);
        } else if (type === "albums") {
            // Chỉ Album mới lấy danh sách bài hát
            const trackData = await httpRequest.get(
                `/api/albums/${data.id}/tracks`,
            );

            tracks = trackData.tracks;

            // Render danh sách bài hát
            renderTracks(tracks);
        } else if (type === "playlists") {
            // Lấy danh sách bài hát của Playlist
            const trackData = await httpRequest.get(
                `/api/playlists/${data.id}/tracks`,
            );

            // Chuẩn hóa dữ liệu Playlist về format chung của Track

            const normalizedTracks = trackData.tracks.map((track) => {
                return {
                    id: track.track_id,
                    title: track.track_title,
                    image_url: track.track_image_url,
                    audio_url: track.track_audio_url,
                    duration: track.track_duration,
                    artist_name: track.artist_name,
                    album_id: track.album_id,
                };
            });

            // Gán danh sách bài hát cho Player
            tracks = normalizedTracks;

            // Render danh sách bài hát
            renderTracks(tracks);
        }

        if (type === "artists") {
            const [albumData, trackData] = await Promise.all([
                httpRequest.get(`/api/artists/${id}/albums`),
                httpRequest.get(`/api/tracks?limit=50&offset=0`),
            ]);

            artistAlbums = albumData.albums;
            artistTracks = trackData.tracks.filter(
                (track) => track.artist_id === data.id,
            );
            tracks = artistTracks;

            renderArtistAlbums(artistAlbums);
            renderArtistTracks(artistTracks);
        }

        // Render thông tin Detail
        renderDetail(data, type);

        detailData = data;

        // Hiển thị giao diện
        entityDetailView.classList.remove("hidden");
        footerMainElement.classList.remove("hidden");
    } catch (error) {
        console.error("Lỗi", error);
        errorElement.classList.remove("hidden");
    } finally {
        loadingElement.classList.add("hidden");
    }
};

loadDetail();

// Event//

// Follow
btnFollow.addEventListener("click", () => {
    detailData.is_following = !detailData.is_following;

    console.log(detailData.is_following);
    btnFollow.textContent = detailData.is_following ? "Following" : "Follow";
});

// Chuyển hướng

albumElement.addEventListener("click", (e) => {
    const button = e.target.closest("[data-album-id]");

    if (!button) return;

    const albumId = button.dataset.albumId;

    window.location.href = `/detail.html?type=albums&id=${albumId}`;
});

trackListElement.addEventListener("click", (e) => {
    // Click tên bài → chuyển sang Album
    const album = e.target.closest("[data-album-id]");

    if (album) {
        const albumId = album.dataset.albumId;

        window.location.href = `/detail.html?type=albums&id=${albumId}`;

        return;
    }

    // Click nút Play → phát bài
    const button = e.target.closest("[data-track-id]");

    // Nếu ko phải Button thì return
    if (!button) return;

    // Lấy trackId từ dataset

    const trackId = button.dataset.trackId;

    // Tìm Track tương ứng trong mảng tracks

    const track = tracks.find((t) => t.id === trackId);

    if (!track) return;

    playTrack(track);
});

// MoreBy ListElement Click
moreByListElement.addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");

    if (!card) return;

    const { id, type } = card.dataset;

    window.location.href = `/detail.html?type=${type}&id=${id}`;
});

// More Options Button


document.addEventListener("click", (e) => {
    if (
        !moreOptionsButton.contains(e.target) &&
        !moreOptionsMenu.contains(e.target)
    ) {
        moreOptionsMenu.classList.add("hidden");
    }
});

// Mở / đóng menu More Options
moreOptionsButton.addEventListener("click", () => {
    moreOptionsMenu.classList.toggle("hidden");
});

// Mở / đóng submenu Add to Playlist
addToPlaylistButton.addEventListener("click", () => {
    playlistSubmenu.classList.toggle("hidden");
});
audioPlayer.addEventListener("play", updatePlayIcon);
audioPlayer.addEventListener("pause", updatePlayIcon);

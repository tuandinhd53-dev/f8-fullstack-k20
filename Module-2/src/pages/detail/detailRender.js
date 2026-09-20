// =========================================================
// DETAIL RENDER
// =========================================================

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

const toggleLibraryButton = document.querySelector("#btn-toggle-library");
const btnFollow = document.querySelector("#btn-follow");
const btnLike = document.querySelector("#btn-like");
const likeIcon = document.querySelector("#like-icon");

const playlistActionButtonsElement = document.querySelector(
    "#playlist-action-buttons",
);

const playlistDescriptionElement = document.querySelector(
    "#playlist-description",
);

const metaSeparatorYear = document.querySelector("#meta-separator-year");
const metaSeparatorStats = document.querySelector("#meta-separator-stats");

// =========================================================
// FORMAT DURATION
// =========================================================

export const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

// =========================================================
// LIKE UI
// =========================================================

export const updateLikeUI = (isLiked) => {
    if (!likeIcon || !btnLike) {
        return;
    }

    likeIcon.className = isLiked
        ? "fa-solid fa-heart text-[#1DB954] text-2xl"
        : "fa-regular fa-heart text-2xl";

    btnLike.dataset.tooltip = isLiked ? "Unlike" : "Like";

    btnLike.setAttribute("aria-label", isLiked ? "Unlike" : "Like");
};

// =========================================================
// LIBRARY UI
// =========================================================

export const updateLibraryUI = (isSaved) => {
    if (!toggleLibraryButton) {
        return;
    }

    toggleLibraryButton.innerHTML = isSaved
        ? `
            <svg
                viewBox="0 0 24 24"
                class="h-8 w-8 text-[#1DB954] fill-current"
                aria-hidden="true"
            >
                <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m16.398-2.38a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308z"></path>
            </svg>
        `
        : `
            <svg
                viewBox="0 0 24 24"
                class="h-8 w-8 fill-current"
                aria-hidden="true"
            >
                <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11"></path>
                <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 0 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1"></path>
            </svg>
        `;

    toggleLibraryButton.classList.toggle("text-sp-bg-base", isSaved);
    toggleLibraryButton.classList.toggle("text-[#b3b3b3]", !isSaved);

    toggleLibraryButton.dataset.tooltip = isSaved
        ? "Remove from Your Library"
        : "Save to Your Library";
};

// =========================================================
// RESET DETAIL UI
// =========================================================

const resetDetailUI = () => {
    artistVerifiedElement.classList.add("hidden");
    artistVerifiedElement.classList.remove("flex");

    artistMonthlyListeners.classList.add("hidden");

    btnFollow.classList.add("hidden");

    toggleLibraryButton.classList.remove("hidden");
    moreOptionsButton.classList.remove("hidden");

    playlistActionButtonsElement.innerHTML = "";

    playlistDescriptionElement.textContent = "";
    playlistDescriptionElement.classList.add("hidden");

    commonMeta.classList.remove("hidden");

    authorAvatarElement.classList.remove("hidden");
    authorAvatarElement.src = "";

    authorNameElement.textContent = "";
    releaseYearElement.textContent = "";
    statsElement.textContent = "";

    releaseYearElement.classList.remove("hidden");

    metaSeparatorYear.classList.remove("hidden");
    metaSeparatorStats.classList.remove("hidden");

    albumElement.textContent = "";
    albumElement.removeAttribute("data-album-id");
    albumElement.classList.remove("cursor-pointer", "hover:underline");

    moreBySectionElement.classList.add("hidden");
};

// =========================================================
// RENDER DETAIL
// =========================================================

export const renderDetail = (data, type, state) => {
    const { tracks = [], isOwnPlaylist, isLikedSongs, currentUser } = state;

    // =====================================================
    // COVER
    // =====================================================

    if (type !== "playlists" || !isLikedSongs) {
        const imageUrl = data.cover_image_url || data.image_url || "";

        if (type === "playlists" && isOwnPlaylist) {
            coverElement.innerHTML = `
                <button
                    id="btn-change-playlist-cover"
                    type="button"
                    class="group relative h-full w-full"
                >
                    <img
                        src="${imageUrl}"
                        alt="${data.name || ""}"
                        class="h-full w-full object-cover"
                    />

                    <div
                        class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <i class="fa-solid fa-pen text-2xl text-white"></i>

                        <span class="mt-2 text-sm font-semibold text-white">
                            Choose photo
                        </span>
                    </div>
                </button>
            `;
        } else {
            coverElement.innerHTML = `
                <img
                    src="${imageUrl}"
                    alt="${data.title || data.name || ""}"
                    class="h-full w-full object-cover"
                />
            `;
        }
    }

    // =====================================================
    // COVER SHAPE
    // =====================================================

    if (type === "artists") {
        coverElement.classList.remove("rounded");
        coverElement.classList.add("rounded-full");
    } else {
        coverElement.classList.remove("rounded-full");
        coverElement.classList.add("rounded");
    }

    // =====================================================
    // HERO
    // =====================================================

    heroBannerElement.className =
        "flex items-end gap-6 bg-gradient-to-b from-[#8a1c22] via-[#521316] to-[#121212] p-8 pt-16";

    heroBannerElement.style.backgroundImage = "";

    // =====================================================
    // TITLE
    // =====================================================

    titleElement.textContent =
        type === "artists" ? data.name || "" : data.title || data.name || "";

    // =====================================================
    // TYPE
    // =====================================================

    if (type === "tracks") {
        typeElement.textContent = "single";
    } else if (type === "albums") {
        typeElement.textContent = "Album";
    } else if (type === "artists") {
        typeElement.textContent = "Artist";
    } else if (type === "playlists") {
        typeElement.textContent = "Playlist";
    }

    resetDetailUI();

    // =====================================================
    // RESET LIKE
    // =====================================================

    updateLikeUI(Boolean(data.is_liked));

    // =====================================================
    // TRACK
    // =====================================================

    if (type === "tracks") {
        albumElement.innerHTML = `
            <button
                type="button"
                data-album-id="${data.album_id || ""}"
                class="text-white hover:underline"
            >
                Album: ${data.album_title || ""}
            </button>
        `;

        authorNameElement.textContent = data.artist_name || "";

        authorAvatarElement.src = data.artist_image_url || "";

        if (data.release_date) {
            releaseYearElement.textContent = new Date(
                data.release_date,
            ).getFullYear();
        }

        statsElement.textContent = formatDuration(data.duration || 0);

        toggleLibraryButton.classList.add("hidden");
    }

    // =====================================================
    // ALBUM
    // =====================================================

    if (type === "albums") {
        authorNameElement.textContent = data.artist_name || "";

        authorAvatarElement.src = data.artist_image_url || "";

        if (data.release_date) {
            releaseYearElement.textContent = new Date(
                data.release_date,
            ).getFullYear();
        }

        statsElement.textContent = `${data.total_tracks || 0} songs • ${formatDuration(
            data.total_duration || 0,
        )}`;

        if (data.play_count !== undefined) {
            statsElement.textContent += ` • ${data.play_count.toLocaleString()} plays`;
        }

        updateLibraryUI(Boolean(data.is_liked));
    }

    // =====================================================
    // ARTIST
    // =====================================================

    if (type === "artists") {
        heroBannerElement.style.backgroundImage = `url("${data.background_image_url || ""}")`;

        if (data.is_verified) {
            artistVerifiedElement.classList.remove("hidden");
            artistVerifiedElement.classList.add("flex");
        }

        artistMonthlyListeners.textContent = `${
            data.monthly_listeners?.toLocaleString() || 0
        } monthly listeners`;

        artistMonthlyListeners.classList.remove("hidden");

        commonMeta.classList.add("hidden");

        moreBySectionElement.classList.remove("hidden");

        moreByAuthorNameElement.textContent = data.name || "";

        btnFollow.classList.remove("hidden");

        toggleLibraryButton.classList.add("hidden");

        moreOptionsButton.classList.add("hidden");

        btnFollow.textContent = data.is_following ? "Following" : "Follow";
    }

    // =====================================================
    // PLAYLIST
    // =====================================================

    if (type === "playlists") {
        // =================================================
        // LIKED SONGS
        // =================================================

        if (isLikedSongs) {
            const totalTracks = tracks.length;

            const totalDuration = tracks.reduce(
                (total, track) => total + Number(track.duration || 0),
                0,
            );

            const totalMinutes = Math.floor(totalDuration / 60);
            const totalSeconds = totalDuration % 60;

            const formattedDuration = `${totalMinutes}min ${String(
                totalSeconds,
            ).padStart(2, "0")} sec`;

            const userName =
                data.user_display_name ||
                data.user_username ||
                currentUser?.display_name ||
                currentUser?.username ||
                "";

            heroBannerElement.className =
                "flex items-end gap-6 bg-gradient-to-b from-[#4101f5] via-[#2b0c7a] to-[#121212] p-8 pt-16";

            coverElement.className =
                "flex h-52 w-52 shrink-0 items-center justify-center overflow-hidden rounded bg-gradient-to-br from-[#4101f5] via-[#755deb] to-[#bde7d3] shadow-2xl";

            coverElement.innerHTML = `
                <svg
                    viewBox="0 0 24 24"
                    width="72"
                    height="72"
                    fill="white"
                    aria-hidden="true"
                >
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                        2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                        C13.09 3.81 14.76 3 16.5 3
                        19.58 3 22 5.42 22 8.5
                        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                </svg>
            `;

            typeElement.textContent = "Playlist";
            titleElement.textContent = "Liked Songs";

            authorAvatarElement.classList.add("hidden");

            authorNameElement.textContent = userName;

            releaseYearElement.classList.add("hidden");
            metaSeparatorYear.classList.add("hidden");

            statsElement.textContent = `${totalTracks} songs • ${formattedDuration}`;

            btnFollow.classList.add("hidden");

            toggleLibraryButton.classList.remove("hidden");
            moreOptionsButton.classList.remove("hidden");

            btnLike.classList.add("hidden");

            return;
        }

        // =================================================
        // NORMAL PLAYLIST
        // =================================================

        if (data.description) {
            playlistDescriptionElement.textContent = data.description;
            playlistDescriptionElement.classList.remove("hidden");
        }

        btnLike.classList.add("hidden");
        moreOptionsButton.classList.remove("hidden");

        // =================================================
        // OWN PLAYLIST
        // =================================================

        if (isOwnPlaylist) {
            btnFollow.classList.add("hidden");
            toggleLibraryButton.classList.add("hidden");

            playlistActionButtonsElement.innerHTML = `
                <button
                    id="btn-edit-playlist"
                    type="button"
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-[#282828] text-white hover:bg-[#3a3a3a]"
                    title="Edit playlist"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    id="btn-delete-playlist"
                    type="button"
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-[#282828] text-red-400 hover:bg-[#3a3a3a]"
                    title="Delete playlist"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            titleElement.classList.add("cursor-pointer", "hover:underline");

            titleElement.title = "Edit playlist";
        }

        // =================================================
        // OTHER PLAYLIST
        // =================================================
        else {
            btnFollow.classList.remove("hidden");

            btnFollow.textContent = data.is_following ? "Following" : "Follow";

            toggleLibraryButton.classList.remove("hidden");

            updateLibraryUI(Boolean(data.is_following));

            playlistActionButtonsElement.innerHTML = "";

            titleElement.classList.remove("cursor-pointer", "hover:underline");

            titleElement.removeAttribute("title");
        }
    }
};

// =========================================================
// RENDER TRACKS
// =========================================================

export const renderTracks = (tracks, isLikedSongs = false) => {
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
                    class="track-row group grid grid-cols-[40px_1fr_40px_120px] items-center gap-4 rounded-md px-4 py-2 hover:bg-white/10"
                    data-id="${track.id}"
                    data-type="tracks"
                >
                    <div class="relative flex h-8 w-8 items-center justify-center">
                        <div class="track-number text-sm text-[#B3B3B3]">
                            ${index + 1}
                        </div>

                        <button
                            type="button"
                            class="track-play-button h-8 w-8 items-center justify-center"
                            aria-label="Play ${track.title || ""}"
                            data-track-id="${track.id}"
                        >
                            <i class="track-play-icon fa-solid fa-play text-sm text-white"></i>
                        </button>

                        <div
                            class="track-equalizer items-end justify-center gap-[1px]"
                            aria-hidden="true"
                        >
                            <span class="equalizer-bar"></span>
                            <span class="equalizer-bar"></span>
                            <span class="equalizer-bar"></span>
                            <span class="equalizer-bar"></span>
                        </div>
                    </div>

                    <div class="flex min-w-0 items-center gap-3">
                        <img
                            src="${track.image_url || ""}"
                            alt="${track.title || ""}"
                            class="h-10 w-10 shrink-0 rounded object-cover"
                        />

                        <div class="min-w-0">
                            <p
                                data-album-id="${track.album_id || ""}"
                                class="track-title truncate text-sm font-medium text-white hover:underline"
                            >
                                ${track.title || ""}
                            </p>

                            <p class="truncate text-sm text-[#B3B3B3]">
                                ${track.artist_name || ""}
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center justify-center">
                        ${
                            isLikedSongs
                                ? `
                                    <button
                                        type="button"
                                        class="remove-liked-button tooltip"
                                        data-track-id="${track.id}"
                                        data-tooltip="Remove from Liked Songs"
                                        aria-label="Remove from Liked Songs"
                                    >
                                        <i class="fa-solid fa-heart-crack text-sm text-[#1ed760]"></i>
                                    </button>
                                `
                                : ""
                        }
                    </div>

                    <span class="text-right text-sm text-[#B3B3B3]">
                        ${formatDuration(track.duration || 0)}
                    </span>
                </div>
            `,
        )
        .join("");
};

// =========================================================
// RENDER ARTIST TRACKS
// =========================================================

export const renderArtistTracks = (tracks) => {
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
                    class="track-row group grid grid-cols-[40px_1fr_100px_60px] items-center gap-4 rounded-md px-4 py-2 text-sm transition-colors hover:bg-[#1f1f1f]"
                    data-id="${track.id}"
                >
                    <!-- Track number / play / equalizer -->
                    <div class="relative flex h-8 w-8 items-center justify-center">

                        <span class="track-number text-[#B3B3B3] group-hover:hidden">
                            ${index + 1}
                        </span>

                        <button
                            type="button"
                            class="track-play-button hidden h-8 w-8 items-center justify-center group-hover:flex"
                            data-track-id="${track.id}"
                            aria-label="Play ${track.title || ""}"
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

                    <!-- Track information -->
                    <div class="flex min-w-0 items-center gap-3">

                        <img
                            src="${track.image_url || ""}"
                            alt="${track.title || ""}"
                            class="h-10 w-10 shrink-0 rounded object-cover"
                        />

                        <div class="min-w-0">
                            <p
                                class="track-title truncate font-medium text-white"
                            >
                                ${track.title || ""}
                            </p>

                            <p class="truncate text-xs text-[#B3B3B3]">
                                ${track.artist_name || ""}
                            </p>
                        </div>

                    </div>

                    <!-- Play count -->
                    <span class="truncate text-right text-xs text-[#B3B3B3]">
                        ${(track.play_count || 0).toLocaleString()}
                    </span>

                    <!-- Duration -->
                    <span class="text-right text-xs text-[#B3B3B3]">
                        ${formatDuration(track.duration || 0)}
                    </span>
                </div>
            `,
        )
        .join("");
};

// =========================================================
// RENDER ARTIST ALBUMS
// =========================================================

export const renderArtistAlbums = (albums) => {
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
            (album) => `
                <article
                    class="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-[#1f1f1f]"
                    data-id="${album.id}"
                    data-type="albums"
                >
                    <div class="relative aspect-square overflow-hidden rounded-md">
                        <img
                            src="${album.cover_image_url || ""}"
                            alt="${album.title || ""}"
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
                            ${album.title || ""}
                        </h3>

                        <p class="mt-1 text-sm text-[#B3B3B3]">
                            ${
                                album.release_date
                                    ? new Date(album.release_date).getFullYear()
                                    : ""
                            }
                        </p>
                    </div>
                </article>
            `,
        )
        .join("");
};

// =========================================================
// FINAL UI
// =========================================================

export const showDetailPage = () => {
    entityDetailView.classList.remove("hidden");
    footerMainElement.classList.remove("hidden");
};

export const showDetailError = () => {
    errorElement.classList.remove("hidden");
};

export const hideLoading = () => {
    loadingElement.classList.add("hidden");
};

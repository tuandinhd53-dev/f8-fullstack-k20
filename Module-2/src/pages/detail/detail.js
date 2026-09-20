import "../../assets/style.css";
import { httpRequest } from "../../libs/httpRequest.js";
import { showToast } from "../../libs/toast.js";

import { playTrack, setPlayerQueue } from "../player/player.js";

// =========================================================
// DOM
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
const moreOptionsMenu = document.querySelector("#more-options-menu");

const addToPlaylistButton = document.querySelector("#btn-add-to-playlist");
const playlistSubmenu = document.querySelector("#playlist-submenu");

const metaSeparatorYear = document.querySelector("#meta-separator-year");
const metaSeparatorStats = document.querySelector("#meta-separator-stats");

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

const deletePlaylistModal = document.querySelector("#delete-playlist-modal");

const deletePlaylistName = document.querySelector("#delete-playlist-name");

const closeDeleteModalButton = document.querySelector(
    "#btn-close-delete-modal",
);

const cancelDeleteButton = document.querySelector(
    "#btn-cancel-delete-playlist",
);

const confirmDeleteButton = document.querySelector(
    "#btn-confirm-delete-playlist",
);

// =========================================================
// URL
// =========================================================

const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const type = params.get("type");

console.log("DETAIL PARAMS:", {
    type,
    id,
});

// =========================================================
// STATE
// =========================================================

let tracks = [];
let myPlaylists = [];

let isOwnPlaylist = false;
let detailType = null;

let artistAlbums = [];
let artistTracks = [];

let detailData = null;
let isLikedSongs = false;
let currentUser = null;

// =========================================================
// EDIT PLAYLIST MODAL
// =========================================================

const createEditPlaylistModal = () => {
    if (document.querySelector("#edit-playlist-modal")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "edit-playlist-modal";

    modal.className =
        "fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4";

    modal.innerHTML = `
        <div
            class="w-full max-w-md rounded-xl bg-[#282828] p-6 text-white shadow-2xl"
        >
            <div class="mb-5 flex items-center justify-between">
                <h2 class="text-xl font-bold">
                    Edit playlist
                </h2>

                <button
                    id="edit-playlist-close"
                    class="text-2xl text-[#B3B3B3] hover:text-white"
                >
                    &times;
                </button>
            </div>

            <div class="flex flex-col gap-4">

                <!-- Cover -->
                <div>
                    <label class="mb-2 block text-sm font-semibold">
                        Cover
                    </label>

                    <button
                        id="edit-playlist-cover-button"
                        type="button"
                        class="group relative h-36 w-36 overflow-hidden rounded-md bg-[#3E3E3E]"
                    >
                        <img
                            id="edit-playlist-cover-preview"
                            src=""
                            alt="Playlist cover"
                            class="h-full w-full object-cover"
                        />

                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <i
                                class="fa-solid fa-pen text-xl text-white"
                            ></i>

                            <span
                                class="mt-1 text-xs font-semibold text-white"
                            >
                                Change cover
                            </span>
                        </div>
                    </button>
                </div>

                <!-- Name -->
                <div>
                    <label class="mb-2 block text-sm font-semibold">
                        Name
                    </label>

                    <input
                        id="edit-playlist-name"
                        type="text"
                        class="w-full rounded-md bg-[#3E3E3E] px-3 py-2 outline-none focus:ring-2 focus:ring-[#1DB954]"
                    />
                </div>

                <!-- Description -->
                <div>
                    <label class="mb-2 block text-sm font-semibold">
                        Description
                    </label>

                    <textarea
                        id="edit-playlist-description"
                        rows="4"
                        class="w-full resize-none rounded-md bg-[#3E3E3E] px-3 py-2 outline-none focus:ring-2 focus:ring-[#1DB954]"
                    ></textarea>
                </div>

                <!-- Public -->
                <label class="flex cursor-pointer items-center gap-3">
                    <input
                        id="edit-playlist-public"
                        type="checkbox"
                        class="h-4 w-4 accent-[#1DB954]"
                    />

                    <span class="text-sm">
                        Public playlist
                    </span>
                </label>

                <!-- Actions -->
                <div class="flex justify-end gap-3 pt-2">
                    <button
                        id="edit-playlist-cancel"
                        type="button"
                        class="rounded-full px-5 py-2 text-sm font-semibold text-[#B3B3B3] hover:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        id="edit-playlist-save"
                        type="button"
                        class="rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:scale-105"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    `;

    document.body.appendChild(modal);
};

createEditPlaylistModal();

// =========================================================
// EDIT PLAYLIST MODAL - OPEN
// =========================================================

const openEditPlaylistModal = () => {
    if (!isOwnPlaylist || !detailData) {
        return;
    }

    const modal = document.querySelector("#edit-playlist-modal");

    const coverPreview = document.querySelector("#edit-playlist-cover-preview");

    const nameInput = document.querySelector("#edit-playlist-name");

    const descriptionInput = document.querySelector(
        "#edit-playlist-description",
    );

    const publicInput = document.querySelector("#edit-playlist-public");

    if (
        !modal ||
        !coverPreview ||
        !nameInput ||
        !descriptionInput ||
        !publicInput
    ) {
        console.error("Edit playlist modal elements not found");
        return;
    }

    const rawImageUrl = detailData.image_url || "";

    const imageUrl = rawImageUrl.startsWith("http")
        ? rawImageUrl
        : rawImageUrl
          ? `${import.meta.env.VITE_API_BASE_URL}${rawImageUrl}`
          : "";

    coverPreview.src = imageUrl;

    nameInput.value = detailData.name || "";

    descriptionInput.value = detailData.description || "";

    publicInput.checked = Boolean(detailData.is_public);

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    nameInput.focus();
};

// =========================================================
// EDIT PLAYLIST MODAL - CLOSE
// =========================================================

const closeEditPlaylistModal = () => {
    const modal = document.querySelector("#edit-playlist-modal");

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");
    modal.classList.remove("flex");
};

// =========================================================
// EDIT PLAYLIST MODAL EVENTS
// =========================================================

document.addEventListener("click", async (event) => {
    if (event.target.closest("#edit-playlist-close")) {
        closeEditPlaylistModal();
        return;
    }

    if (event.target.closest("#edit-playlist-cancel")) {
        closeEditPlaylistModal();
        return;
    }

    if (event.target.closest("#edit-playlist-save")) {
        try {
            await updatePlaylist();
        } catch (error) {
            console.error(error);

            showToast("Failed to update playlist");
        }
    }
});

// =========================================================
// EDIT / DELETE BUTTON
// =========================================================

document.addEventListener("click", (event) => {
    const editButton = event.target.closest("#btn-edit-playlist");

    if (editButton) {
        openEditPlaylistModal();
        return;
    }

    const deleteButton = event.target.closest("#btn-delete-playlist");

    if (deleteButton) {
        openDeletePlaylistModal();
    }
});

// =========================================================
// FORMAT DURATION
// =========================================================

const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

// =========================================================
// LIKE UI
// =========================================================

function updateLikeUI(isLiked) {
    if (!likeIcon || !btnLike) {
        return;
    }

    likeIcon.className = isLiked
        ? "fa-solid fa-heart text-[#1DB954] text-2xl"
        : "fa-regular fa-heart text-2xl";

    btnLike.dataset.tooltip = isLiked ? "Unlike" : "Like";

    btnLike.setAttribute("aria-label", isLiked ? "Unlike" : "Like");
}

// =========================================================
// LIBRARY UI
// =========================================================

function updateLibraryUI(isSaved) {
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
}

// =========================================================
// PLAYLIST COVER INPUT
// =========================================================

const playlistCoverInput = document.createElement("input");

playlistCoverInput.type = "file";
playlistCoverInput.accept = "image/*";
playlistCoverInput.className = "hidden";

document.body.appendChild(playlistCoverInput);

// =========================================================
// OPEN COVER PICKER
// =========================================================

document.addEventListener("click", (event) => {
    const button = event.target.closest("#edit-playlist-cover-button");

    if (!button) {
        return;
    }

    if (!isOwnPlaylist || !detailData) {
        return;
    }

    playlistCoverInput.click();
});

document.addEventListener("click", (event) => {
    const button = event.target.closest("#btn-change-playlist-cover");

    if (!button) {
        return;
    }

    if (!isOwnPlaylist || isLikedSongs) {
        return;
    }

    playlistCoverInput.click();
});

// =========================================================
// UPLOAD PLAYLIST COVER
// =========================================================

playlistCoverInput.addEventListener("change", async () => {
    const file = playlistCoverInput.files?.[0];

    if (!file) {
        return;
    }

    if (!detailData?.id) {
        console.error("Playlist ID not found");
        return;
    }

    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Access token not found");
        }

        const formData = new FormData();

        formData.append("cover", file);

        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/upload/playlist/${detailData.id}/cover`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            },
        );

        const result = await response.json();

        console.log("UPLOAD RESPONSE:", result);

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to upload playlist cover",
            );
        }

        const uploadedImageUrl = result.file?.url;

        if (!uploadedImageUrl) {
            throw new Error("Upload succeeded but image URL was not returned");
        }

        const updateResponse = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/playlists/${detailData.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    image_url: uploadedImageUrl,
                }),
            },
        );

        const updateResult = await updateResponse.json();

        console.log("UPDATE PLAYLIST RESPONSE:", updateResult);

        if (!updateResponse.ok) {
            throw new Error(
                updateResult.message || "Failed to update playlist cover",
            );
        }

        const fullImageUrl = uploadedImageUrl.startsWith("http")
            ? uploadedImageUrl
            : `${import.meta.env.VITE_API_BASE_URL}${uploadedImageUrl}`;

        detailData = {
            ...detailData,
            image_url: fullImageUrl,
        };

        const coverPreview = document.querySelector(
            "#edit-playlist-cover-preview",
        );

        if (coverPreview) {
            coverPreview.src = fullImageUrl;
        }

        renderDetail(detailData, "playlists");

        showToast("Playlist cover updated");

        playlistCoverInput.value = "";

        window.dispatchEvent(new Event("library:refresh"));
    } catch (error) {
        console.error("Failed to upload playlist cover:", error);

        showToast("Failed to upload playlist cover");

        playlistCoverInput.value = "";
    }
});

// =========================================================
// DELETE PLAYLIST MODAL
// =========================================================

const openDeletePlaylistModal = () => {
    if (!detailData || !isOwnPlaylist || isLikedSongs) {
        return;
    }

    deletePlaylistName.textContent = detailData.name || "this playlist";

    confirmDeleteButton.disabled = false;
    confirmDeleteButton.textContent = "Delete";

    deletePlaylistModal.classList.remove("hidden");
    deletePlaylistModal.classList.add("flex");
};

const closeDeletePlaylistModal = () => {
    deletePlaylistModal.classList.add("hidden");
    deletePlaylistModal.classList.remove("flex");
};

// =========================================================
// CLOSE DELETE MODAL
// =========================================================

closeDeleteModalButton.addEventListener("click", closeDeletePlaylistModal);

cancelDeleteButton.addEventListener("click", closeDeletePlaylistModal);

deletePlaylistModal.addEventListener("click", (event) => {
    if (event.target === deletePlaylistModal) {
        closeDeletePlaylistModal();
    }
});

// =========================================================
// CONFIRM DELETE
// =========================================================

confirmDeleteButton.addEventListener("click", async () => {
    if (!detailData?.id) {
        return;
    }

    try {
        confirmDeleteButton.disabled = true;
        confirmDeleteButton.textContent = "Deleting...";

        await httpRequest.delete(`/api/playlists/${detailData.id}`);

        closeDeletePlaylistModal();

        window.dispatchEvent(new Event("library:refresh"));

        window.location.href = "/";
    } catch (error) {
        console.error("Failed to delete playlist:", error);

        confirmDeleteButton.disabled = false;
        confirmDeleteButton.textContent = "Delete";
    }
});

// =========================================================
// RENDER DETAIL
// =========================================================

const renderDetail = (data, type) => {
    detailType = type;

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

    // =====================================================
    // RESET ARTIST UI
    // =====================================================

    artistVerifiedElement.classList.add("hidden");
    artistVerifiedElement.classList.remove("flex");

    artistMonthlyListeners.classList.add("hidden");

    btnFollow.classList.add("hidden");

    toggleLibraryButton.classList.remove("hidden");

    moreOptionsButton.classList.remove("hidden");

    playlistActionButtonsElement.innerHTML = "";

    // =====================================================
    // RESET LIKE
    // =====================================================

    updateLikeUI(Boolean(data.is_liked));

    // =====================================================
    // RESET METADATA
    // =====================================================

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

    // =====================================================
    // RESET ALBUM
    // =====================================================

    albumElement.textContent = "";

    albumElement.removeAttribute("data-album-id");

    albumElement.classList.remove("cursor-pointer", "hover:underline");

    // =====================================================
    // RESET MORE BY
    // =====================================================

    moreBySectionElement.classList.add("hidden");

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

        artistMonthlyListeners.textContent = `${data.monthly_listeners?.toLocaleString() || 0} monthly listeners`;

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
// UPDATE PLAYLIST
// =========================================================

const updatePlaylist = async () => {
    const nameInput = document.querySelector("#edit-playlist-name");

    const descriptionInput = document.querySelector(
        "#edit-playlist-description",
    );

    const publicInput = document.querySelector("#edit-playlist-public");

    if (!nameInput || !descriptionInput || !publicInput || !detailData?.id) {
        return;
    }

    const name = nameInput.value.trim();

    const description = descriptionInput.value.trim();

    const is_public = publicInput.checked;

    if (!name) {
        showToast("Playlist name is required");
        return;
    }

    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/playlists/${detailData.id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
                name,
                description,
                is_public,
            }),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to update playlist");
    }

    const data = await response.json();

    detailData = {
        ...detailData,

        ...(data && typeof data === "object" ? data : {}),

        name,
        description,
        is_public,
    };

    closeEditPlaylistModal();

    renderDetail(detailData, "playlists");

    notifyLibraryUpdated();

    showToast("Playlist updated successfully");
};

// =========================================================
// TITLE CLICK → EDIT PLAYLIST
// =========================================================

titleElement.addEventListener("click", () => {
    if (!isOwnPlaylist || isLikedSongs) {
        return;
    }

    openEditPlaylistModal();
});

// =========================================================
// RENDER ARTIST TRACKS
// =========================================================

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

                    <div class="flex min-w-0 items-center gap-3">
                        <img
                            src="${track.image_url || ""}"
                            alt="${track.title || ""}"
                            class="h-10 w-10 shrink-0 rounded object-cover"
                        />

                        <div class="min-w-0">
                            <p class="truncate font-medium text-white">
                                ${track.title || ""}
                            </p>

                            <p class="truncate text-xs text-[#B3B3B3]">
                                ${track.artist_name || ""}
                            </p>
                        </div>
                    </div>

                    <span class="truncate text-right text-xs text-[#B3B3B3]">
                        ${(track.play_count || 0).toLocaleString()}
                    </span>

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

const renderArtistAlbums = (albums) => {
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
// RENDER TRACKS
// =========================================================

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
// LOAD DETAIL
// =========================================================

const loadDetail = async () => {
    try {
        let data;

        // =================================================
        // TRACK
        // =================================================

        if (type === "tracks") {
            data = await httpRequest.get(`/api/tracks/${id}`);
        }

        // =================================================
        // OTHER DETAIL
        // =================================================
        else {
            data = await httpRequest.get(`/api/${type}/${id}`);
        }

        // =================================================
        // TRACK
        // =================================================

        if (type === "tracks") {
            tracks = [data];

            detailData = data;

            setPlayerQueue(tracks);

            renderTracks(tracks);

            renderDetail(data, type);
        }

        // =================================================
        // ALBUM
        // =================================================
        else if (type === "albums") {
            const trackData = await httpRequest.get(
                `/api/albums/${data.id}/tracks`,
            );

            tracks = trackData.tracks || [];

            detailData = data;

            setPlayerQueue(tracks);

            renderTracks(tracks);

            renderDetail(data, type);
        }

        // =================================================
        // PLAYLIST
        // =================================================
        else if (type === "playlists") {
            const userData = await httpRequest.get("/api/users/me");

            currentUser = userData.user || userData;

            // Liked Songs
            isLikedSongs = data.name?.toLowerCase() === "liked songs";

            // Own playlist
            isOwnPlaylist = !isLikedSongs && currentUser?.id === data.user_id;

            let normalizedTracks;

            // =================================================
            // LIKED SONGS
            // =================================================

            if (isLikedSongs) {
                const likedData = await httpRequest.get(
                    "/api/me/tracks/liked?limit=50",
                );

                normalizedTracks = likedData.tracks.map((track) => ({
                    id: track.id,
                    title: track.title,
                    image_url: track.image_url,
                    audio_url: track.audio_url,
                    duration: track.duration,
                    artist_name: track.artist_name,
                    album_id: track.album_id,
                }));
            }

            // =================================================
            // NORMAL PLAYLIST
            // =================================================
            else {
                const trackData = await httpRequest.get(
                    `/api/playlists/${data.id}/tracks`,
                );

                normalizedTracks = trackData.tracks.map((track) => ({
                    id: track.track_id,
                    title: track.track_title,
                    image_url: track.track_image_url,
                    audio_url: track.track_audio_url,
                    duration: track.track_duration,
                    artist_name: track.artist_name,
                    album_id: track.album_id,
                }));
            }

            tracks = normalizedTracks;

            detailData = data;

            setPlayerQueue(tracks);

            renderTracks(tracks);

            renderDetail(data, type);
        }

        // =================================================
        // ARTIST
        // =================================================
        else if (type === "artists") {
            const [albumData, trackData] = await Promise.all([
                httpRequest.get(`/api/artists/${id}/albums`),

                httpRequest.get(`/api/tracks?limit=50&offset=0`),
            ]);

            artistAlbums = albumData.albums || [];

            artistTracks = (trackData.tracks || []).filter(
                (track) => track.artist_id === data.id,
            );

            tracks = artistTracks;

            detailData = data;

            setPlayerQueue(tracks);

            renderArtistAlbums(artistAlbums);

            renderArtistTracks(artistTracks);

            renderDetail(data, type);
        }

        // =================================================
        // FINAL UI
        // =================================================

        updateLikeUI(Boolean(detailData?.is_liked));

        if (type === "albums") {
            updateLibraryUI(Boolean(detailData?.is_liked));
        }

        if (type === "playlists" && !isLikedSongs) {
            updateLibraryUI(Boolean(detailData?.is_following));
        }

        entityDetailView.classList.remove("hidden");

        footerMainElement.classList.remove("hidden");
    } catch (error) {
        console.error("Lỗi", error);

        errorElement.classList.remove("hidden");
    } finally {
        loadingElement.classList.add("hidden");
    }
};

// =========================================================
// LIBRARY REFRESH
// =========================================================

const notifyLibraryUpdated = () => {
    console.log("Dispatch library refresh");

    window.dispatchEvent(new Event("library:refresh"));
};

// =========================================================
// FOLLOW
// =========================================================

btnFollow.addEventListener("click", async () => {
    try {
        if (detailData.is_following) {
            await httpRequest.delete(
                `/api/${detailType}/${detailData.id}/follow`,
            );
        } else {
            await httpRequest.post(
                {},
                `/api/${detailType}/${detailData.id}/follow`,
            );
        }

        detailData.is_following = !detailData.is_following;

        btnFollow.textContent = detailData.is_following
            ? "Following"
            : "Follow";

        updateLibraryUI(detailData.is_following);

        notifyLibraryUpdated();

        showToast(
            detailData.is_following
                ? "Followed successfully"
                : "Unfollowed successfully",
        );
    } catch (error) {
        console.error(error);

        showToast("Failed to update follow");
    }
});

// =========================================================
// LIKE
// =========================================================

btnLike.addEventListener("click", async () => {
    try {
        if (detailData.is_liked) {
            await httpRequest.delete(
                `/api/${detailType}/${detailData.id}/like`,
            );
        } else {
            await httpRequest.post(
                {},
                `/api/${detailType}/${detailData.id}/like`,
            );
        }

        detailData.is_liked = !detailData.is_liked;

        updateLikeUI(detailData.is_liked);

        notifyLibraryUpdated();

        showToast(
            detailData.is_liked ? "Liked successfully" : "Unliked successfully",
        );
    } catch (error) {
        console.error(error);

        showToast("Failed to update like");
    }
});

// =========================================================
// TOGGLE LIBRARY
// =========================================================

toggleLibraryButton.addEventListener("click", async () => {
    try {
        // Playlist
        if (detailType === "playlists") {
            if (isLikedSongs) {
                return;
            }

            if (detailData.is_following) {
                await httpRequest.delete(
                    `/api/playlists/${detailData.id}/follow`,
                );
            } else {
                await httpRequest.post(
                    {},
                    `/api/playlists/${detailData.id}/follow`,
                );
            }

            detailData.is_following = !detailData.is_following;

            updateLibraryUI(detailData.is_following);

            notifyLibraryUpdated();
        }

        // Album
        if (detailType === "albums") {
            if (detailData.is_liked) {
                await httpRequest.delete(`/api/albums/${detailData.id}/like`);
            } else {
                await httpRequest.post({}, `/api/albums/${detailData.id}/like`);
            }

            detailData.is_liked = !detailData.is_liked;

            updateLibraryUI(detailData.is_liked);

            updateLikeUI(detailData.is_liked);

            notifyLibraryUpdated();
        }

        showToast("Your Library updated");
    } catch (error) {
        console.error(error);

        showToast("Failed to update Your Library");
    }
});

// =========================================================
// ALBUM LINK
// =========================================================

albumElement.addEventListener("click", (event) => {
    const button = event.target.closest("[data-album-id]");

    if (!button) {
        return;
    }

    const albumId = button.dataset.albumId;

    if (!albumId) {
        return;
    }

    window.location.href = `/detail.html?type=albums&id=${albumId}`;
});

// =========================================================
// TRACK LIST EVENTS
// =========================================================

trackListElement.addEventListener("click", async (event) => {
    // =================================================
    // REMOVE FROM LIKED SONGS
    // =================================================

    const removeButton = event.target.closest(".remove-liked-button");

    if (removeButton) {
        const trackId = removeButton.dataset.trackId;

        try {
            await httpRequest.delete(`/api/tracks/${trackId}/like`);

            tracks = tracks.filter((track) => track.id !== trackId);

            setPlayerQueue(tracks);

            renderTracks(tracks);

            notifyLibraryUpdated();

            showToast("Removed from Liked Songs");
        } catch (error) {
            console.error("Failed to remove from Liked Songs:", error);

            showToast("Failed to remove from Liked Songs");
        }

        return;
    }

    // =================================================
    // CLICK TRACK TITLE
    // =================================================

    const album = event.target.closest("[data-album-id]");

    if (album) {
        const trackId = album.closest("[data-id]")?.dataset.id;

        if (isLikedSongs) {
            window.location.href = `/detail.html?type=tracks&id=${trackId}`;

            return;
        }

        const albumId = album.dataset.albumId;

        if (!albumId) {
            return;
        }

        window.location.href = `/detail.html?type=albums&id=${albumId}`;

        return;
    }

    // =================================================
    // PLAY TRACK
    // =================================================

    const button = event.target.closest("[data-track-id]");

    if (!button) {
        return;
    }

    const trackId = button.dataset.trackId;

    const track = tracks.find((item) => item.id === trackId);

    if (!track) {
        return;
    }

    playTrack(track);
});

// =========================================================
// MORE BY
// =========================================================

moreByListElement.addEventListener("click", (event) => {
    const card = event.target.closest("[data-id]");

    if (!card) {
        return;
    }

    const { id, type } = card.dataset;

    window.location.href = `/detail.html?type=${type}&id=${id}`;
});

// =========================================================
// MORE OPTIONS
// =========================================================

const playlistMenuList = document.querySelector("#playlist-menu-list");

const loadMyPlaylistsForMenu = async () => {
    try {
        const data = await httpRequest.get("/api/me/playlists");

        console.log("DETAIL DATA AFTER UPLOAD:", data);

        const playlists = Array.isArray(data) ? data : data.playlists || [];

        if (!playlists.length) {
            playlistMenuList.innerHTML = `
                <p class="px-3 py-2 text-sm text-[#B3B3B3]">
                    You don't have any playlists
                </p>
            `;

            return;
        }

        playlistMenuList.innerHTML = playlists
            .map(
                (playlist) => `
                        <button
                            type="button"
                            data-playlist-id="${playlist.id}"
                            class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-white transition-colors hover:bg-white/10"
                        >
                            <div class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-[#333]">
                                ${
                                    playlist.image_url
                                        ? `
                                            <img
                                                src="${playlist.image_url}"
                                                alt=""
                                                class="h-full w-full object-cover"
                                            />
                                        `
                                        : `
                                            <i class="fa-solid fa-music text-[#B3B3B3]"></i>
                                        `
                                }
                            </div>

                            <span class="truncate">
                                ${playlist.name}
                            </span>
                        </button>
                    `,
            )
            .join("");
    } catch (error) {
        console.error("Failed to load playlists:", error);

        playlistMenuList.innerHTML = `
            <p class="px-3 py-2 text-sm text-red-400">
                Failed to load playlists
            </p>
        `;
    }
};

document.addEventListener("click", (event) => {
    if (
        !moreOptionsButton.contains(event.target) &&
        !moreOptionsMenu.contains(event.target)
    ) {
        moreOptionsMenu.classList.add("hidden");
    }
});

moreOptionsButton.addEventListener("click", () => {
    moreOptionsMenu.classList.toggle("hidden");
});

// =========================================================
// ADD TO PLAYLIST SUBMENU
// =========================================================

addToPlaylistButton.addEventListener("click", async () => {
    playlistSubmenu.classList.toggle("hidden");

    if (!playlistSubmenu.classList.contains("hidden")) {
        await loadMyPlaylistsForMenu();
    }
});

// =========================================================
// START
// =========================================================

loadDetail();

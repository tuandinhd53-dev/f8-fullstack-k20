import { httpRequest } from "../../libs/httpRequest.js";

// DOM

const libraryList = document.querySelector("#library-list");
const libraryItemsElement = document.querySelector("#library-items");

const contextMenuEdit = document.querySelector("#context-menu-edit");

const libraryFiltersElement = document.querySelector("#library-filters");

const librarySortBtn = document.querySelector("#library-sort-btn");
const librarySortMenu = document.querySelector("#library-sort-menu");
const librarySortLabel = document.querySelector("#library-sort-label");
const layoutButtons = librarySortMenu.querySelectorAll("[data-layout]");
const sortButtons = librarySortMenu.querySelectorAll("[data-sort]");

const librarySearchBtn = document.querySelector("#library-search-btn");
const librarySearchInput = document.querySelector("#library-search-input");

const contextMenuAction = document.querySelector("#context-menu-action");
const contextMenuActionText = document.querySelector(
    "#context-menu-action-text",
);
const contextMenuActionIcon = document.querySelector(
    "#context-menu-action-icon",
);

const createPlaylistCard = document.querySelector("#create-playlist-card");
const podcastCard = document.querySelector("#podcast-card");

const contextMenu = document.querySelector("#library-context-menu");

// State

let libraryItems = [];
let contextMenuItem = null;

let activeFilter = "all";
let activeSort = "recently-added";
let activeLayout = "default-list";
let searchKeyword = "";

// Load Library

const loadLibrary = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        libraryItems = [];
        return;
    }
    try {
        const [
            userData,
            playlistData,
            followedPlaylistData,
            albumData,
            artistData,
            likedData,
        ] = await Promise.all([
            httpRequest.get("/api/users/me"),
            httpRequest.get("/api/me/playlists"),
            httpRequest.get("/api/me/playlists/followed"),
            httpRequest.get("/api/me/albums/liked?limit=10&offset=0"),
            httpRequest.get("/api/artists?limit=20&offset=0"),
            httpRequest.get("/api/me/tracks/liked?limit=50"),
        ]);

        // Raw data

        const playlists = playlistData.playlists ?? [];
        const albums = albumData.albums ?? [];
        const artists = artistData.artists ?? [];
        const likedTracks = likedData.tracks ?? [];

        const currentUserId = userData.user.id;

        const followedPlaylists = followedPlaylistData.playlists ?? [];

        // Liked Songs

        const likedCount = likedTracks.length;

        const likedPlaylist = playlists.find(
            (playlist) => playlist.name?.toLowerCase() === "liked songs",
        );

        const likedSongsItems =
            likedCount > 0
                ? [
                      {
                          id: likedPlaylist?.id ?? "liked",
                          kind: "playlist",
                          title: "Liked Songs",
                          type: "Playlist",
                          owner: `${likedCount} songs`,
                          image: null,
                          round: false,
                          likedSongs: true,
                          isOwn: false,
                      },
                  ]
                : [];

        // My Playlists

        const playlistItems = [...playlists, ...followedPlaylists]
            .filter(
                (playlist, index, array) =>
                    playlist.name?.toLowerCase() !== "liked songs" &&
                    array.findIndex((item) => item.id === playlist.id) ===
                        index,
            )
            .map((playlist) => ({
                id: playlist.id,
                kind: "playlist",
                title: playlist.name,
                type: "Playlist",
                owner: playlist.user_username || "",
                image: playlist.image_url,
                round: false,
                likedSongs: false,
                isOwn: playlist.user_id === currentUserId,
            }));

        // Liked Albums

        const albumItems = albums.map((album) => ({
            id: album.id,
            kind: "album",
            title: album.title,
            type: "Album",
            owner: album.artist_name || "",
            image: album.cover_image_url,
            round: false,
            likedSongs: false,
            isOwn: false,
        }));

        // Following Artists

        const followedArtists = artists.filter(
            (artist) => artist.is_following === true,
        );

        const artistItems = followedArtists.map((artist) => ({
            id: artist.id,
            kind: "artist",
            title: artist.name,
            type: "Artist",
            owner: artist.name,
            image: artist.image_url,
            round: true,
            likedSongs: false,
            isOwn: false,
        }));

        // Combine

        libraryItems = [
            ...likedSongsItems,
            ...playlistItems,
            ...albumItems,
            ...artistItems,
        ];

        // Placeholder cards

        if (libraryItems.length > 0) {
            createPlaylistCard.classList.add("hidden");
            podcastCard.classList.add("hidden");
        } else {
            createPlaylistCard.classList.remove("hidden");
            podcastCard.classList.remove("hidden");
        }

        // Render

        renderLibraryFilters();
        renderCurrentLibrary();
    } catch (error) {
        console.error("Failed to load library:", error);
    }
};

// Update Sort UI

const updateSortUI = () => {
    const checks = document.querySelectorAll("[data-sort-check]");

    checks.forEach((check) => {
        check.style.setProperty(
            "display",
            check.dataset.sortCheck === activeSort ? "inline-block" : "none",
            "important",
        );
    });

    const sortLabels = {
        "recently-added": "Recents",
        alphabetical: "Alphabetical",
        creator: "Creator",
    };

    librarySortLabel.textContent = sortLabels[activeSort];
};
// Filters Library

const renderLibraryFilters = () => {
    const types = [...new Set(libraryItems.map((item) => item.kind))];

    const filterConfig = {
        playlist: "Playlists",
        album: "Albums",
        artist: "Artists",
    };

    libraryFiltersElement.innerHTML = types
        .map((type) => {
            const isActive = activeFilter === type;

            return `
                <button
                    type="button"
                    data-filter="${type}"
                    class="rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                        isActive
                            ? "bg-white text-black"
                            : "bg-[#1F1F1F] text-white hover:bg-[#2A2A2A]"
                    }"
                >
                    ${filterConfig[type]}
                </button>
            `;
        })
        .join("");
};

// Sort Library

const sortLibraryItems = (items) => {
    const sortedItems = [...items];

    if (activeSort === "alphabetical") {
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (activeSort === "creator") {
        sortedItems.sort((a, b) => a.owner.localeCompare(b.owner));
    }

    return sortedItems;
};

// Get Current Library

const getCurrentLibraryItems = () => {
    let currentItems =
        activeFilter === "all"
            ? libraryItems
            : libraryItems.filter((item) => item.kind === activeFilter);

    if (searchKeyword) {
        currentItems = currentItems.filter((item) => {
            const title = item.title?.toLowerCase() || "";
            const owner = item.owner?.toLowerCase() || "";

            return (
                title.includes(searchKeyword) || owner.includes(searchKeyword)
            );
        });
    }

    return sortLibraryItems(currentItems);
};

// Render Current Library

const renderCurrentLibrary = () => {
    const currentItems = getCurrentLibraryItems();

    renderLibrary(currentItems);
};

// Sort Button

librarySortBtn.addEventListener("click", () => {
    librarySortMenu.classList.toggle("hidden");
});

// Sort Options

sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeSort = button.dataset.sort;

        updateSortUI();

        renderCurrentLibrary();

        librarySortMenu.classList.add("hidden");
    });
});

layoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeLayout = button.dataset.layout;

        layoutButtons.forEach((layoutButton) => {
            layoutButton.classList.remove("bg-[#3E3E3E]", "text-white");

            layoutButton.classList.add("text-[#B3B3B3]");
        });

        button.classList.add("bg-[#3E3E3E]", "text-white");

        button.classList.remove("text-[#B3B3B3]");

        renderCurrentLibrary();
    });
});

librarySearchBtn.addEventListener("click", () => {
    librarySearchInput.classList.remove("hidden");
    librarySearchInput.focus();
});

librarySearchInput.addEventListener("input", (event) => {
    searchKeyword = event.target.value.trim().toLowerCase();

    renderCurrentLibrary();
});
// Filter Buttons

libraryFiltersElement.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");

    if (!button) return;

    activeFilter = button.dataset.filter;

    renderLibraryFilters();
    renderCurrentLibrary();
});

// Render Library

const renderLibrary = (items) => {
    const libraryHTML = items
        .map((item) => {
            const imageHTML = item.image
                ? `
                    <img
                        src="${item.image}"
                        alt="${item.title}"
                        class="h-full w-full object-cover"
                    />
                `
                : `
                    <div
                        class="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#4101f5] via-[#755deb] to-[#bde7d3] text-white"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            />
                        </svg>
                    </div>
                `;

            // Compact List
            if (activeLayout === "compact-list") {
                return `
                    <article
                        class="flex cursor-pointer items-center rounded-md px-2 py-2 hover:bg-[#1F1F1F]"
                        data-id="${item.id}"
                        data-type="${item.kind}"
                        data-own="${item.isOwn}"
                        data-liked-songs="${item.likedSongs}"
                    >
                        <div class="min-w-0">
                            <p class="truncate text-sm font-medium text-white">
                                ${item.title}
                            </p>

                            <p class="truncate text-xs text-[#B3B3B3]">
                                ${item.likedSongs ? "Playlist" : item.type}
                            </p>
                        </div>
                    </article>
                `;
            }

            // Default List
            if (activeLayout === "default-list") {
                return `
                    <article
                        class="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-[#1F1F1F]"
                        data-id="${item.id}"
                        data-type="${item.kind}"
                        data-own="${item.isOwn}"
                        data-liked-songs="${item.likedSongs}"
                    >
                        <div
                            class="h-12 w-12 shrink-0 overflow-hidden ${
                                item.round ? "rounded-full" : "rounded"
                            }"
                        >
                            ${imageHTML}
                        </div>

                        <div class="min-w-0">
                            <p class="truncate text-sm font-medium text-white">
                                ${item.title}
                            </p>

                            <p class="truncate text-xs text-[#B3B3B3]">
                                ${item.likedSongs ? "Playlist" : item.type}
                                ${item.owner ? ` • ${item.owner}` : ""}
                            </p>
                        </div>
                    </article>
                `;
            }

            // Compact Grid
            if (activeLayout === "compact-grid") {
                return `
                    <article
                        class="group cursor-pointer rounded-md p-2 hover:bg-[#1F1F1F]"
                        data-id="${item.id}"
                        data-type="${item.kind}"
                        data-own="${item.isOwn}"
                        data-liked-songs="${item.likedSongs}"
                    >
                        <div
                            class="relative aspect-square w-full overflow-hidden ${
                                item.round ? "rounded-full" : "rounded"
                            }"
                        >
                            ${imageHTML}

                            <div
                                class="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <div class="min-w-0">
                                    <p class="truncate text-xs font-semibold text-white">
                                        ${item.title}
                                    </p>

                                    <p class="truncate text-[11px] text-[#B3B3B3]">
                                        ${item.likedSongs ? "Playlist" : item.type}
                                        ${item.owner ? ` • ${item.owner}` : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
            }

            // Default Grid
            return `
                <article
                    class="cursor-pointer rounded-md p-2 hover:bg-[#1F1F1F]"
                    data-id="${item.id}"
                    data-type="${item.kind}"
                    data-own="${item.isOwn}"
                    data-liked-songs="${item.likedSongs}"
                >
                    <div
                        class="aspect-square w-full overflow-hidden ${
                            item.round ? "rounded-full" : "rounded"
                        }"
                    >
                        ${imageHTML}
                    </div>

                    <div class="mt-2 min-w-0">
                        <p class="truncate text-sm font-medium text-white">
                            ${item.title}
                        </p>

                        <p class="truncate text-xs text-[#B3B3B3]">
                            ${item.likedSongs ? "Playlist" : item.type}
                            ${item.owner ? ` • ${item.owner}` : ""}
                        </p>
                    </div>
                </article>
            `;
        })
        .join("");

    if (activeLayout === "compact-grid" || activeLayout === "default-grid") {
        libraryItemsElement.className =
            "mt-3 grid grid-cols-2 gap-1 lg:grid-cols-3";
    } else {
        libraryItemsElement.className = "mt-3 flex flex-col";
    }

    libraryItemsElement.innerHTML = libraryHTML;
};

// Click Library Item

libraryList.addEventListener("click", (event) => {
    const item = event.target.closest("[data-id][data-type]");

    if (!item) return;

    const { id, type } = item.dataset;

    window.location.href = `/detail.html?type=${type}s&id=${id}`;
});

// Context Menu

libraryItemsElement.addEventListener("contextmenu", (event) => {
    const item = event.target.closest("[data-id][data-type]");

    if (!item) return;

    event.preventDefault();

    if (item.dataset.likedSongs === "true") return;

    contextMenuItem = item;

    const { type, own } = item.dataset;

    if (type === "playlist") {
        contextMenuActionText.textContent =
            own === "true" ? "Delete Playlist" : "Remove from Your Library";

        contextMenuActionIcon.className =
            own === "true"
                ? "fa-solid fa-trash w-4 text-[#B3B3B3]"
                : "fa-solid fa-minus w-4 text-[#B3B3B3]";

        contextMenuEdit.classList.toggle("hidden", own !== "true");
    }

    if (type === "album") {
        contextMenuActionText.textContent = "Remove from Your Library";

        contextMenuActionIcon.className =
            "fa-solid fa-minus w-4 text-[#B3B3B3]";

        contextMenuEdit.classList.add("hidden");
    }

    if (type === "artist") {
        contextMenuActionText.textContent = "Unfollow";

        contextMenuActionIcon.className =
            "fa-solid fa-user-minus w-4 text-[#B3B3B3]";

        contextMenuEdit.classList.add("hidden");
    }

    contextMenu.classList.remove("hidden");

    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.top = `${event.clientY}px`;
});

// Global Click

document.addEventListener("click", (event) => {
    // Close Sort Menu

    if (
        !librarySortBtn.contains(event.target) &&
        !librarySortMenu.contains(event.target)
    ) {
        librarySortMenu.classList.add("hidden");
    }

    // Close Context Menu

    if (!contextMenu.contains(event.target)) {
        contextMenu.classList.add("hidden");
        contextMenuItem = null;
    }
});

// Context Menu Action

contextMenuAction.addEventListener("click", async () => {
    if (!contextMenuItem) return;

    const { id, type, own } = contextMenuItem.dataset;

    try {
        if (type === "playlist") {
            if (own === "true") {
                // Playlist của mình
                await httpRequest.delete(`/api/playlists/${id}`);
            } else {
                // Playlist người khác đã Save
                await httpRequest.delete(`/api/playlists/${id}/follow`);
            }
        }

        if (type === "album") {
            await httpRequest.delete(`/api/albums/${id}/like`);
        }

        if (type === "artist") {
            await httpRequest.delete(`/api/artists/${id}/follow`);
        }

        contextMenu.classList.add("hidden");
        contextMenuItem = null;

        window.dispatchEvent(new Event("library:refresh"));
    } catch (error) {
        console.error("Failed to update library:", error);
    }
});

// Refresh Library

const refreshLibrary = () => {
    loadLibrary();
};

// Initial Sort UI

updateSortUI();

// Initial Load

loadLibrary();

// Listen for Library Updates

window.addEventListener("library:refresh", refreshLibrary);

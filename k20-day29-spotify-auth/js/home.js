const BASE_URL = "https://spotify.f8team.dev";

const artistList = document.querySelector("#artist-list");
const albumList = document.querySelector("#album-list");
const trackList = document.querySelector("#track-list");
const playlistList = document.querySelector("#playlist-list");

const guestMenu = document.querySelector("#guest-menu");
const userMenu = document.querySelector("#user-menu");
const profileBtn = document.querySelector("#profile-btn");
const profileMenu = document.querySelector("#profile-menu");
const logoutBtn = document.querySelector("#logout-btn");

const accessToken = localStorage.getItem("access_token");

// Login

if (accessToken) {
    guestMenu.classList.add("hidden");
    userMenu.classList.remove("hidden");
} else {
    guestMenu.classList.remove("hidden");
    userMenu.classList.add("hidden");
}

// Click Avatar
profileBtn.addEventListener("click", () => {
    profileMenu.classList.toggle("hidden");
});

// Click Out
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("access_token");
    window.location.href = "./login.html";
});

// Artists
async function getArtists() {
    renderState(artistList, "loading", "Loading artists...");
    try {
        const res = await fetch(`${BASE_URL}/api/artists?limit=20&offset=0`);
        if (!res.ok) {
            throw new Error("API Lỗi");
        }

        const data = await res.json();

        if (!data.artists || data.artists.length === 0) {
            renderState(artistList, "empty", "No artists available");
            return;
        }

        renderArtists(data.artists);
    } catch (error) {
        renderState(artistList, "error", "Unable to load artists");
        console.log("Lỗi", error);
    }
}

getArtists();

function renderArtists(artists) {
    const artistsHTML = artists
        .map(
            (artist) => ` <div
                                    class="group relative w-40 shrink-0 rounded-lg p-3 transition-colors duration-200 hover:bg-[#1f1f1f] sm:w-44 md:w-48 lg:w-52"
                                >
                                    <!-- Image -->
                                    <div
                                        class="relative aspect-square overflow-hidden rounded-full"
                                    >
                                        ${
                                            artist.image_url
                                                ? `<img
                src="${artist.image_url}"
                alt="${artist.name}"
                class="h-full w-full object-cover"
            />`
                                                : `<div class="flex h-full w-full items-center justify-center bg-[#282828]">
                <i class="fa-solid fa-user text-5xl text-[#B3B3B3]"></i>
           </div>`
                                        }   

                                       
                                    </div>

                                     <!-- Play button -->
                                        <button
                                            class="absolute right-6 bottom-14 flex h-14 w-14 translate-y-2 items-center justify-center rounded-full bg-[#1ed760] opacity-0 shadow-lg transition-all duration-200 hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                class="h-6 w-6 fill-black"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"
                                                ></path>
                                            </svg>
                                        </button>

                                    <!-- Title -->
                                    <h3
                                        class="mt-3 line-clamp-2 text-sm font-semibold leading-5 text-white hover:underline md:text-base"
                                    >
                                       ${artist.name}
                                    </h3>

                                    <!-- Artist -->
                                    <p
                                        class="mt-1 line-clamp-2 text-xs leading-5 text-[#B3B3B3] hover:underline md:text-sm"
                                    >
                                        ${formatListeners(artist.monthly_listeners)} Monthly Listeners
                                    </p>
                                </div>`,
        )
        .join("");
    artistList.innerHTML = artistsHTML;
}

// Album

async function getAlbums() {
    renderState(albumList, "loading", "Loading albums...");
    try {
        const res = await fetch(`${BASE_URL}/api/albums?limit=20&offset=0`);
        if (!res.ok) {
            throw new Error("Lỗi API");
        }
        const data = await res.json();

        if (!data.albums || data.albums.length === 0) {
            renderState(albumList, "empty", "No albums available");
            return;
        }
        renderAlbum(data.albums);
    } catch (error) {
        renderState(albumList, "error", "Unable to load albums");
        console.log("Lỗi", error);
    }
}

getAlbums();

function renderAlbum(albums) {
    const albumHTML = albums
        .map(
            (album) => `
 <div
                                    class="group relative w-40 shrink-0 rounded-lg p-3 transition-colors duration-200 hover:bg-[#1f1f1f] sm:w-44 md:w-48 lg:w-52"
                                >
                                    <!-- Image -->
                                    <div
                                        class="relative aspect-square overflow-hidden rounded-md"
                                    >
                                        ${
                                            album.cover_image_url
                                                ? `<img
                src="${album.cover_image_url}"
                alt="${album.title}"
                class="h-full w-full object-cover"
            />`
                                                : `<div class="flex h-full w-full items-center justify-center bg-[#282828]">
                <i class="fa-solid fa-user text-5xl text-[#B3B3B3]"></i>
           </div>`
                                        }   

                                       
                                    </div>

                                     <!-- Play button -->
                                        <button
                                            class="absolute right-6 bottom-14 flex h-14 w-14 translate-y-2 items-center justify-center rounded-full bg-[#1ed760] opacity-0 shadow-lg transition-all duration-200 hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                class="h-6 w-6 fill-black"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"
                                                ></path>
                                            </svg>
                                        </button>

                                    <!-- Title -->
                                    <h3
                                        class="mt-3 line-clamp-2 text-sm font-semibold leading-5 text-white hover:underline md:text-base"
                                    >
                                       ${album.title}
                                    </h3>

                                    <!-- Artist -->
                                    <p
                                        class="mt-1 line-clamp-2 text-xs leading-5 text-[#B3B3B3] hover:underline md:text-sm"
                                    >
                                        ${album.total_tracks} songs
                                    </p>
                                </div>
`,
        )
        .join("");
    albumList.innerHTML = albumHTML;
}

// Track

async function getTracks() {
    renderState(trackList, "loading", "Loading tracks...");
    try {
        const res = await fetch(`${BASE_URL}/api/tracks?limit=50&offset=0`);
        if (!res.ok) {
            throw new Error("Lỗi API");
        }
        const data = await res.json();

        if (!data.tracks || data.tracks.length === 0) {
            renderState(trackList, "empty", "No tracks available");
            return;
        }
        renderTracks(data.tracks);
    } catch (error) {
        renderState(trackList, "error", "Unable to load tracks");
        console.log("Lỗi", error);
    }
}

getTracks();

function renderTracks(tracks) {
    const trackHTML = tracks
        .map(
            (track, index) => `
                <div
                    class="group flex w-full items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-white/5"
                >
                    <!-- Number / Play -->
                    <span
                        class="relative w-5 shrink-0 text-center text-sm tabular-nums text-[#b3b3b3]"
                    >
                        <span class="transition-opacity group-hover:opacity-0">
                            ${index + 1}
                        </span>

                        <span
                            class="absolute inset-0 hidden items-center justify-center text-[#1db954] group-hover:flex"
                        >
                            <i class="fa-solid fa-play text-[11px]"></i>
                        </span>
                    </span>

                    <!-- Image -->
                    ${
                        track.image_url
                            ? `<img
                                    src="${track.image_url}"
                                    alt="${track.title}"
                                    class="h-10 w-10 shrink-0 rounded object-cover"
                                />`
                            : `<div
                                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#282828]"
                                >
                                    <i class="fa-solid fa-music text-[#B3B3B3]"></i>
                               </div>`
                    }

                    <!-- Info -->
                    <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-white">
                            ${track.title}
                        </p>

                        <p class="truncate text-xs text-[#B3B3B3]">
                            ${track.artist_name}
                        </p>
                    </div>

                    <!-- Like -->
                    <button
                        type="button"
                        class="hidden shrink-0 text-[#B3B3B3] transition-colors hover:text-white md:group-hover:block"
                        aria-label="Lưu bài hát"
                    >
                        <i class="fa-regular fa-heart"></i>
                    </button>

                    <!-- Duration -->
                    <span
                        class="w-10 shrink-0 text-right text-xs tabular-nums text-[#B3B3B3]"
                    >
                        ${formatDuration(track.duration)}
                    </span>
                </div>
            `,
        )
        .join("");

    trackList.innerHTML = trackHTML;
}

// Playlist

async function getPlayLists() {
    renderState(playlistList, "loading", "Loading playlists...");
    try {
        const res = await fetch(`${BASE_URL}/api/playlists?limit=50&offset=0`);
        if (!res.ok) {
            throw new Error("Lỗi API");
        }
        const data = await res.json();

        if (!data.playlists || data.playlists.length === 0) {
            renderState(playlistList, "empty", "No playlists available");
            return;
        }

        renderPlayList(data.playlists);
    } catch (error) {
        renderState(playlistList, "error", "Unable to load playlists");
        console.log("Lỗi", error);
    }
}

getPlayLists();

function renderPlayList(playlists) {
    const playlistHTML = playlists
        .map(
            (playlist) => `
 <div
                                    class="group relative w-40 shrink-0 rounded-lg p-3 transition-colors duration-200 hover:bg-[#1f1f1f] sm:w-44 md:w-48 lg:w-52"
                                >
                                    <!-- Image -->
                                    <div
                                        class="relative aspect-square overflow-hidden rounded-md"
                                    >
                                        ${
                                            playlist.image_url
                                                ? `<img
                src="${playlist.image_url}"
                alt="${playlist.name}"
                class="h-full w-full object-cover"
            />`
                                                : `<div class="flex h-full w-full items-center justify-center bg-[#282828]">
                <i class="fa-solid fa-music text-5xl text-[#B3B3B3]"></i>
           </div>`
                                        }   

                                       
                                    </div>

                                     <!-- Play button -->
                                        <button
                                            class="absolute right-6 bottom-14 flex h-14 w-14 translate-y-2 items-center justify-center rounded-full bg-[#1ed760] opacity-0 shadow-lg transition-all duration-200 hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                class="h-6 w-6 fill-black"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"
                                                ></path>
                                            </svg>
                                        </button>

                                    <!-- Title -->
                                    <h3
                                        class="mt-3 line-clamp-2 text-sm font-semibold leading-5 text-white hover:underline md:text-base"
                                    >
                                       ${playlist.user_username}
                                    </h3>

                                    <!-- Artist -->
                                    <p
                                        class="mt-1 line-clamp-2 text-xs leading-5 text-[#B3B3B3] hover:underline md:text-sm"
                                    >
                                        ${playlist.total_tracks} songs
                                    </p>
                                </div>
`,
        )
        .join("");
    playlistList.innerHTML = playlistHTML;
}

// Format Number

function formatListeners(number) {
    if (number >= 1_000_000) {
        return `${parseFloat((number / 1_000_000).toFixed(1))}M`;
    }
    if (number >= 1_000) {
        return `${parseFloat((number / 1_000).toFixed(1))}K`;
    }

    return number.toLocaleString("en-US");
}

// Format Duration
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Create Card

function createCard(item) {
    const isArtist = item.type;
}

// Render Loading error empty

function renderState(list, type, message) {
    const states = {
        loading: `
            <div class="flex min-h-32 w-full items-center justify-center rounded-lg bg-[#181818]">
                <div class="flex flex-col items-center gap-3">
                    <i class="fa-solid fa-spinner animate-spin text-xl text-[#1ed760]"></i>
                    <p class="text-sm text-[#B3B3B3]">
                        ${message}
                    </p>
                </div>
            </div>
        `,

        empty: `
            <div class="flex min-h-32 w-full items-center justify-center rounded-lg bg-[#181818]">
                <div class="flex flex-col items-center gap-2 text-center">
                    <i class="fa-solid fa-music text-2xl text-[#B3B3B3]"></i>
                    <p class="text-sm font-medium text-white">
                        ${message}
                    </p>
                </div>
            </div>
        `,

        error: `
            <div class="flex min-h-32 w-full items-center justify-center rounded-lg bg-[#181818]">
                <div class="flex flex-col items-center gap-2 text-center">
                    <i class="fa-solid fa-circle-exclamation text-2xl text-red-400"></i>
                    <p class="text-sm font-medium text-white">
                        ${message}
                    </p>
                </div>
            </div>
        `,
    };
    list.innerHTML = states[type];
}


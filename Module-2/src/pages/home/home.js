import { httpRequest } from "../../libs/httpRequest.js";
import { openGuestModal } from "../../libs/guestModal.js";
import { playTrack } from "../player/player.js";
import "./sidebar.js";


// ======================================================
// DOM
// ======================================================

const listElements = {
    tracks: document.querySelector("#track-list"),
    artists: document.querySelector("#artist-list"),
    albums: document.querySelector("#album-list"),
    playlists: document.querySelector("#playlist-list"),
};

const loadingElement = document.querySelector("#loading");
const errorElement = document.querySelector("#error");
const contentElement = document.querySelector("#content");
const footerMainElement = document.querySelector("#footer-main");

// ======================================================
// CONFIG
// ======================================================

const cardConfig = {
    tracks: {
        image: "image_url",
        title: "title",
        subtitle: "artist_name",
        imageClass: "rounded-lg",
        fallbackIcon: "fa-music",
    },

    artists: {
        image: "image_url",
        title: "name",
        subtitle: () => "Artist",
        imageClass: "rounded-full",
        fallbackIcon: "fa-user",
    },

    albums: {
        image: "cover_image_url",
        title: "title",
        subtitle: "artist_name",
        imageClass: "rounded-lg",
        fallbackIcon: "fa-compact-disc",
    },

    playlists: {
        image: "image_url",
        title: "name",
        subtitle: "user_display_name",
        imageClass: "rounded-lg",
        fallbackIcon: "fa-list",
    },
};

// ======================================================
// STATE
// ======================================================

// Trang hiện tại của từng section
const sectionPages = {
    tracks: 0,
    artists: 0,
    albums: 0,
    playlists: 0,
};

// Data gốc của từng section
const sectionData = {
    tracks: [],
    artists: [],
    albums: [],
    playlists: [],
};

// ======================================================
// API
// ======================================================

const fetchData = async (path, key) => {
    const data = await httpRequest.get(path);

    return data[key] ?? [];
};

const loadHome = async () => {
    try {
        const [tracks, artists, albums, playlists] = await Promise.all([
            fetchData("/api/tracks/trending?limit=20", "tracks"),

            fetchData("/api/artists/trending?limit=20", "artists"),

            fetchData("/api/albums/popular?limit=20", "albums"),

            fetchData("/api/playlists?limit=20&offset=0", "playlists"),
        ]);

        // Lưu data
        sectionData.tracks = tracks;
        sectionData.artists = artists;
        sectionData.albums = albums;
        sectionData.playlists = playlists;

        // Hiện content TRƯỚC
        // để container có width thực tế
        contentElement.classList.remove("hidden");
        footerMainElement.classList.remove("hidden");

        // Chờ browser render layout xong
        requestAnimationFrame(() => {
            renderSection(sectionData.tracks, listElements.tracks, "tracks");

            renderSection(sectionData.artists, listElements.artists, "artists");

            renderSection(sectionData.albums, listElements.albums, "albums");

            renderSection(
                sectionData.playlists,
                listElements.playlists,
                "playlists",
            );
        });
    } catch (error) {
        console.error("Failed to load home:", error);

        errorElement.classList.remove("hidden");
    } finally {
        loadingElement.classList.add("hidden");
    }
};

// ======================================================
// GET VISIBLE CARD COUNT
// ======================================================

const getVisibleCount = (container) => {
    const width = container.clientWidth;

    /*
     * Giữ nguyên kích thước card hiện tại.
     *
     * Card:
     * mobile  -> w-40
     * sm      -> w-44
     * md      -> w-48
     * lg      -> w-52
     */

    if (width >= 1200) return 7;

    if (width >= 1000) return 6;

    if (width >= 760) return 5;

    if (width >= 520) return 4;

    return 2;
};

// ======================================================
// CREATE IMAGE
// ======================================================

const renderImage = (item, config) => {
    const image = item[config.image];

    if (image) {
        return `
            <img
                src="${image}"
                alt="${item[config.title] || "Untitled"}"
                class="h-full w-full object-cover"
            />
        `;
    }

    return `
        <div
            class="flex h-full w-full items-center justify-center bg-[#282828]"
        >
            <i
                class="fa-solid ${config.fallbackIcon} text-5xl text-[#B3B3B3]"
            ></i>
        </div>
    `;
};

// ======================================================
// CREATE PLAY BUTTON
// ======================================================

const renderPlayButton = (type) => {
    // Chỉ Track có nút Play
    if (type !== "tracks") {
        return "";
    }

    return `
        <button
            type="button"
            data-play
            class="
                absolute
                right-2
                bottom-2
                flex
                h-12
                w-12
                translate-y-2
                items-center
                justify-center
                rounded-full
                bg-[#1ed760]
                opacity-0
                shadow-xl
                transition-all
                duration-200
                hover:scale-105
                group-hover:translate-y-0
                group-hover:opacity-100
                md:h-14
                md:w-14
            "
            aria-label="Play"
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
    `;
};

// ======================================================
// CREATE CARD
// ======================================================

const renderCard = (item, type) => {
    const config = cardConfig[type];

    const subtitle =
        typeof config.subtitle === "string"
            ? item[config.subtitle]
            : config.subtitle(item);

    const subtitleText = subtitle || "Unknown";

    return `
        <article
            data-id="${item.id}"
            data-type="${type}"
            class="
                group
                relative
                flex
                w-40
                shrink-0
                flex-col
                rounded-lg
                p-2
                transition-colors
                duration-200
                hover:bg-[#1f1f1f]
                sm:w-44
                md:w-48
                lg:w-52
            "
        >

            <!-- IMAGE -->
            <div
                class="
                    relative
                    aspect-square
                    w-full
                    overflow-hidden
                    ${config.imageClass}
                "
            >

                ${renderImage(item, config)}

                ${renderPlayButton(type)}

            </div>

            <!-- INFO -->
            <div class="mt-3 flex min-w-0 flex-col gap-1">

                <h3
                    class="
                        line-clamp-1
                        text-sm
                        font-semibold
                        leading-5
                        text-white
                        hover:underline
                        md:text-base
                    "
                >
                    ${item[config.title] || "Untitled"}
                </h3>

                <p
                    class="
                        line-clamp-2
                        text-xs
                        font-medium
                        text-[#a7a7a7]
                        md:text-sm
                    "
                >
                    ${subtitleText}
                </p>

            </div>

        </article>
    `;
};

// ======================================================
// RENDER SECTION
// ======================================================

const renderSection = (items, container, type) => {
    if (!container) return;

    if (!items.length) {
        container.innerHTML = `
            <p class="py-6 text-sm text-[#B3B3B3]">
                No data available.
            </p>
        `;

        return;
    }

    const visibleCount = getVisibleCount(container);

    const totalPages = Math.ceil(items.length / visibleCount);

    // Đảm bảo page không vượt quá số page
    if (sectionPages[type] >= totalPages) {
        sectionPages[type] = totalPages - 1;
    }

    const currentPage = sectionPages[type];

    const startIndex = currentPage * visibleCount;

    const visibleItems = items.slice(startIndex, startIndex + visibleCount);

    const cardsHTML = visibleItems
        .map((item) => renderCard(item, type))
        .join("");

    // ==================================================
    // ARROWS
    // ==================================================

    const hasPrevious = currentPage > 0;

    const hasNext = currentPage < totalPages - 1;

    container.innerHTML = `
        <div
            class="
                group/section
                relative
                w-full
            "
        >

            <!-- LEFT BUTTON -->

            ${
                hasPrevious
                    ? `
                        <button
                            type="button"
                            data-carousel-prev="${type}"
                            class="
                                absolute
                                left-0
                                top-1/2
                                z-30
                                hidden
                                h-10
                                w-10
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                bg-[#1f1f1f]
                                text-white
                                shadow-xl
                                transition
                                hover:scale-105
                                hover:bg-[#282828]
                                group-hover/section:flex
                            "
                            aria-label="Previous"
                        >
                            <i class="fa-solid fa-chevron-left text-sm"></i>
                        </button>
                    `
                    : ""
            }

            <!-- CARDS -->

            <div
                class="
                    flex
                    w-full
                    gap-2
                    overflow-hidden
                "
            >
                ${cardsHTML}
            </div>

            <!-- RIGHT BUTTON -->

            ${
                hasNext
                    ? `
                        <button
                            type="button"
                            data-carousel-next="${type}"
                            class="
                                absolute
                                right-0
                                top-1/2
                                z-30
                                hidden
                                h-10
                                w-10
                                translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                bg-[#1f1f1f]
                                text-white
                                shadow-xl
                                transition
                                hover:scale-105
                                hover:bg-[#282828]
                                group-hover/section:flex
                            "
                            aria-label="Next"
                        >
                            <i class="fa-solid fa-chevron-right text-sm"></i>
                        </button>
                    `
                    : ""
            }

        </div>
    `;
};

// ======================================================
// CAROUSEL
// ======================================================

const changeSectionPage = (type, direction) => {
    const items = sectionData[type];

    if (!items.length) return;

    const container = listElements[type];

    const visibleCount = getVisibleCount(container);

    const totalPages = Math.ceil(items.length / visibleCount);

    const nextPage = sectionPages[type] + direction;

    // Không cho vượt trái
    if (nextPage < 0) return;

    // Không cho vượt phải
    if (nextPage >= totalPages) return;

    sectionPages[type] = nextPage;

    renderSection(items, container, type);
};

// ======================================================
// HANDLE CAROUSEL BUTTON
// ======================================================

const handleCarouselClick = (event) => {
    const nextButton = event.target.closest("[data-carousel-next]");

    const previousButton = event.target.closest("[data-carousel-prev]");

    if (nextButton) {
        changeSectionPage(nextButton.dataset.carouselNext, 1);

        return;
    }

    if (previousButton) {
        changeSectionPage(previousButton.dataset.carouselPrev, -1);
    }
};

Object.values(listElements).forEach((container) => {
    container.addEventListener("click", handleCarouselClick);
});

// ======================================================
// HANDLE CARD CLICK
// ======================================================

const handleCardClick = (event) => {
    const card = event.target.closest("[data-id][data-type]");

    if (!card) return;

    const { id, type } = card.dataset;

    // ================================================
    // PLAY BUTTON
    // ================================================

    const playButton = event.target.closest("[data-play]");

    if (playButton && type === "tracks") {
        event.stopPropagation();

        const track = sectionData.tracks.find((item) => item.id === id);

        if (!track) return;

        const token = localStorage.getItem("access_token");

        if (!token) {
            openGuestModal();
            return;
        }

        playTrack(track);

        return;
    }

    // ================================================
    // CARD
    // ================================================

    const token = localStorage.getItem("access_token");

    if (!token) {
        openGuestModal();

        return;
    }

    window.location.href = `/detail.html?type=${type}&id=${id}`;
};

// ======================================================
// CARD EVENTS
// ======================================================

listElements.tracks.addEventListener("click", handleCardClick);

listElements.artists.addEventListener("click", handleCardClick);

listElements.albums.addEventListener("click", handleCardClick);

listElements.playlists.addEventListener("click", handleCardClick);

// ======================================================
// RESPONSIVE
// ======================================================

window.addEventListener("resize", () => {
    Object.entries(listElements).forEach(([type, container]) => {
        if (!sectionData[type].length) return;

        renderSection(sectionData[type], container, type);
    });
});

// ======================================================
// START
// ======================================================

loadHome();

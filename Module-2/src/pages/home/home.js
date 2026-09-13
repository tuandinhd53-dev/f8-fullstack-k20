import { httpRequest } from "../../libs/httpRequest";

// Dom
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

// Config

const cardConfig = {
    tracks: {
        image: "image_url",
        title: "title",
        artistName: "artist_name",
        imageClass: "rounded-lg",
        fallbackIcon: "fa-music",
    },
    artists: {
        image: "image_url",
        title: "name",
        artistName: () => "Artist",
        imageClass: "rounded-full",
        fallbackIcon: "fa-user",
    },
    albums: {
        image: "cover_image_url",
        title: "title",
        artistName: "artist_name",
        imageClass: "rounded-lg",
        fallbackIcon: "fa-compact-disc",
    },
    playlists: {
        image: "image_url",
        title: "name",
        artistName: "user_display_name",
        imageClass: "rounded-lg",
        fallbackIcon: "fa-list",
    },
};

// Lấy data từ API path

const fetchData = async (path, key) => {
    const data = await httpRequest.get(path);
    return data[key];
};

// Phân chia Data cho Home
const loadHome = async () => {
    try {
        // Gọi Api lấy dữ liệu
        const [tracks, artists, albums, playlists] = await Promise.all([
            fetchData("/api/tracks/trending?limit=20", "tracks"),
            fetchData("/api/artists/trending?limit=20", "artists"),
            fetchData("/api/albums/popular?limit=20", "albums"),
            fetchData("/api/playlists?limit=20&offset=0", "playlists"),
        ]);

        renderSection(tracks, listElements.tracks, "tracks");
        renderSection(artists, listElements.artists, "artists");
        renderSection(albums, listElements.albums, "albums");
        renderSection(playlists, listElements.playlists, "playlists");

        // Thành công hiện
        contentElement.classList.remove("hidden");
        footerMainElement.classList.remove("hidden");
    } catch (error) {
        console.error(error);
        errorElement.classList.remove("hidden");
    } finally {
        // Luôn tắt dù thành hay bại
        loadingElement.classList.add("hidden");
    }
};

loadHome();

// Render HTML
const renderSection = (items, container, type) => {
    // Nếu Api thành công nhưng ko có dữ liệu
    if (!items.length) {
        container.innerHTML = `<p class="py-6 text-sm text-[#B3B3B3]">
            No data available.
        </p>`;
        return;
    }

    const HTML = items
        .map((item) => {
            const config = cardConfig[type];
            // Nếu là String truy cập trực tiếp là Hàm thì gọi và truyền hàm đó
            const subtitle =
                typeof config.artistName === "string"
                    ? item[config.artistName]
                    : config.artistName(item);
            const subtitleText = subtitle || "Unknown";
            return `<div
             data-id="${item.id}"
    data-type="${type}"
    class="group relative flex w-40 shrink-0 flex-col rounded-lg p-3 transition-colors duration-200 hover:bg-[#1f1f1f] sm:w-44 md:w-48 lg:w-52"
>
    <!-- Image Wrapper -->
    <div class="relative aspect-square w-full overflow-hidden ${config.imageClass}">
        ${
            item[config.image]
                ? `<img
            src="${item[config.image]}"
            alt="${item[config.title]}"
            class="h-full w-full object-cover"
        />`
                : `
        <div
            class="flex h-full w-full items-center justify-center bg-[#282828]"
        >
            <i class="fa-solid ${config.fallbackIcon} text-5xl text-[#B3B3B3]"></i>
        </div>
        `
        }

        <!-- Play button -->
        <button
            class="absolute right-2 bottom-2 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-[#1ed760] opacity-0 shadow-xl transition-all duration-200 hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100 md:h-14 md:w-14"
        >
            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-black" aria-hidden="true">
                <path
                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"
                ></path>
            </svg>
        </button>
    </div>

    <!-- Info Section -->
    <div class="mt-3 flex flex-col gap-1">
        <!-- Title -->
        <h3
            class="line-clamp-1 text-sm font-semibold leading-5 text-white hover:underline md:text-base"
        >
            ${item[config.title] || "Untitled"}
        </h3>

        <!-- Subtitle -->
        <p
            class="line-clamp-2 text-xs font-medium text-[#a7a7a7] hover:underline md:text-sm"
        >
            ${subtitleText}
        </p>
    </div>
</div>`;
        })
        .join("");

    container.innerHTML = HTML;
};

const handleCardClick = (e) => {
    // Tìm Card có Data-it
    const card = e.target.closest("[data-id]");

    if (!card) return;

    const { id, type } = card.dataset;
    console.log(id);
    console.log(type);

    window.location.href = `/detail.html?type=${type}&id=${id}`;
};

listElements.tracks.addEventListener("click", handleCardClick);
listElements.artists.addEventListener("click", handleCardClick);
listElements.albums.addEventListener("click", handleCardClick);
listElements.playlists.addEventListener("click", handleCardClick);

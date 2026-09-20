import { httpRequest } from "./libs/httpRequest.js";
import { showToast } from "./libs/toast.js";
import "./libs/guestModal.js";
import "./assets/style.css";
import "./libs/resizableSidebar.js";

// ==================== HEADER - AUTH UI ====================

const guestMenu = document.querySelector("#guest-menu");
const userMenu = document.querySelector("#user-menu");

const profileBtn = document.querySelector("#profile-btn");
const profileMenu = document.querySelector("#profile-menu");
const logoutBtn = document.querySelector("#logout-btn");

const profileAvatar = document.querySelector("#profile-btn img");

// ==================== SEARCH DOM ====================

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const trendingList = document.querySelector("#trending-list");
const createPlaylistCard = document.querySelector("#create-playlist-card");
const createPlaylistButton = document.querySelector("#create-playlist-btn");

const searchContainer = searchResults?.parentElement;

// ==================== TOKEN ====================

const token = localStorage.getItem("access_token");

const createPlaylist = async () => {
    try {
        await httpRequest.post(
            {
                name: "My Playlist",
                description: "",
                image_url: "",
                is_public: false,
            },
            "/api/playlists",
        );

        showToast("Playlist created successfully");

        window.dispatchEvent(new Event("library:refresh"));
    } catch (error) {
        console.error("Failed to create playlist:", error);
        showToast("Failed to create playlist");
    }
};

createPlaylistCard?.addEventListener("click", () => {
    createPlaylist();
});

createPlaylistButton?.addEventListener("click", () => {
    console.log("CREATE PLAYLIST CLICKED");
    createPlaylist();
});

// ==================== AUTH UI ====================

// Cập nhật giao diện Header theo trạng thái đăng nhập
function updateAuthUI() {
    if (token) {
        guestMenu.classList.add("hidden");
        userMenu.classList.remove("hidden");
    } else {
        guestMenu.classList.remove("hidden");
        userMenu.classList.add("hidden");
    }
}

// Lấy thông tin user hiện tại
async function getCurrentUser() {
    if (!token) return;

    try {
        const data = await httpRequest.get("/api/users/me");
        const currentUser = data.user;

        if (currentUser.avatar_url) {
            profileAvatar.src = currentUser.avatar_url;
        }
    } catch (error) {
        console.error("Failed to get current user:", error);
    }
}

// ==================== PROFILE MENU ====================

// Mở / đóng menu Profile
profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    profileMenu.classList.toggle("hidden");
});

// Click ra ngoài → đóng menu Profile
document.addEventListener("click", (e) => {
    if (!profileMenu.contains(e.target)) {
        profileMenu.classList.add("hidden");
    }
});

// ==================== LOGOUT ====================

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    profileMenu.classList.add("hidden");

    window.location.href = "./index.html";
});

// ==================== INIT AUTH ====================

updateAuthUI();
getCurrentUser();

// ==================== PAGE ROUTING ====================

const pathName = window.location.pathname;

if (pathName === "/" || pathName === "/index.html") {
    import("./pages/home/sidebar.js");
    import("./pages/home/home.js");
    import("./pages/player/player.js");
} else if (pathName === "/detail.html") {
    import("./pages/home/sidebar.js");
    import("./pages/detail/detail.js");
    import("./pages/player/player.js");
}

// ==================== SEARCH ====================

// Lấy danh sách tìm kiếm thịnh hành
async function getTrendingSearches() {
    try {
        const data = await httpRequest.get("/api/search/trending?limit=10");

        renderTrendingSearches(data.trending_searches);
    } catch (error) {
        console.error("Failed to load trending searches:", error);
    }
}

// Render Trending Search
function renderTrendingSearches(searches) {
    trendingList.innerHTML = `
        <div class="px-4 pb-3 pt-3">
            <p class="text-lg font-bold text-white">
                Recent searches
            </p>
        </div>

        <div class="space-y-2">
            ${searches
                .map(
                    (search) => `
                        <button
                         data-keyword="${search}"
                            type="button"
                            class="group flex w-full items-center gap-4 rounded-md px-3 py-3 text-left transition-colors duration-150 hover:bg-[#3E3E3E]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                class="h-6 w-6 shrink-0 fill-[#B3B3B3] transition-colors duration-150 group-hover:fill-white"
                            >
                                <path
                                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm6.207.293 4 4-1.414 1.414-4-4 1.414-1.414Z"
                                />
                            </svg>

                            <span
                                class="min-w-0 flex-1 truncate text-base text-[#E8E8E8] transition-colors duration-150 group-hover:text-white"
                            >
                                ${search}
                            </span>
                        </button>
                    `,
                )
                .join("")}
        </div>
    `;

    searchResults.classList.remove("hidden");
}

// Focus vào Search
searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim() === "") {
        getTrendingSearches();
    }
});

// Không reload trang khi submit
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

// ==================== UNIVERSAL SEARCH ====================

// Gọi API tìm kiếm tất cả loại dữ liệu
async function searchUniversal(query) {
    const encodedQuery = encodeURIComponent(query);

    const data = await httpRequest.get(
        `/api/search?q=${encodedQuery}&type=all&limit=20&offset=0`,
    );

    renderSearchResults(data);
}

// ==================== SEARCH DEBOUNCE ====================

let timer;

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    clearTimeout(timer);

    // Xóa hết → quay lại Trending
    if (value === "") {
        getTrendingSearches();
        return;
    }

    // Có nội dung → chờ 300ms rồi tìm kiếm
    timer = setTimeout(() => {
        searchUniversal(value);
    }, 300);
});

// ==================== RENDER SEARCH RESULTS ====================

// Render kết quả tìm kiếm
function renderSearchResults(data) {
    const { tracks, artists, albums, playlists } = data.results;

    const addType = (items, type) =>
        items.map((item) => ({
            ...item,
            type,
        }));

    const results = [
        ...addType(tracks, "tracks"),
        ...addType(artists, "artists"),
        ...addType(albums, "albums"),
        ...addType(playlists, "playlists"),
    ];

    // Không có kết quả
    if (!results.length) {
        trendingList.innerHTML = `
            <div class="px-4 py-6 text-center text-sm text-[#B3B3B3]">
                No results found
            </div>
        `;

        searchResults.classList.remove("hidden");

        return;
    }

    // Có kết quả
    trendingList.innerHTML = results
        .map(
            (item) => `
                <button
                 data-result="true"
                  data-id="${item.id}"
    data-type="${item.type}"
                    type="button"
                    class="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[#3E3E3E]"
                >
                    <img
                        src="${item.image_url}"
                        alt="${item.title}"
                        class="h-12 w-12 shrink-0 rounded-md object-cover"
                    />

                    <div class="min-w-0 flex-1">
                        <p class="truncate text-base font-medium text-white">
                            ${item.title}
                        </p>

                        <p class="truncate text-sm text-[#B3B3B3]">
                            ${item.subtitle}
                        </p>
                    </div>
                </button>
            `,
        )
        .join("");

    searchResults.classList.remove("hidden");
}

// Click ra ngoài → đóng Search dropdown
document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
        searchResults.classList.add("hidden");
    }
});

trendingList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    // Nếu là kết quả tìm kiếm
    if (button.dataset.result === "true") {
        const token = localStorage.getItem("access_token");

        if (!token) {
            openGuestModal();
            return;
        }

        const { id, type } = button.dataset;

        window.location.href = `./detail.html?type=${type}&id=${id}`;
        return;
    }

    // Nếu là Trending
    const keyword = button.dataset.keyword;

    if (!keyword) return;

    searchInput.value = keyword;
    searchUniversal(keyword);
});

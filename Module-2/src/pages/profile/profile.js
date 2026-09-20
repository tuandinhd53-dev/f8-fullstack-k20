import { httpRequest } from "../../libs/httpRequest.js";
import "../../assets/style.css";
// Profile
const avatarProfile = document.querySelector("#avatar-profile");
const displayNameProfile = document.querySelector("#display-name-profile");

const playlistCountProfile = document.querySelector("#playlist-count-profile");
const followingCountProfile = document.querySelector(
    "#following-count-profile",
);
const playsCountProfile = document.querySelector("#plays-count-profile");

const usernameProfile = document.querySelector("#username-profile");
const emailProfile = document.querySelector("#email-profile");
const countryProfile = document.querySelector("#country-profile");
const createdProfile = document.querySelector("#created-profile");
const bioProfile = document.querySelector("#bio-profile");

// Logout
const logoutBtn = document.querySelector("#logout-btn");

// State
const profileLoading = document.querySelector("#profile-loading");
const profileData = document.querySelector("#profile-data");
const profileError = document.querySelector("#profile-error");

// Token
const accessToken = localStorage.getItem("access_token");

if (!accessToken) {
    window.location.href = "./login.html";
}

// Get Profile
async function getProfile() {
    try {
        // Gọi API lấy thông tin user hiện tại
        const data = await httpRequest.get("/api/users/me");

        const { user, stats } = data;

        // Hide loading
        profileLoading.classList.add("hidden");
        profileData.classList.remove("hidden");

        // User
        displayNameProfile.textContent =
            user.display_name || user.username || "Unknown";

        emailProfile.textContent = user.email || "Unknown";

        usernameProfile.textContent = user.username || "Unknown";

        countryProfile.textContent = user.country || "Not provided";

        bioProfile.textContent = user.bio || "No bio yet";

        // Statistics
        playlistCountProfile.textContent = stats.playlists ?? 0;

        followingCountProfile.textContent = stats.following ?? 0;

        playsCountProfile.textContent = stats.plays ?? 0;

        // Created Date
        if (user.created_at) {
            createdProfile.textContent = new Date(
                user.created_at,
            ).toLocaleDateString("en-GB");
        } else {
            createdProfile.textContent = "Unknown";
        }

        // Avatar
        if (user.avatar_url) {
            avatarProfile.innerHTML = `
                <img
                    src="${user.avatar_url}"
                    alt="Profile avatar"
                    class="h-full w-full object-cover"
                />
            `;
        }
    } catch (error) {
        console.error("Failed to load profile:", error);

        profileLoading.classList.add("hidden");
        profileError.classList.remove("hidden");
        profileError.textContent = "Failed to load profile.";
    }
}

// Logout
logoutBtn.addEventListener("click", () => {
    // Xóa token đăng nhập
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "./login.html";
});

// Load Profile
getProfile();

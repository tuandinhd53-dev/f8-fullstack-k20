const guestModal = document.querySelector("#guest-modal");
const closeButton = document.querySelector("#guest-close");
const loginButton = document.querySelector("#guest-login");
const signupButton = document.querySelector("#guest-signup");
const downloadButton = document.querySelector("#guest-download");

export const openGuestModal = () => {
    if (!guestModal) return;

    guestModal.classList.remove("hidden");
    guestModal.classList.add("flex");

    document.body.classList.add("overflow-hidden");
};

export const closeGuestModal = () => {
    if (!guestModal) return;

    guestModal.classList.add("hidden");
    guestModal.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");
};

// Close
closeButton?.addEventListener("click", closeGuestModal);

// Login
loginButton?.addEventListener("click", () => {
    closeGuestModal();

    window.location.href = "/login.html";
});

// Sign up
signupButton?.addEventListener("click", () => {
    closeGuestModal();

    window.location.href = "/register.html";
});

// Download
downloadButton?.addEventListener("click", () => {
    window.open("https://www.spotify.com/download/", "_blank");
});

// Click ra ngoài modal
guestModal?.addEventListener("click", (event) => {
    if (event.target === guestModal) {
        closeGuestModal();
    }
});

// ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeGuestModal();
    }
});

window.openGuestModal = openGuestModal;
window.closeGuestModal = closeGuestModal;

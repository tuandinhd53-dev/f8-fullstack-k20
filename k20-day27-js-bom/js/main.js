const userLocation = document.querySelector("#location");
const status = document.querySelector("#status");
const browser = document.querySelector("#browser");
const os = document.querySelector("#os");
const languages = document.querySelector("#languages");
const screenInfo = document.querySelector("#screen");
const orientation = document.querySelector("#orientation");
const statusDot = document.querySelector("#status-dot");

// Lấy thông tin từ Bom

// Lấy vị trí tọa độ
navigator.geolocation.getCurrentPosition(
    (position) => {
        userLocation.textContent = `Vĩ độ: ${position.coords.latitude} | Kinh độ: ${position.coords.longitude}`;
    },
    (error) => {
        userLocation.textContent = "Vị trí truy cập bị từ chối";
    },
);

// Online or Offline
function updateStatus() {
    if (navigator.onLine) {
        status.textContent = "Online";
        statusDot.classList.add("bg-red-500");
        statusDot.classList.remove("bg-red-500");
    } else {
        status.textContent = "Offline";
        statusDot.classList.remove("bg-red-500");
        statusDot.classList.add("bg-red-500");
    }
}

updateStatus();

window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);

// Tên Browser
if (navigator.userAgent.includes("Edg/")) {
    browser.textContent = "Microsoft Edge";
} else if (navigator.userAgent.includes("Chrome")) {
    browser.textContent = "Chrome";
} else if (navigator.userAgent.includes("Firefox")) {
    browser.textContent = "Firefox";
} else if (navigator.userAgent.includes("Safari")) {
    browser.textContent = "Safari";
} else {
    browser.textContent = "Không xác định";
}

// Hệ điều hành
if (navigator.userAgent.includes("Windows")) {
    os.textContent = "Windows";
} else if (navigator.userAgent.includes("Android")) {
    os.textContent = "Android";
} else if (navigator.userAgent.includes("macOS")) {
    os.textContent = "macOS";
} else {
    os.textContent = "Không xác định";
}
// Languages
languages.textContent = navigator.languages.join(" , ");

//Screen
screenInfo.textContent = `${screen.width} x ${screen.height}`;

// Oientation

function updateOrientation() {
    if (screen.orientation.type.includes("landscape")) {
        orientation.textContent = "Chiều ngang (Landscape)";
    } else {
        orientation.textContent = "Chiều dọc(Portrait)";
    }
}
updateOrientation();

// Cập nhật Orientation
screen.orientation.addEventListener("change", updateOrientation);

// Trang Fingerprinting
const homeView = document.querySelector("#home-view");
const fingerprintView = document.querySelector("#fingerprint-view");
const fingerprintBtn = document.querySelector("#fingerprintBtn");
const homeBtn = document.querySelector("#homeBtn");
const resultFingerprinting = document.querySelector("#fp-result");
const btnBack = document.querySelector("#btn-back");

// Hàm dữ liệu
function getDeviceInfo() {
    const deviceInfo = {
        location: userLocation.textContent,
        status: status.textContent,
        browser: browser.textContent,
        os: os.textContent,
        languages: languages.textContent,
        screen: screenInfo.textContent,
        orientation: orientation.textContent,
    };
    return deviceInfo;
}

// Hiển thị
function renderFingerprint() {
    const fingerprintData = history.state;

    // Không có fp
    if (!fingerprintData) {
        return;
    }

    const fingerprint = `Loc:${fingerprintData.location}|Status:${fingerprintData.status}|Browser:${fingerprintData.browser}|os:${fingerprintData.os}|Languages:${fingerprintData.languages}|Screen:${fingerprintData.screen}|Orientation:${fingerprintData.orientation}`;

    resultFingerprinting.textContent = fingerprint;
}

// Màu button điều hướng
function updateNav(active) {
    if (active === "home") {
        fingerprintBtn.classList.remove("bg-blue-600", "text-pink-500");
    } else {
        // Home nhạt
        homeBtn.classList.add("bg-blue-200", "text-blue-800");

        homeBtn.classList.remove("bg-blue-600", "text-white");
    }
}

// Home --> Fp
fingerprintBtn.addEventListener("click", () => {
    // Lấy thông tin từ Hàm dữ liệu
    const deviceInfo = getDeviceInfo();

    // Ko reload
    history.pushState(deviceInfo, "", "?page=fingerprint");

    renderFingerprint();

    // Ẩn hiện
    homeView.classList.add("hidden");

    fingerprintView.classList.remove("hidden");

    updateNav("fingerprint");
});

// Fp --> Home
homeBtn.addEventListener("click", () => {
    history.back();
});

// Nút "Quay về trang chủ"
btnBack.addEventListener("click", () => {
    history.back();
});

// Back or Forward
window.addEventListener("popstate", () => {
    if (location.search === "?page=fingerprint") {
        // Ẩn fp
        homeView.classList.add("hidden");
        fingerprintView.classList.remove("hidden");

        // Lấy lại dữ liệu khi Forward
        renderFingerprint();

        updateNav("fingerprint");
    } else {
        homeView.classList.remove("hidden");
        fingerprintView.classList.add("hidden");
        updateNav("home");
    }
});

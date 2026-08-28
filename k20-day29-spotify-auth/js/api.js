const Base_URL = "https://spotify.f8team.dev";

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");

    const res = await fetch(
        "https://spotify.f8team.dev/api/auth/refresh-token",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        },
    );

    if (!res.ok) {
        throw new Error("Lỗi");
    }

    const data = await res.json();

    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
}

async function apiFetch(url, options = {}) {
    const accessToken = localStorage.getItem("access_token");

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    const config = {
        ...options,
        headers,
    };

    const res = await fetch(url, config);

    if (res.status === 401) {
        try {
            const newAccessToken = await refreshAccessToken();
            const retryConfig = {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                },
            };

            const retryRes = await fetch(url, retryConfig);

            if (!retryRes.ok) {
                throw new Error("Request failed");
            }
            const data = await retryRes.json();
            return data;
        } catch (error) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "./login.html";
        }
    }

    if (!res.ok) {
        throw new Error("Request failed");
    }

    const data = await res.json();
    return data;
}

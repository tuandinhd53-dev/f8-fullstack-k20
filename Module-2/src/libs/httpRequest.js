const Base_URL = import.meta.env.VITE_API_BASE_URL;

const getAccessToken = () => {
    return localStorage.getItem("access_token");
};

// Request http dùng chung
export const httpRequest = {
    // Get lấy dữ liệu từ sv
    get: async (url) => {
        const token = getAccessToken();

        const res = await fetch(`${Base_URL}${url}`, {
            headers: token
                ? {
                      Authorization: `Bearer ${token}`,
                  }
                : {},
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    },

    // Post gửi dữ liệu lên sv
    post: async (data, url) => {
        const token = getAccessToken();

        const res = await fetch(`${Base_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && {
                    Authorization: `Bearer ${token}`,
                }),
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Request failed");
        }

        return res.json();
    },

    // Delete gửi yêu cầu xóa lên server
    delete: async (url) => {
        const token = getAccessToken();

        const res = await fetch(`${Base_URL}${url}`, {
            method: "DELETE",
            headers: token
                ? {
                      Authorization: `Bearer ${token}`,
                  }
                : {},
        });

        if (!res.ok) {
            throw new Error("Delete request failed");
        }

        return res.json();
    },
};

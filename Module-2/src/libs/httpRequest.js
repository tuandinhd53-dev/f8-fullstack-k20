const Base_URL = import.meta.env.VITE_API_BASE_URL;

// Request http dùng chung
export const httpRequest = {
    // Get lấy dữ liệu từ sv
    get: async (url) => {
        const res = await fetch(`${Base_URL}${url}`);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    },

    // Post gửi dữ liệu lên sv
    post: async (data, url) => {
        const res = await fetch(`${Base_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Request failed");
        }

        return res.json();
    },
};

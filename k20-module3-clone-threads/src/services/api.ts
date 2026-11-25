import axios from "axios";

const api = axios.create({
    baseURL: "https://threads.f8team.dev",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use((response) => {
    return response;

    async (error) => {
        const originalRequest = error.config

        if(error.response.status === 401 && !originalRequest._retry) {

            const refreshToken =localStorage.get("refresh_token")
                

            if(refreshToken) {
                try {
                    
                } catch (error) {
                    
                }
            }
        }
    }


});

export default api;

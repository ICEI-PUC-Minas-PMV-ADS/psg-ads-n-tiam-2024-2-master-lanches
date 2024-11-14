import axios from "axios";

const api = axios.create({
    baseURL: "https://b07c-186-248-79-98.ngrok-free.app/v1",
    headers: { "Content-Type": "application/json" },
});

export default api;

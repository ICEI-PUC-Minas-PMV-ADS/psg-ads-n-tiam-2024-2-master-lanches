import axios from "axios";

const api = axios.create({
    baseURL: "https://cf7d-2804-14c-5bb7-822b-d4d1-2962-88dd-2ee4.ngrok-free.app/v1",
    headers: { "Content-Type": "application/json" },
});

export default api;

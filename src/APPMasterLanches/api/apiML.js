import axios from "axios";

const api = axios.create({
    baseURL: "https://2926-2804-14c-5bb7-822b-6cb4-6600-a102-f9f8.ngrok-free.app/v1",
    headers: { "Content-Type": "application/json" },
});

export default api;

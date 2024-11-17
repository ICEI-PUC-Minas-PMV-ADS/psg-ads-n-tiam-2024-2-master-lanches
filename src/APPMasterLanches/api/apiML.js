import axios from "axios";

const api = axios.create({
    baseURL: "https://ad57-177-73-228-180.ngrok-free.app/v1",
    headers: { "Content-Type": "application/json" },
});

export default api;

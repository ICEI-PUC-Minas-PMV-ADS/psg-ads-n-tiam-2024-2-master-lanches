"use server"
import axios from "axios";

const api = axios.create({
    baseURL: "https://3a3f-200-169-9-53.ngrok-free.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

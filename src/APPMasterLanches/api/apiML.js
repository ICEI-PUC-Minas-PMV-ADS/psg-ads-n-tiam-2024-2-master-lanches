"use server"
import axios from "axios";

const api = axios.create({
    baseURL: "https://70ad-189-91-93-34.ngrok-free.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

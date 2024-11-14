"use server"
import axios from "axios";

const api = axios.create({
    baseURL: "https://6101-186-248-79-98.ngrok-free.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

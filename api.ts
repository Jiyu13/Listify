import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})

export default api


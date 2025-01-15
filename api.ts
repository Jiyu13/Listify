import axios from "axios";

const baseURL = "http://192.168.1.168:5000/api/v1/listify"

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})

export default api


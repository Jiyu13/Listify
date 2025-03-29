import axios from "axios";

let baseURL
if (process.env.NODE_ENV == "development") {
    baseURL = "http://192.168.1.168:5000/api/v1/listify"
} else {
    baseURL = process.env.EXPO_PUBLIC_BASE_URL
}
// const baseURL = process.env.EXPO_PUBLIC_BASE_URL
console.log("baseURL", baseURL)

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})
export default api


import axios from "axios";

const api = axios.create({
    baseURL: "https://server-rgq0.onrender.com",
});

export default api;
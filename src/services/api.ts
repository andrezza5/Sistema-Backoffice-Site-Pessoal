import axios from "axios";

const api = axios.create({
    baseURL: "https://server-a-xhpr.onrender.com",
});

export default api;
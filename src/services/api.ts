import axios from "axios";

//const apiUrl =  import.meta.env.VITE_API_URL;

const apiUrl = "https://api-projetositepessoal.onrender.com/api"

const api = axios.create({
    baseURL: apiUrl,
});

export default api;
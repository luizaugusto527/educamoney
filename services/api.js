import axios from "axios";

const youtubeKey = 'AIzaSyCrTIVq3eXLKwiOkb98-m4AtShhOeZMDMA';

const api = axios.create({
    baseURL: "http://192.168.0.4:3009"
});



export default api;


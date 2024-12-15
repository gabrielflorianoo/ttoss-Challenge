import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

const createVideo = async (video) => {
    const response = await api.post("/videos", video);
    return response.data;
};

const getAllVideos = async () => {
    const response = await api.get("/videos");
    return response.data;
};

export { createVideo, getAllVideos };
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

const getRandomVideos = async () => {
    const response = await api.get("/videos/random");
    return response.data;
};

const handleVote = async (videoId) => {
    try {
        const response = await api.put(`/videos/vote/${videoId}`);
        alert('Vote submitted successfully!');
        return response.data;
    } catch (error) {
        console.error('There was an error submitting your vote!', error);
    }
};

export { createVideo, getAllVideos, getRandomVideos, handleVote };
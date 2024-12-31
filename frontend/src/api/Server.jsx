import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

const createVideo = async (video) => {
    const response = await api.post('/videos', video);
    return response.data;
};

const getAllVideos = async () => {
    const response = await api.get('/videos');
    return response.data;
};

const getRandomVideos = async () => {
    const seenIds = new Set(); // to track seen video IDs
    let response;
    do {
        response = await api.get('/videos/random');
        response.data = response.data.filter((video) => !seenIds.has(video.id));
        response.data.forEach((video) => seenIds.add(video.id));
    } while (response.data.length === 0);
    return response.data;
};

const vote = async (winnerId, loserId) => {
    try {
        await api.post(`/videos/vote`, {
            winnerId,
            loserId,
        });
        alert('Vote submitted successfully!');
        return null;
    } catch (error) {
        console.error('There was an error submitting your vote!', error);
        return error;
    }
};

export { createVideo, getAllVideos, getRandomVideos, vote };

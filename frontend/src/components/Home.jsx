import React, { useEffect, useState } from 'react';
import { getAllVideos } from '../api/Server';
import VideoList from './VideoList';

const Home = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const allVideos = await getAllVideos();
                setVideos(allVideos);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className='container'>
            <h1>Video List</h1>
            <VideoList videos={videos} />
        </div>
    );
};

export default Home;
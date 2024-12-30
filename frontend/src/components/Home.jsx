import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('/api/videos'); // Adjust the endpoint as needed
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div>
            <h1>Video List</h1>
            <ul>
                {videos.map((video) => (
                    <li key={video.id}>
                        <h2>{video.title}</h2>
                        <p>{video.description}</p>
                        <video width="320" height="240" controls>
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
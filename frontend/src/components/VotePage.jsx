import React, { useState, useEffect } from 'react';
import { getRandomVideos } from '../api/Server';
import { handleVote } from '../api/Server';
import Video from './Video';

const VotePage = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        // Fetch videos from the database
        getRandomVideos()
            .then((data) => {
                setVideos(data);
            })
            .catch((error) => {
                console.error('There was an error fetching videos!', error);
            });
    }, []);

    return (
        <div>
            <h1>Vote for Your Favorite Video</h1>
            <div className="video-container">
                {videos.map((video) => (
                    <Video
                        key={video.id}
                        video={video}
                        handleVote={handleVote}
                    />
                ))}
            </div>
        </div>
    );
};

export default VotePage;

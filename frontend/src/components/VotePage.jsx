import React, { useState, useEffect } from 'react';
import { getRandomVideos } from '../api/Server';
import { vote } from '../api/Server';
import Video from './Video';

const VotePage = () => {
    const [videos, setVideos] = useState([]);

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

    const handleVote = async (winnerId, loserId) => {
        const error = await vote(winnerId, loserId);
        if (!error) {
            getRandomVideos()
                .then((data) => {
                    setVideos(data);
                })
                .catch((error) => {
                    console.error('There was an error fetching videos!', error);
                });
        }
    };

    if (videos.length === 0) {
        return <h1>There are no videos to vote for, please add some!</h1>;
    }

    return (
        <div>
            <h1>Vote for Your Favorite Video</h1>
            <div
                className="video-container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    justifyContent: 'space-between',
                }}
            >
                {videos[0] && (
                    <Video
                        key={videos[0].id}
                        video={videos[0]}
                        onClick={async () => await handleVote(videos[0].id, videos[1].id)}
                    />
                )}
                {videos[1] && (
                    <Video
                        key={videos[1].id}
                        video={videos[1]}
                        onClick={async () => await handleVote(videos[1].id, videos[0].id)}
                    />
                )}
            </div>
        </div>
    );
};

export default VotePage;

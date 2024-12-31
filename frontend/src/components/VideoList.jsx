import React from 'react';

const VideoList = ({ videos }) => {
    return (
        <div className="video-list columns is-multiline">
            {videos
                .sort((v1, v2) => v2.eloRating - v1.eloRating)
                .map((video) => (
                    <div key={video.id} className="column is-one-quarter">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img
                                        src={video.thumbnail}
                                        alt="Thumbnail"
                                        onError={(e) => {
                                            e.target.onerror = null; // Removes the infinite loop
                                            e.target.src =
                                                'https://via.placeholder.com/150'; // Default image
                                        }}
                                    />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">
                                            {video.title}
                                        </p>
                                    </div>
                                </div>

                                <div className="content">
                                    <p>{video.description}</p>
                                    <p className="has-text-right">
                                        Elo Rating:{' '}
                                        {parseFloat(video.eloRating).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default VideoList;

import React from "react";
import Video from "./Video";

const VideoList = ({ videos }) => {
    return (
        <ul className="video-list">
            {videos.map((video) => (
                <li key={video.id} className="video-item">
                    <Video video={video} />
                </li>
            ))}
        </ul>
    );
};

export default VideoList;

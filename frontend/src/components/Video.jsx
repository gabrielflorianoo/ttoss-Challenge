const Video = ({ video }) => {
    return (
        <article className="video">
            <figure className="video-thumbnail-wrapper">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            </figure>
            <div className="video-info is-flex">
                <h2 className="video-title is-size-6">{video.title}</h2>
                <p className="video-description">{video.description}</p>
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="button is-primary is-small video-link">Watch</a>
            </div>
        </article>
    );
};

export default Video;
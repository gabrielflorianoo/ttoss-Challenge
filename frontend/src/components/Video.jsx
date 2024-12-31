const Video = ({ video, eloRating, onClick }) => {
    return (
        <article className="video" style={{
            display: 'grid',
            padding: '1rem',
        }}>
            <figure className="video-thumbnail-wrapper">
                <img
                    src={video.thumbnail && video.thumbnail.match(/^https?:\/\//) ? video.thumbnail : "https://via.placeholder.com/150"}
                    alt={video.title}
                    className="video-thumbnail"
                />
            </figure>
            <div className="video-info is-flex" style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1rem',
                alignSelf: 'end',
            }}>
                <h2 className="video-title is-size-6">{video.title}</h2>
                <p className="video-description">{video.description}</p>
                <button
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button is-primary is-small video-link"
                    {...(onClick ? { onClick } : {})}
                >
                    Vote
                </button>
            </div>
        </article>
    );
};

export default Video;

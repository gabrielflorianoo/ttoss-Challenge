import React, { useState } from 'react';
import { createVideo } from '../api/Server';

const VideoForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        thumbnail: '',
        views: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!localStorage.getItem('user')) {
            alert('You need to be logged in to create a video');
            return;
        }

        createVideo(formData)
            .then((response) => {
                // Redirecionar para a inicial
                window.location.href = `/`;
            })
            .catch((error) => {
                console.error('Error creating video:', error);
            });

        // Limpar o formulário após o envio
        setFormData({
            title: '',
            description: '',
            url: '',
            thumbnail: '',
        });
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Criar Vídeo</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                        }}
                    ></textarea>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="url">URL do Vídeo:</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="thumbnail">URL da Miniatura:</label>
                    <input
                        type="url"
                        id="thumbnail"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="views">Views:</label>
                    <input
                        type="number"
                        id="views"
                        name="views"
                        value={formData.views}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Criar Vídeo
                </button>
            </form>
        </div>
    );
};

export default VideoForm;

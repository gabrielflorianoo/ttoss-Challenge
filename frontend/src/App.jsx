import { useState, useEffect } from "react";
import VideoList from './components/VideoList';
import Navbar from "./components/Navbar";
import { getAllVideos } from './api/Server';

function App() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const data = await getAllVideos();
            setVideos(data);
        };
        fetchVideos();
    }, []);

    return (
        <>
            <Navbar />
        </>
    );
}

export default App;

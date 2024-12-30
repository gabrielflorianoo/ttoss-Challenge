import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { getAllVideos } from './api/Server';

function Layout() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const data = await getAllVideos();
            setVideos(data);
        };
        fetchVideos();
    }, []);

    return (
        <section className="container-fluid" style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '0fr 1fr',
            gap: '1rem',
         }}>
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
        </section>
    );
}

export default Layout;
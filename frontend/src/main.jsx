import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Layout from './Layout.jsx';
import VotePage from './components/VotePage.jsx';
import Home from './components/Home.jsx';
import VideoForm from './components/VideoForm.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<h1>TODO...</h1>} />
                    <Route path="vote" element={<VotePage />} />
                    <Route path="add-video" element={<VideoForm />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);

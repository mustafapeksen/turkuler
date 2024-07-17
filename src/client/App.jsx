import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
function App() {
    const [Turkuler, setTurkuler] = useState([]);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/turkuler');
            setTurkuler(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const handleDelete = (id) => {
        setTurkuler(Turkuler.filter(turku => turku.id !== id));
    };

    return (<>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>);
}

export default App;

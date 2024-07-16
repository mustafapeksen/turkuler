import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Song from './components/Song'; 

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

    return (
        <div>
            {Turkuler.map((turku) => (
                <Song
                    key={turku.id}
                    id={turku.id}
                    video={turku.url}
                    name={turku.name}
                    lyrics={turku.lyrics}
                    story={turku.story}
                    singer={turku.singer}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default App;

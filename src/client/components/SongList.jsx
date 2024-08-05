import React, { useState, useEffect } from "react";
import axios from "axios";
import Song from "./Song";

function SongList({ isAdmin }) {
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
        <>
            {Turkuler.map((turku) => (
                <Song
                    key={turku.id}
                    onDelete={handleDelete}
                    id={turku.id}
                    video={turku.url}
                    name={turku.name}
                    singer={turku.singer}
                    lyrics={turku.lyrics}
                    story={turku.story}
                    isAdmin={isAdmin}
                />
            ))}
        </>
    );
}

export default SongList;

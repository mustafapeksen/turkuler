import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Song from "./Song";
import AddSong from "./AddSong";

function SongList({ isAdmin }) {
    const [Turkuler, setTurkuler] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    songData={turku}
                    isAdmin={isAdmin}
                />
            ))}
            {isAdmin && (<Button id="add-btn" onClick={handleClickOpen} variant="outlined" color="success" size="large"><PostAddIcon /></Button>)}
            <AddSong
                open={open}
                onClose={handleClose}
                onOpen={handleClickOpen}
            />
        </>
    );
}

export default SongList;

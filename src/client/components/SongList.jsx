import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Song from "./Song";
import AddSong from "./AddSong";

function SongList({ isAdmin }) {
    // State to hold the list of songs (Turkuler)
    const [Turkuler, setTurkuler] = useState([]);
    // State to manage the visibility of the AddSong dialog
    const [open, setOpen] = useState(false);

    // Handler to open the AddSong dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Handler to close the AddSong dialog
    const handleClose = () => {
        setOpen(false);
    };

    // useEffect hook to fetch songs from the API when the component mounts
    useEffect(() => {
        fetchSongs();
    }, []); // Empty dependency array means this effect runs once on mount

    // Function to fetch songs from the API
    const fetchSongs = async () => {
        try {
            // Send a GET request to fetch the list of songs
            const response = await axios.get('https://turkuler-api.onrender.com//turkuler');
            // Update the state with the fetched songs
            setTurkuler(response.data);
        } catch (error) {
            // Handle any errors that occur during the fetch operation
            console.error('Error fetching songs:', error);
        }
    };

    // Function to handle the deletion of a song
    const handleDelete = (id) => {
        // Update the state to remove the deleted song from the list
        setTurkuler(Turkuler.filter(turku => turku.id !== id));
    };

    return (
        <>
            {/* Render the list of songs */}
            {Turkuler.map((turku) => (
                <Song
                    key={turku.id} // Unique key for each Song component
                    onDelete={handleDelete} // Pass the handleDelete function to the Song component
                    id={turku.id}
                    video={turku.url}
                    name={turku.name}
                    singer={turku.singer}
                    lyrics={turku.lyrics}
                    story={turku.story}
                    songData={turku}
                    isAdmin={isAdmin} // Pass the isAdmin prop to determine edit/delete access
                />
            ))}

            {/* Conditional rendering of the AddSong button for admin users */}
            {isAdmin && (
                <Button
                    id="add-btn"
                    onClick={handleClickOpen} // Open the AddSong dialog when clicked
                    variant="outlined"
                    color="success"
                    size="large"
                >
                    <PostAddIcon /> {/* Icon for the AddSong button */}
                </Button>
            )}

            {/* AddSong dialog for adding a new song */}
            <AddSong
                open={open} // Pass the dialog open state
                onClose={handleClose} // Pass the handler to close the dialog
                onOpen={handleClickOpen} // Pass the handler to open the dialog
            />
        </>
    );
}

export default SongList;

import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import axios from 'axios';
import PutSong from "./PutSong";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function Song(props) {
    // State to manage the visibility of the PutSong dialog
    const [open, setOpen] = useState(false);

    // Handler for updating song data
    const handleEdit = (updatedSong) => {
        setSongData(updatedSong);
    };

    // Prevent form submission's default behavior (e.g., page reload)
    const stopForm = (event) => {
        event.preventDefault();
    };

    // Function to delete a song
    async function deleteSong(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const songId = props.id; // Get the song ID from props

        try {
            // Send a DELETE request to the API to remove the song
            await axios.delete(`https://turkuler-api.onrender.com/turkuler/${songId}`);
            // Notify parent component of the deletion (if provided)
            if (props.onDelete) {
                props.onDelete(songId);
            }
            console.log('Song deleted successfully');
        } catch (error) {
            // Handle any errors that occur during the delete operation
            console.error('Error deleting song:', error);
        }
    }

    return (
        <section className="song-list">
            <form onSubmit={stopForm}>
                {/* Conditional rendering of the delete button for admin users */}
                {props.isAdmin && (
                    <Button
                        id="delete-btn"
                        variant="contained"
                        color="error"
                        onClick={deleteSong}
                        startIcon={<ClearIcon />}
                    >
                        Delete
                    </Button>
                )}
                {/* Hidden input to hold the song ID, used for form submission */}
                <input type="number" name="id" id="id" hidden value={props.id} readOnly />
                {/* Conditional rendering of the edit button for admin users */}
                {props.isAdmin && (
                    <Button
                        id="edit-btn"
                        variant="outlined"
                        color="primary"
                        startIcon={<ModeEditOutlineIcon />}
                        onClick={() => setOpen(true)} // Open the PutSong dialog when clicked
                    >
                        Edit
                    </Button>
                )}
                {/* PutSong dialog for editing song details */}
                <PutSong
                    songId={props.id}
                    initialSongData={props.songData}
                    onEdit={handleEdit}
                    open={open}
                    onClose={() => setOpen(false)} // Close the dialog when needed
                />
            </form>

            {/* Embed an iframe for the song's video */}
            <iframe
                src={props.video}
                title={props.name + "-" + props.singer}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

            {/* Display song details */}
            <article className="song">
                <h2>{props.name}</h2> {/* Display song name */}
                <p>{props.lyrics}</p> {/* Display song lyrics */}
                <h3>Hikayesi</h3> {/* Section title for the song's story */}
                <p id="story">{props.story}</p> {/* Display song story */}
            </article>
        </section>
    );
}

export default Song;

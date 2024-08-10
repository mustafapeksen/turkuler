import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import axios from 'axios';
import PutSong from "./PutSong";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function Song(props) {
    const [open, setOpen] = useState(false);
    const handleEdit = (updatedSong) => {
        setSongData(updatedSong);
    };
    const stopForm = (event) => { event.preventDefault(); }

    async function deleteSong(event) {
        event.preventDefault();
        const songId = props.id;

        try {
            await axios.delete(`http://localhost:3000/turkuler/${songId}`);
            if (props.onDelete) {
                props.onDelete(songId);
            }
            console.log('Song deleted successfully');
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    }

    return (
        <section className="song-list">
            <form onSubmit={stopForm}>
                {props.isAdmin && (
                    <Button id="delete-btn" variant="contained" color="error" onClick={deleteSong} startIcon={<ClearIcon />}>
                        Delete
                    </Button>
                )}
                <input type="number" name="id" id="id" hidden value={props.id} readOnly />
                {props.isAdmin && (<Button id="edit-btn" variant="outlined" color="primary" startIcon={<ModeEditOutlineIcon />} onClick={() => setOpen(true)}>Edit</Button>)}
                <PutSong
                    songId={props.id}
                    initialSongData={props.songData}
                    onEdit={handleEdit}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </form>

            <iframe
                src={props.video}
                title={props.name + "-" + props.singer}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <article className="song">
                <h2>{props.name}</h2>
                <p >{props.lyrics}</p>
                <h3>Hikayesi</h3>
                <p id="story">{props.story}</p>
            </article>
        </section>
    );
}

export default Song;

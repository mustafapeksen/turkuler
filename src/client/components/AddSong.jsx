import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddSong(props) {
    async function handleAdd(e) {
        e.preventDefault();

        const newSong = {
            name: e.target.name.value,
            singer: e.target.singer.value,
            photoURL: e.target.photoURL.value,
            url: e.target.url.value,
            story: e.target.story.value,
            storySourceUrl: e.target.storySourceUrl.value,
            storySourcePublication: e.target.storySourcePublication.value,
            lyrics: e.target.lyrics.value,
            lyricsSourceUrl: e.target.lyricsSourceUrl.value,
            lyricsSourcePublication: e.target.lyricsSourcePublication.value,
        };

        try {
            await axios.post('http://localhost:3000/turkuler', newSong, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            props.onClose(); // Close the dialog after adding the song
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add the song. Please try again.');
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.open} onClose={props.onClose} fullWidth
            >
                <DialogTitle>Add Song</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAdd}>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="dense"
                            type="text"
                            name="name"
                            id="name"
                            label="Song Name"
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            required
                            type="text"
                            name="singer"
                            id="singer"
                            label="Singer"
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            type="url"
                            name="photoURL"
                            label="URL of Singer's Photo"
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            required
                            type="url"
                            name="url"
                            id="url"
                            label="Song Youtube Embed URL"
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            name="story"
                            label="The Story Of The Song"
                            multiline
                            rows={4}
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            type="url"
                            name="storySourceUrl"
                            label="Story Source Publication URL"
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            type="text"
                            name="storySourcePublication"
                            label="Story Source Publication"
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            multiline
                            rows={4}
                            required
                            name="lyrics"
                            id="lyrics"
                            label="Lyrics"
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            type="url"
                            name="lyricsSourceUrl"
                            id="lyricsSourceUrl"
                            label="Lyrics Source Publication URL"
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            type="text"
                            name="lyricsSourcePublication"
                            id="lyricsSourcePublication"
                            label="Lyrics Source Publication"
                        />

                        <DialogActions>
                            <Button onClick={props.onClose}>Cancel</Button>
                            <Button type="submit">Add Song</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default AddSong;

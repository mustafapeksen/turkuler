import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddSong(props) {
    // Function to handle the form submission for adding a new song
    async function handleAdd(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create a new song object using the form data
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
            // Send a POST request to the server to add the new song
            await axios.post('http://localhost:3000/turkuler', newSong, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            props.onClose(); // Close the dialog after successfully adding the song
        } catch (error) {
            console.error('Error:', error); // Log any error that occurs
            alert('Failed to add the song. Please try again.'); // Show an alert if there's an error
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.open} onClose={props.onClose} fullWidth
            >
                <DialogTitle>Add Song</DialogTitle>
                <DialogContent>
                    {/* Form to input song details */}
                    <form onSubmit={handleAdd}>
                        {/* Input field for song name */}
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

                        {/* Input field for singer's name */}
                        <TextField
                            fullWidth
                            margin="dense"
                            required
                            type="text"
                            name="singer"
                            id="singer"
                            label="Singer"
                        />

                        {/* Input field for the URL of the singer's photo */}
                        <TextField
                            fullWidth
                            margin="dense"
                            type="url"
                            name="photoURL"
                            label="URL of Singer's Photo"
                        />

                        {/* Input field for the song's YouTube embed URL */}
                        <TextField
                            fullWidth
                            margin="dense"
                            required
                            type="url"
                            name="url"
                            id="url"
                            label="Song Youtube Embed URL"
                        />

                        {/* Input field for the story of the song */}
                        <TextField
                            fullWidth
                            margin="dense"
                            name="story"
                            label="The Story Of The Song"
                            multiline
                            rows={4}
                        />

                        {/* Input field for the story source publication URL */}
                        <TextField
                            fullWidth
                            margin="dense"
                            type="url"
                            name="storySourceUrl"
                            label="Story Source Publication URL"
                        />

                        {/* Input field for the story source publication */}
                        <TextField
                            fullWidth
                            margin="dense"
                            type="text"
                            name="storySourcePublication"
                            label="Story Source Publication"
                        />

                        {/* Input field for the lyrics of the song */}
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

                        {/* Input field for the lyrics source publication URL */}
                        <TextField
                            fullWidth
                            margin="dense"
                            type="url"
                            name="lyricsSourceUrl"
                            id="lyricsSourceUrl"
                            label="Lyrics Source Publication URL"
                        />

                        {/* Input field for the lyrics source publication */}
                        <TextField
                            fullWidth
                            margin="dense"
                            type="text"
                            name="lyricsSourcePublication"
                            id="lyricsSourcePublication"
                            label="Lyrics Source Publication"
                        />

                        {/* Buttons for canceling or submitting the form */}
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

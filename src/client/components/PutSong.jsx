import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

function PutSong({ songId, initialSongData, onEdit, open, onClose }) {
    // Initialize state for form data with default values
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        singer: '',
        photoURL: '',
        url: '',
        story: '',
        storySource: {
            url: '',
            publication: ''
        },
        lyrics: '',
        lyricsSource: {
            url: '',
            publication: ''
        }
    });

    // Update form data when initialSongData changes
    useEffect(() => {
        if (initialSongData) {
            setFormData({
                id: initialSongData.id || '',
                name: initialSongData.name || '',
                singer: initialSongData.singer || '',
                photoURL: initialSongData.photoURL || '',
                url: initialSongData.url || '',
                story: initialSongData.story || 'Hikaye bulunamadı!',
                storySource: initialSongData.storySource || { url: '', publication: '' },
                lyrics: initialSongData.lyrics || '',
                lyricsSource: initialSongData.lyricsSource || { url: '', publication: '' }
            });
        }
    }, [initialSongData]);

    // Handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("storySource") || name.includes("lyricsSource")) {
            // Update nested objects for storySource and lyricsSource
            const [field, subfield] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subfield]: value
                }
            }));
        } else {
            // Update other fields
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Handle form submission and update song data
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedSong = { ...formData };
        try {
            const response = await axios.put(`http://localhost:3000/turkuler/${songId}`, updatedSong);
            console.log('Success:', response.data);
            onClose(); // Close the dialog after successful update
            location.reload(true); // Reload the page to reflect changes (consider a better state management approach)
            if (onEdit) {
                onEdit(response.data); // Notify parent component of the update
            }
        } catch (error) {
            console.error('Error:', error); // Log error to the console
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Update Song</DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdate} id="update-song-form">
                    {/* Text field for song name */}
                    <TextField
                        margin="dense"
                        name="name"
                        label="Türkünün İsmi"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {/* Text field for singer */}
                    <TextField
                        margin="dense"
                        name="singer"
                        label="Türkücü"
                        fullWidth
                        value={formData.singer}
                        onChange={handleChange}
                        required
                    />
                    {/* Text field for photo URL */}
                    <TextField
                        margin="dense"
                        name="photoURL"
                        label="Sanatçının Fotoğraf URL'i" // Fotoğraf URL'i için alan eklendi
                        fullWidth
                        value={formData.photoURL}
                        onChange={handleChange}
                    />
                    {/* Text field for song URL */}
                    <TextField
                        margin="dense"
                        name="url"
                        label="Türkünün Url'i"
                        fullWidth
                        value={formData.url}
                        onChange={handleChange}
                    />
                    {/* Text field for story */}
                    <TextField
                        margin="dense"
                        name="story"
                        label="Türkünün Hikayesi"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.story}
                        onChange={handleChange}
                    />
                    {/* Text field for story source URL */}
                    <TextField
                        margin="dense"
                        name="storySource.url"
                        label="Hikayenin Kaynağının Url'i"
                        fullWidth
                        value={formData.storySource.url}
                        onChange={handleChange}
                    />
                    {/* Text field for story source publication */}
                    <TextField
                        margin="dense"
                        name="storySource.publication"
                        label="Hikayeyi Paylaşan Sitenin İsmi"
                        fullWidth
                        value={formData.storySource.publication}
                        onChange={handleChange}
                    />
                    {/* Text field for lyrics */}
                    <TextField
                        margin="dense"
                        name="lyrics"
                        label="Türkünün Sözleri"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.lyrics}
                        onChange={handleChange}
                        required
                    />
                    {/* Text field for lyrics source URL */}
                    <TextField
                        margin="dense"
                        name="lyricsSource.url"
                        label="Türkü Sözlerinin Kaynağının Url'i"
                        fullWidth
                        value={formData.lyricsSource.url}
                        onChange={handleChange}
                    />
                    {/* Text field for lyrics source publication */}
                    <TextField
                        margin="dense"
                        name="lyricsSource.publication"
                        label="Türkü Sözlerini Paylaşan Sitenin İsmi"
                        fullWidth
                        value={formData.lyricsSource.publication}
                        onChange={handleChange}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                {/* Cancel button */}
                <Button onClick={onClose} color="primary">Cancel</Button>
                {/* Submit button to update song */}
                <Button type="submit" form="update-song-form" color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PutSong;

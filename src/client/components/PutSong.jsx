import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

function PutSong({ songId, initialSongData, onEdit, open, onClose }) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("storySource") || name.includes("lyricsSource")) {
            const [field, subfield] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subfield]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedSong = { ...formData };
        try {
            const response = await axios.put(`http://localhost:3000/turkuler/${songId}`, updatedSong);
            console.log('Success:', response.data);
            onClose();// Close the dialog after successful update
            location.reload(true);
            if (onEdit) {
                onEdit(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Update Song</DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdate} id="update-song-form">
                    <TextField
                        margin="dense"
                        name="name"
                        label="Türkünün İsmi"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="singer"
                        label="Türkücü"
                        fullWidth
                        value={formData.singer}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="photoURL"
                        label="Sanatçının Fotoğraf URL'i" // Fotoğraf URL'i için alan eklendi
                        fullWidth
                        value={formData.photoURL}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="url"
                        label="Türkünün Url'i"
                        fullWidth
                        value={formData.url}
                        onChange={handleChange}
                    />
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
                    <TextField
                        margin="dense"
                        name="storySource.url"
                        label="Hikayenin Kaynağının Url'i"
                        fullWidth
                        value={formData.storySource.url}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="storySource.publication"
                        label="Hikayeyi Paylaşan Sitenin İsmi"
                        fullWidth
                        value={formData.storySource.publication}
                        onChange={handleChange}
                    />
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
                    <TextField
                        margin="dense"
                        name="lyricsSource.url"
                        label="Türkü Sözlerinin Kaynağının Url'i"
                        fullWidth
                        value={formData.lyricsSource.url}
                        onChange={handleChange}
                    />
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
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button type="submit" form="update-song-form" color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PutSong;

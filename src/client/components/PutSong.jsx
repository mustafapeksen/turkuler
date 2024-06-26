import React, { useState } from "react";
import axios from "axios";

function PutSong() {
    const [song, setSong] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        singer: '',
        url: '',
        story: '',
        storySourceUrl: '',
        storySourcePublication: '',
        lyrics: '',
        lyricsSourceUrl: '',
        lyricsSourcePublication: ''
    });

    async function fetchSong(e) {
        e.preventDefault();
        const id = e.target.id.value;
        try {
            const response = await axios.get(`http://localhost:3000/turkuler/${id}`);
            const songData = response.data;
            setSong(songData);
            setFormData({
                id: songData.id,
                name: songData.name,
                singer: songData.singer,
                url: songData.url,
                story: songData.story,
                storySourceUrl: songData.storySource.url,
                storySourcePublication: songData.storySource.publication,
                lyrics: songData.lyrics,
                lyricsSourceUrl: songData.lyricsSource.url,
                lyricsSourcePublication: songData.lyricsSource.publication
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function handleUpdate(e) {
        const updatedSong = { ...formData };
        try {
            const response = await axios.put(`http://localhost:3000/turku/${formData.id}`, updatedSong);
            console.log('Success:', response.data);
            setSong(response.data); // Güncellenmiş veriyi state'e kaydedin
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <section>
            <form onSubmit={fetchSong}>
                <input type="number" name="id" id="id" placeholder="Türkü ID" required />
                <input type="submit" value="Fetch Song" />
            </form>

            {song && (
                <form onSubmit={handleUpdate}>
                    <input type="text" name="name" id="name" placeholder="Türkünün İsmi" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="singer" id="singer" placeholder="Türkücü" value={formData.singer} onChange={handleChange} required />
                    <input type="url" name="url" id="url" placeholder="Türkünün Url'i" value={formData.url} onChange={handleChange} />
                    <textarea name="story" id="story" cols="30" rows="10" placeholder="Türkünün Hikayesi" value={formData.story} onChange={handleChange}></textarea>
                    <input type="url" name="storySourceUrl" id="storySourceUrl" placeholder="Hikayenin Kaynağının Url'i" value={formData.storySourceUrl} onChange={handleChange} />
                    <input type="text" name="storySourcePublication" id="storySourcePublication" placeholder="Hikayeyi Paylaşan Sitenin İsmi" value={formData.storySourcePublication} onChange={handleChange} />
                    <textarea name="lyrics" id="lyrics" cols="30" rows="10" placeholder="Türkünün Sözleri" value={formData.lyrics} onChange={handleChange} required></textarea>
                    <input type="url" name="lyricsSourceUrl" id="lyricsSourceUrl" placeholder="Türkü Sözlerinin Kaynağının Url'i" value={formData.lyricsSourceUrl} onChange={handleChange} />
                    <input type="text" name="lyricsSourcePublication" id="lyricsSourcePublication" placeholder="Türkü Sözlerini Paylaşan Sitenin İsmi" value={formData.lyricsSourcePublication} onChange={handleChange} />
                    <input type="submit" value="Update Song" />
                </form>
            )}
        </section>
    );
}

export default PutSong;

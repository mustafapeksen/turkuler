import React, { useState } from "react";
import axios from "axios";

function PatchSong() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    singer: "",
    url: "",
    story: "",
    storySourceUrl: "",
    storySourcePublication: "",
    lyrics: "",
    lyricsSourceUrl: "",
    lyricsSourcePublication: ""
  });

  const [song, setSong] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    const updatedData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v)
    );
    try {
      const response = await axios.patch(`http://localhost:3000/turkuler/${formData.id}`, updatedData);
      setSong(response.data); // Güncellenmiş veriyi state'e kaydedin
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSong = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/turkuler/${formData.id}`);
      if (response.data) {
        setFormData(response.data);
        setSong(response.data);
      } else {
        setSong(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setSong(null);
    }
  };

  return (
    <section>
      <form onSubmit={fetchSong}>
        <input type="number" name="id" id="id" value={formData.id} onChange={handleChange} placeholder="Türkü ID" required />
        <button type="submit">Türkü Getir</button>
      </form>
      {song && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Türkünün İsmi" />
          <input type="text" name="singer" id="singer" value={formData.singer} onChange={handleChange} placeholder="Türkücü" />
          <input type="url" name="url" id="url" value={formData.url} onChange={handleChange} placeholder="Türkünün Url'i" />
          <textarea name="story" id="story" value={formData.story} onChange={handleChange} cols="30" rows="10" placeholder="Türkünün Hikayesi"></textarea>
          <input type="url" name="storySourceUrl" id="storySourceUrl" value={formData.storySourceUrl} onChange={handleChange} placeholder="Hikayenin Kaynağının Url'i " />
          <input type="text" name="storySourcePublication" id="storySourcePublication" value={formData.storySourcePublication} onChange={handleChange} placeholder="Hikayeyi Paylaşan Sitenin İsmi" />
          <textarea name="lyrics" id="lyrics" value={formData.lyrics} onChange={handleChange} cols="30" rows="10" placeholder="Türkünün Sözleri"></textarea>
          <input type="url" name="lyricsSourceUrl" id="lyricsSourceUrl" value={formData.lyricsSourceUrl} onChange={handleChange} placeholder="Türkü Sözlerinin Kaynağının Url'i " />
          <input type="text" name="lyricsSourcePublication" id="lyricsSourcePublication" value={formData.lyricsSourcePublication} onChange={handleChange} placeholder="Türkü Sözlerini Paylaşan Sitenin İsmi" />
          <button type="submit">Güncelle</button>
        </form>
      )}
    </section>
  );
}

export default PatchSong;

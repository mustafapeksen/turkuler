import React, { useState, useEffect } from "react";
import axios from "axios";
import Story from "./Story";
function Stories() {
    const [songs, setSongs] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {

        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/turkuler');
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchSongs();
    }, []);

    if (isLoading) {
        return <h1>Loading ...</h1>
    } else {
        return (
            <>
                {songs.map((song) => (
                    <Story
                        key={song.id}
                        name={song.name}
                        singer={song.singer}
                        story={song.story}
                        publicationURL={song.storySource.url}
                        publication={song.storySource.publication}
                    />
                ))}
            </>
        )
    }

}
export default Stories;
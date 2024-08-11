import React, { useState, useEffect } from "react";
import axios from "axios";
import Story from "./Story";
import Loading from "./Loading";

function Stories() {
    // State to hold the list of songs
    const [songs, setSongs] = useState([]);
    // State to manage the loading state
    const [isLoading, setLoading] = useState(true);

    // useEffect hook to fetch songs when the component mounts
    useEffect(() => {
        // Function to fetch songs from the API
        const fetchSongs = async () => {
            try {
                // Send a GET request to the API to fetch the list of songs
                const response = await axios.get('https://turkuler-api.onrender.com/turkuler');
                // Update the state with the fetched songs
                setSongs(response.data);
            } catch (error) {
                // Log any errors that occur during the fetch operation
                console.error('Error fetching songs:', error);
            } finally {
                // Set loading to false once the fetch is complete
                setLoading(false);
            }
        };
        // Call the fetchSongs function
        fetchSongs();
    }, []); // Empty dependency array means this effect runs once on mount

    // Show a loading message while the data is being fetched
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <>
                {/* Render a Story component for each song in the songs array */}
                {songs.map((song) => (
                    <Story
                        key={song.id} // Unique key for each Story component
                        name={song.name}
                        singer={song.singer}
                        story={song.story}
                        publicationURL={song.storySource.url} // URL for the story's source
                        publication={song.storySource.publication} // Name of the story's source publication
                    />
                ))}
            </>
        );
    }
}

export default Stories;

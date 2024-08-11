import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

function HomePage() {
    // State to store the random song data and any potential error
    const [randomSong, setRandomSong] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch a random song from the server
    async function handleData() {
        try {
            const response = await axios.get('https://turkuler-api.onrender.com/random', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const songData = response.data;
            const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

            // Store the random song and the current date in localStorage
            localStorage.setItem('randomSong', JSON.stringify(songData));
            localStorage.setItem('randomSongDate', currentDate);

            // Update the state with the fetched song data
            setRandomSong(songData);
            console.log(loading);
        } catch (error) {
            console.error('Error:', error); // Log any error that occurs
            setError(error); // Update the error state
        }
    }

    // useEffect hook to run the initial fetch or retrieve from localStorage
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        const savedDate = localStorage.getItem('randomSongDate');
        const savedSong = JSON.parse(localStorage.getItem('randomSong'));

        // If the saved song is from today, use it. Otherwise, fetch a new song.
        if (savedDate === currentDate && savedSong) {
            setRandomSong(savedSong);
            setLoading(false);
        } else {
            handleData();
        }
    }, []);

    // Display an error message if an error occurred during data fetching
    if (error) {
        return <p>Error: {error.message}</p>;
    }


    if (loading) {
        // Show a loading message if the song data hasn't been loaded yet
        return <Loading />;
    } else {
        // Display the random song details if available
        return (
            <section id='home-page'>
                <h2>Günün Türküsü</h2>
                <figure>
                    <iframe
                        id='home-page-iframe'
                        width="560"
                        height="315"
                        src={randomSong.url}
                        title={randomSong.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                </figure>
                <article>
                    <h3>{randomSong.name}</h3>
                    <p>{randomSong.lyrics}</p>
                    <a href={randomSong.lyricsSource.url}>
                        <small>{randomSong.lyricsSource.publication}</small>
                    </a>
                </article>
                <article className='story-section'>
                    <h3>Hikayesi</h3>
                    <p>{randomSong.story}</p>
                    <a href={randomSong.storySource.url}>
                        <small>{randomSong.storySource.publication}</small>
                    </a>
                </article>
                <article>
                    <figure>
                        <img className='singer' src={randomSong.photoURL} alt={randomSong.singer} />
                    </figure>
                    <h4>{randomSong.singer}</h4>
                </article>
            </section>
        );
    }
}

export default HomePage;

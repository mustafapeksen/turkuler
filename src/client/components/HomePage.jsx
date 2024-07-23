import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [randomSong, setRandomSong] = useState(null);
    const [error, setError] = useState(null);

    async function handleData() {
        try {
            const response = await axios.get('http://localhost:3000/random', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setRandomSong(response.data);
        } catch (error) {
            console.error('Error:', error); // Hata varsa konsolda görüntüle
            setError(error);
        }
    }

    useEffect(() => {
        handleData();
    }, []);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (randomSong) {
        return (
            <section>
                <figure>
                    <iframe width="640" height="480" src={randomSong.url} title={randomSong.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </figure>
                <article>
                    <h2>{randomSong.name}</h2>
                    <p style={{ whiteSpace: 'pre-line' }}>{randomSong.lyrics}</p>
                    <a href={randomSong.lyricsSource.url}><small>{randomSong.lyricsSource.publication}</small></a>
                </article>
                <article>
                    <h2>Hikayesi</h2>
                    <p style={{ whiteSpace: 'pre-line' }}>{randomSong.story}</p>
                    <a href={randomSong.storySource.url}><small>{randomSong.storySource.publication}</small></a>
                </article>
                <article>
                    <figure>
                        <img src={randomSong.photoURL} alt={randomSong.singer} />
                    </figure>
                    <h3>{randomSong.singer}</h3>
                </article>
            </section>
        );
    } else {
        return <h1>Loading ...</h1>
    }

}

export default HomePage;

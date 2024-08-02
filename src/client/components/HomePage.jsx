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
            <section id='home-page'>
                <figure>
                    <iframe id='home-page-iframe' width="560" height="315" src={randomSong.url} title={randomSong.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </figure>
                <article>
                    <h2>{randomSong.name}</h2>
                    <p >{randomSong.lyrics}</p>
                    <a href={randomSong.lyricsSource.url}><small>{randomSong.lyricsSource.publication}</small></a>
                </article>
                <article className='story-section'>
                    <h2>Hikayesi</h2>
                    <p>{randomSong.story}</p>
                    <a href={randomSong.storySource.url}><small>{randomSong.storySource.publication}</small></a>
                </article>
                <article>
                    <figure>
                        <img className='singer' src={randomSong.photoURL} alt={randomSong.singer} />
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

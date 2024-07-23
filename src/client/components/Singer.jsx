import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Singer() {
    const [singers, setSingers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSingers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/turkuler');
                const serverData = response.data;

                if (response.status === 200) {
                    if (Array.isArray(serverData) && serverData.length === 0) {
                        console.warn('No singers found!');
                    } else {
                        const enhancedSingerData = serverData.map((turku) => ({
                            id: turku.id,  // ID'nin benzersiz olması gerektiğini varsayıyorum
                            name: turku.singer,
                            photoURL: turku.photoURL, // Assuming image URL property
                        }));

                        setSingers(enhancedSingerData);
                    }
                } else {
                    console.error('API request failed:', response.statusText);
                    setError('API request failed');
                }
            } catch (error) {
                console.error('Error fetching singers:', error);
                setError('Error fetching singers');
            } finally {
                setLoading(false);
            }
        };

        fetchSingers();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <article>
            {singers.length > 0 ? (
                singers.map((singer) => (
                    <figure key={singer.id}> {/* id'yi key olarak kullanın */}
                        {singer.photoURL && (
                            <img src={singer.photoURL} alt={singer.name} />
                        )}
                        <h2>{singer.name}</h2>
                    </figure>
                ))
            ) : (
                <p>No singers found.</p>
            )}
        </article>
    );
}

export default Singer;

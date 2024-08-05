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


    const uniqueNames = singers.reduce((acc, item) => {

        acc[item.name] = true;
        return acc;
    }, {});

    // Nesnenin key'lerini array'e dönüştürerek unique değerleri elde ediyoruz
    const uniqueNamesArray = Object.keys(uniqueNames);

    console.log(uniqueNamesArray);

    const uniquePhotoURL = singers.reduce((acc, item) => {

        acc[item.photoURL] = true;
        return acc;
    }, {});

    // Nesnenin key'lerini array'e dönüştürerek unique değerleri elde ediyoruz
    const uniquePhotoURLArray = Object.keys(uniquePhotoURL);

    console.log(uniquePhotoURLArray);

    var uniqueList = [];

    uniqueNamesArray.map((object, index) => { uniqueList.push({ id: index, name: object, photoURL: "" }) });

    uniqueList.forEach((item, index) => {
        uniqueList[index].photoURL = uniquePhotoURLArray[index];
    });

    return (
        <article id='singers'>
            {uniqueList.length > 0 ? (
                uniqueList.map((singer) => (
                    <figure key={singer.id}>
                        {singer.photoURL && (
                            <img className='singer' src={singer.photoURL} alt={singer.name} />
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

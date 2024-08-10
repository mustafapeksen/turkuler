import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Singer() {
    // State to hold the list of singers
    const [singers, setSingers] = useState([]);
    // State to manage loading state
    const [loading, setLoading] = useState(true);
    // State to manage error messages
    const [error, setError] = useState(null);

    // useEffect hook to fetch data from the API when the component mounts
    useEffect(() => {
        const fetchSingers = async () => {
            try {
                // Make an API request to fetch singers
                const response = await axios.get('http://localhost:3000/turkuler');
                const serverData = response.data;

                // Check if the response status is 200 (OK)
                if (response.status === 200) {
                    // Warn if no singers are found
                    if (Array.isArray(serverData) && serverData.length === 0) {
                        console.warn('No singers found!');
                    } else {
                        // Map the server data to an enhanced format
                        const enhancedSingerData = serverData.map((turku) => ({
                            id: turku.id,  // ID assumed to be unique
                            name: turku.singer,
                            photoURL: turku.photoURL, // Assuming this property exists
                        }));

                        // Update the state with the enhanced singer data
                        setSingers(enhancedSingerData);
                    }
                } else {
                    // Handle API request failures
                    console.error('API request failed:', response.statusText);
                    setError('API request failed');
                }
            } catch (error) {
                // Handle any errors during the fetch
                console.error('Error fetching singers:', error);
                setError('Error fetching singers');
            } finally {
                // Set loading to false once data is fetched or an error occurs
                setLoading(false);
            }
        };

        fetchSingers();
    }, []); // Empty dependency array means this effect runs once on mount

    // Display a loading message while data is being fetched
    if (loading) {
        return <h1>Loading...</h1>;
    }

    // Display an error message if there was an error fetching data
    if (error) {
        return <p>{error}</p>;
    }

    // Extract unique names from the singers array
    const uniqueNames = singers.reduce((acc, item) => {
        acc[item.name] = true;
        return acc;
    }, {});

    // Convert the object keys (unique names) to an array
    const uniqueNamesArray = Object.keys(uniqueNames);

    console.log(uniqueNamesArray);

    // Extract unique photo URLs from the singers array
    const uniquePhotoURL = singers.reduce((acc, item) => {
        acc[item.photoURL] = true;
        return acc;
    }, {});

    // Convert the object keys (unique photo URLs) to an array
    const uniquePhotoURLArray = Object.keys(uniquePhotoURL);

    console.log(uniquePhotoURLArray);

    // Create a list of unique singers with their photo URLs
    var uniqueList = [];

    // Populate uniqueList with unique names and corresponding photo URLs
    uniqueNamesArray.map((name, index) => {
        uniqueList.push({ id: index, name: name, photoURL: "" });
    });

    // Assign photo URLs to the unique singers
    uniqueList.forEach((item, index) => {
        uniqueList[index].photoURL = uniquePhotoURLArray[index];
    });

    return (
        <article id='singers'>
            {/* Render the list of unique singers */}
            {uniqueList.length > 0 ? (
                uniqueList.map((singer) => (
                    <figure key={singer.id}>
                        {/* Display the singer's photo if available */}
                        {singer.photoURL && (
                            <img className='singer' src={singer.photoURL} alt={singer.name} />
                        )}
                        {/* Display the singer's name */}
                        <h2>{singer.name}</h2>
                    </figure>
                ))
            ) : (
                // Display a message if no singers are found
                <p>No singers found.</p>
            )}
        </article>
    );
}

export default Singer;

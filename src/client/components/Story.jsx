import React from "react";

function Story(props) {
    return (
        <div className="container">
            {/* Container for the story section */}
            <article className="story-section">
                {/* Display the name of the song and the singer */}
                <h2>{props.name} - {props.singer}</h2>
                {/* Display the story of the song */}
                <p>{props.story}</p>
                {/* Small text for the source of the story */}
                <small>
                    <a href={props.publicationURL}>
                        {props.publication} {/* Link to the publication */}
                    </a>
                </small>
            </article>
        </div>
    );
}

export default Story;

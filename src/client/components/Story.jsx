import React from "react";

function Story(props) {
    return (
        <div className="container">
            <article className="story-section">
                <h2>{props.name} - {props.singer}</h2>
                <p>{props.story}</p>
                <small>
                    <a href={props.publicationURL}>
                        {props.publication}
                    </a>
                </small>
            </article>
        </div>
    );
}

export default Story;
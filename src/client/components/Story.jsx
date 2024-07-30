import React from "react";

function Story(props) {
    return (
        <>
            <article>
                <h2>{props.name} - {props.singer}</h2>
                <p style={{ whiteSpace: "pre-line" }}>{props.story}</p>
                <small>
                    <a href={props.publicationURL}>
                        {props.publication}
                    </a>
                </small>
            </article>
        </>
    );
}

export default Story;
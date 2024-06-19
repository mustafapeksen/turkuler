function Song(props) {
    console.log(props.video);
    return (
        <section>
            <iframe
                width="560"
                height="315"
                src={props.video}
                title={props.name + "-" + props.singer}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <article>
                <h2>{props.name}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{props.lyrics}</p>
                <h3>Hikayesi</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{props.story}</p>
            </article>
        </section >
    );
}

export default Song;

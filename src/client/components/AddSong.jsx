import React from "react";

function AddSong() {
    async function handleAdd(e) {
        e.preventDefault();

        const newSong = {
            name: e.target.name.value,
            singer: e.target.singer.value,
            url: e.target.url.value,
            story: e.target.story.value,
            storySourceUrl: e.target.storySourceUrl.value,
            storySourcePublication: e.target.storySourcePublication.value,
            lyrics: e.target.lyrics.value,
            lyricsSourceUrl: e.target.lyricsSourceUrl.value,
            lyricsSourcePublication: e.target.lyricsSourcePublication.value,
        };

        try {
            const response = await fetch('http://localhost:3000/turku', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSong),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            
            e.target.name.value = "";
            e.target.singer.value = "";
            e.target.url.value = "";
            e.target.story.value = "";
            e.target.storySourceUrl.value = "";
            e.target.storySourcePublication.value = "";
            e.target.lyrics.value = "";
            e.target.lyricsSourceUrl.value = "";
            e.target.lyricsSourcePublication.value = "";
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <section>
            <form onSubmit={handleAdd}>
                <input type="text" name="name" id="name" placeholder="Türkünün İsmi" required />
                <input type="text" name="singer" id="singer" placeholder="Türkücü" required />
                <input type="url" name="url" id="url" placeholder="Türkünün Url'i" />
                <textarea name="story" id="story" cols="30" rows="10" placeholder="Türkünün Hikayesi"></textarea>
                <input type="url" name="storySourceUrl" id="storySourceUrl" placeholder="Hikayenin Kaynağının Url'i " />
                <input type="text" name="storySourcePublication" id="storySourcePublication" placeholder="Hikayeyi Paylaşan Sitenin İsmi" />
                <textarea name="lyrics" id="lyrics" cols="30" rows="10" placeholder="Türkünün Sözleri" required></textarea>
                <input type="url" name="lyricsSourceUrl" id="lyricsSourceUrl" placeholder="Türkü Sözlerinin Kaynağının Url'i " />
                <input type="text" name="lyricsSourcePublication" id="lyricsSourcePublication" placeholder="Türkü Sözlerini Paylaşan Sitenin İsmi" />
                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default AddSong;

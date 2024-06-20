import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Song from "./components/Song";
import Turkuler from "../server/database/Turkuler.json";
import AddSong from "./components/AddSong";

function App() {
  return (
    <>
      <Header />
      <main>
        <AddSong />
        {Turkuler.map((turku) => (
          <Song
            key={turku.id}
            video={turku.url}
            name={turku.name}
            lyrics={turku.lyrics}
            story={turku.story}
            singer={turku.singer}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default App;

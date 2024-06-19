import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Song from "./components/Song";
import Turkuler from "./database/Turkuler.json";

function App() {
  return (
    <>
      <Header />
      <main>
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

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

// Importing the JSON file with an assertion for type safety
import Turkuler from './database/Turkuler.json' assert { type: 'json' };

const app = express();
const port = 3000;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Necessary setup to use __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Route to get a random song
app.get('/random', (req, res) => {
  const random = Math.floor(Math.random() * Turkuler.length);
  res.json(Turkuler[random]); // Respond with a random song
});

// Route to get all songs
app.get('/turkuler', (req, res) => {
  res.json(Turkuler); // Respond with the entire song list
});

// Route to get a specific song by ID
app.get('/turkuler/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundSong = Turkuler.find((turku) => turku.id === id);
  if (!foundSong) {
    return res.status(404).json({ error: 'Türkü bulunamadı' }); // Respond with error if song not found
  }
  res.json(foundSong); // Respond with the found song
});

// Route to search songs by lyrics
app.get('/search', (req, res) => {
  const searchLyrics = req.query.search.toLowerCase();
  const foundSong = Turkuler.filter((turku) => turku.lyrics.toLowerCase().includes(searchLyrics));
  if (foundSong.length === 0) {
    res.status(404).send('Türkü bulunamadı'); // Respond with error if no matching songs found
  } else {
    res.json(foundSong); // Respond with the found songs
  }
});

// Route to add a new song
app.post('/turkuler', (req, res) => {
  // Validate input, requiring at least name and lyrics
  if (!req.body.name || !req.body.lyrics) {
    return res.status(400).json({ error: 'Name and lyrics are required' });
  }

  // Create a new song object
  const newSong = {
    id: Turkuler.length + 1, // Generate a new ID
    name: req.body.name,
    singer: req.body.singer || '',
    url: req.body.url || '',
    story: req.body.story || 'Hikaye bulunamadı',
    lyrics: req.body.lyrics,
    storySource: {
      url: req.body.storySourceUrl || '',
      publication: req.body.storySourcePublication || '',
    },
    lyricsSource: {
      url: req.body.lyricsSourceUrl || '',
      publication: req.body.lyricsSourcePublication || '',
    },
  };

  // Add the new song to the array
  Turkuler.push(newSong);

  // Write the updated song list back to the JSON file
  fs.writeFile(
    path.join(__dirname, 'database', 'Turkuler.json'),
    JSON.stringify(Turkuler, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(newSong); // Respond with the newly added song
    }
  );
});

// Route to update an existing song by ID (full update)
app.put('/turkuler/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundIndex = Turkuler.findIndex(turku => turku.id === id);

  if (foundIndex === -1) {
    return res.status(404).json({ error: 'Türkü bulunamadı' }); // Respond with error if song not found
  }

  // Update the song with the new data from the request
  const updatedSong = {
    ...Turkuler[foundIndex],
    ...req.body,
    id: id
  };

  // Replace the old song with the updated one
  Turkuler[foundIndex] = updatedSong;

  // Write the updated song list back to the JSON file
  fs.writeFile(
    path.join(__dirname, 'database', 'Turkuler.json'),
    JSON.stringify(Turkuler, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(updatedSong); // Respond with the updated song
    }
  );
});

// Route to partially update an existing song by ID
app.patch('/turkuler/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundIndex = Turkuler.findIndex(turku => turku.id === id);

  if (foundIndex === -1) {
    return res.status(404).json({ error: 'Türkü bulunamadı' }); // Respond with error if song not found
  }

  // Partially update the song with the new data from the request
  const updatedSong = {
    ...Turkuler[foundIndex],
    ...req.body,
    id: id
  };

  // Replace the old song with the updated one
  Turkuler[foundIndex] = updatedSong;

  // Write the updated song list back to the JSON file
  fs.writeFile(
    path.join(__dirname, 'database', 'Turkuler.json'),
    JSON.stringify(Turkuler, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(updatedSong); // Respond with the updated song
    }
  );
});

// Route to delete a song by ID
app.delete('/turkuler/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundIndex = Turkuler.findIndex(turku => turku.id === id);

  if (foundIndex === -1) {
    return res.status(404).json({ error: 'Türkü bulunamadı' }); // Respond with error if song not found
  }

  // Remove the song from the array
  Turkuler.splice(foundIndex, 1);

  // Write the updated song list back to the JSON file
  fs.writeFile(
    path.join(__dirname, 'database', 'Turkuler.json'),
    JSON.stringify(Turkuler, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Türkü başarıyla silindi' }); // Respond with a success message
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

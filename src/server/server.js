import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

// JSON dosyasını import ederken assert ifadesi kullanıyoruz
import Turkuler from './database/Turkuler.json' assert { type: 'json' };

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// ESM ile __dirname kullanımı için gerekli kodlar
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/random', (req, res) => {
  const random = Math.floor(Math.random() * Turkuler.length);
  res.json(Turkuler[random]);
});

app.get('/turkuler', (req, res) => {
  res.json(Turkuler);
});

app.get('/turkuler/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundSong = Turkuler.find((turku) => turku.id === id);
  if (!foundSong) {
    return res.status(404).json({ error: 'Türkü bulunamadı' });
  }
  res.json(foundSong);
});

app.get('/search', (req, res) => {
  const searchLyrics = req.query.search.toLowerCase();
  const foundSong = Turkuler.filter((turku) => turku.lyrics.toLowerCase().includes(searchLyrics));
  if (foundSong.length === 0) {
    res.status(404).send('Türkü bulunamadı');
  } else {
    res.json(foundSong);
  }
});

app.post('/turkuler', (req, res) => {
  // Veri doğrulama örneği, örnek olarak name ve lyrics zorunlu alanlar olsun
  if (!req.body.name || !req.body.lyrics) {
    return res.status(400).json({ error: 'Name and lyrics are required' });
  }

  const newSong = {
    id: Turkuler.length + 1,
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

  Turkuler.push(newSong);

  // Dosyaya yazma işlemi asenkron olarak gerçekleştiriliyor
  fs.writeFile(
    path.join(__dirname, 'database', 'Turkuler.json'),
    JSON.stringify(Turkuler, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(newSong);
    }
  );
});

// Put a Turkish Folk Song
app.put('/turkuler/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundIndex = Turkuler.findIndex(turku => turku.id === id);

  if (foundIndex === -1) {
    return res.status(404).json({ error: 'Türkü bulunamadı' });
  }

  const updatedSong = {
    ...Turkuler[foundIndex],
    ...req.body,
    id: id
  };

  Turkuler[foundIndex] = updatedSong;

  fs.writeFile(
    path.join(__dirname, 'database', 'Turkuler.json'),
    JSON.stringify(Turkuler, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(updatedSong);
    }
  );
});

// Patch a Turkish Folk Song
app.patch('/turkuler/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundIndex = Turkuler.findIndex(turku => turku.id === id);

  if (foundIndex === -1) {
    return res.status(404).json({ error: 'Türkü bulunamadı' });
  }

  const updatedSong = {
    ...Turkuler[foundIndex],
    ...req.body,
    id: id
  };

  Turkuler[foundIndex] = updatedSong;

  fs.writeFile(
    path.join(__dirname, 'database', 'Turkuler.json'),
    JSON.stringify(Turkuler, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(updatedSong);
    }
  );
});

// Delete a Turkish Folk Song
app.delete('/turkuler/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundIndex = Turkuler.findIndex(turku => turku.id === id);

  if (foundIndex === -1) {
    return res.status(404).json({ error: 'Türkü bulunamadı' });
  }

  Turkuler.splice(foundIndex, 1);

  fs.writeFile(
    path.join(__dirname, 'database', 'Turkuler.json'),
    JSON.stringify(Turkuler, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Türkü başarıyla silindi' });
    }
  );
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

// pages/albums.tsx
"use client";
import { useEffect, useState } from 'react';

interface Album {
  userId: number;
  id: number;
  title: string;
}

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar álbuns');
        return res.json();
      })
      .then(setAlbums)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Álbuns</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {albums.map(album => (
          <li key={album.id} style={{ marginBottom: 10 }}>
            <strong>Álbum #{album.id}</strong>: {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
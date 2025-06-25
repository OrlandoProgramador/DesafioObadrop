"use client";
import { useEffect, useState } from 'react';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar fotos');
        return res.json();
      })
      .then(setPhotos)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Fotos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {photos.slice(0, 50).map(photo => (  // limitando a 50 fotos para performance
          <li key={photo.id} style={{ marginBottom: 20 }}>
            <strong>{photo.title}</strong><br />
            <img src={photo.thumbnailUrl} alt={photo.title} width={150} height={150} style={{ borderRadius: 8 }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
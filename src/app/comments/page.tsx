// pages/comments.tsx
"use client";
import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar comentários');
        return res.json();
      })
      .then(setComments)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Comentários</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {comments.slice(0, 20).map(comment => (
          <li key={comment.id} style={{ marginBottom: 20 }}>
            <strong>{comment.name}</strong> — <em>{comment.email}</em>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
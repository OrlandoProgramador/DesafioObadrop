'use client';

import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function Post1CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar comentários');
        return res.json();
      })
      .then(setComments)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Comentários do Post 1</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {comments.map(comment => (
          <li key={comment.id} style={{ marginBottom: '1rem' }}>
            <strong>{comment.name}</strong> (<em>{comment.email}</em>)
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
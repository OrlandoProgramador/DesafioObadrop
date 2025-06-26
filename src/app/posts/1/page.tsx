'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Post1Page() {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar post');
        return res.json();
      })
      .then(setPost)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Post 1</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
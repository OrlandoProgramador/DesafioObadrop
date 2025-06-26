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
  <div style={{
    padding: 40,
    backgroundColor: '#0d1117', 
    backgroundImage: 'linear-gradient(to bottom, #0d1117, #161b22)', 
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif", 
    color: '#ffffff', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      maxWidth: 800, 
      margin: '0 auto',
      backgroundColor: '#161b22', 
      padding: 40,
      borderRadius: 12,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)', 
      border: '1px solid #30363d', 
      textAlign: 'center',
    }}>

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 600,
        color: '#58a6ff', 
        marginBottom: 20,
        letterSpacing: '0.5px',
      }}>
        Post 1
      </h1>

      {error && (
        <p style={{
          color: '#f85149', 
          fontSize: '1.2rem',
          fontWeight: 500,
          marginBottom: 20,
        }}>
          {error}
        </p>
      )}

      {!post && (
        <p style={{
          fontSize: '1.2rem',
          fontWeight: 500,
          color: '#c9d1d9',
          marginBottom: 20,
        }}>
          Carregando...
        </p>
      )}

      {post && (
        <>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 600,
            color: '#58a6ff', 
            marginBottom: 15,
          }}>
            {post.title}
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#c9d1d9', 
            lineHeight: '1.6',
          }}>
            {post.body}
          </p>
        </>
      )}
    </div>
  </div>
);
}
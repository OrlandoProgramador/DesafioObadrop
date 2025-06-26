'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function EditPost() {
  const params = useParams();
  const postId = Number(params.id); 

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PostResponse | null>(null); 


  async function updatePost(
    postId: number,
    data: { title: string; body: string; userId: number }
  ) {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json: PostResponse = await res.json();
      console.log('Resposta da API:', json);
      setResponse(json);
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  }


  const handleClick = () => {
    const dataToUpdate = {
      title: 'Título atualizado',
      body: 'Corpo do post atualizado',
      userId: 1,
    };
    updatePost(postId, dataToUpdate);
  };


  if (isNaN(postId)) {
    return <div>ID inválido</div>;
  }

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
      maxWidth: 600, 
      padding: 40,
      backgroundColor: '#161b22', 
      borderRadius: 12,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)', 
      border: '1px solid #30363d', 
      textAlign: 'center',
    }}>
    
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 600,
        color: '#58a6ff', 
        marginBottom: 20,
      }}>
        Editando post #{postId}
      </h1>

    
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: loading ? '#555' : '#1a237e', 
          border: 'none',
          borderRadius: 8,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Atualizando...' : 'Atualizar Post'}
      </button>

    
      {response && (
        <pre style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: '#21262d',
          borderRadius: 8,
          border: '1px solid #30363d',
          color: '#c9d1d9', 
          overflowX: 'auto', 
          fontSize: '0.9rem',
          lineHeight: '1.5',
        }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  </div>
);
}
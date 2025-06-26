'use client';

import { useState } from 'react';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
      });

      if (!res.ok) throw new Error('Erro ao criar post');

      const data = await res.json();
      console.log('Post criado:', data);
      setMessage('✅ Post criado com sucesso!');
      setTitle('');
      setBody('');
    } catch (err: unknown) {
  if (err instanceof Error) {
    
  } else {
    setMessage('❌ Ocorreu um erro');
  }
}
  };

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
        Criar Post
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20, 
        }}
      >
      
        <div>
          <label style={{ display: 'block', marginBottom: 5, color: '#c9d1d9' }}>
            Título:
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 15px',
              fontSize: '1rem',
              color: '#ffffff',
              backgroundColor: '#21262d', 
              border: '1px solid #30363d',
              borderRadius: 8,
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
          />
        </div>

      
        <div>
          <label style={{ display: 'block', marginBottom: 5, color: '#c9d1d9' }}>
            Conteúdo:
          </label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
            rows={5}
            style={{
              width: '100%',
              padding: '10px 15px',
              fontSize: '1rem',
              color: '#ffffff',
              backgroundColor: '#21262d', 
              border: '1px solid #30363d',
              borderRadius: 8,
              resize: 'vertical', 
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
          />
        </div>

       
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: '#1a237e', 
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
        >
          Enviar
        </button>
      </form>

    
      {message && (
        <p style={{
          marginTop: 20,
          fontSize: '1rem',
          fontWeight: 500,
          color: '#c9d1d9', 
        }}>
          {message}
        </p>
      )}
    </div>
  </div>
);
}
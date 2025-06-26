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
    <div style={{ padding: 20 }}>
      <h1>Criar Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Conteúdo:</label>
          <br />
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
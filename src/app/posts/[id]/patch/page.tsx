'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
   
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar post');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setTitle(data.title);
        setBody(data.body);
        setLoading(false);
      })
      .catch(() => {
        setError('Falha ao carregar o post.');
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });

      if (!res.ok) throw new Error('Erro ao salvar');

    
      router.push(`/posts/${id}`);
    } catch {
      setError('Erro ao salvar as alterações.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Carregando post...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Post não encontrado.</p>;

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
        Editando Post #{post.id}
      </h1>

      
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20, 
        }}
      >
       
        <div style={{ textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: 5, color: '#c9d1d9' }}>
            Título:
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            disabled={saving}
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

       
        <div style={{ textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: 5, color: '#c9d1d9' }}>
            Corpo:
          </label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
            disabled={saving}
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
          disabled={saving}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: saving ? '#555' : '#1a237e', 
            border: 'none',
            borderRadius: 8,
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  </div>
);
}
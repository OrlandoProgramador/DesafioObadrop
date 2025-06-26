// /app/posts/[id]/patch/page.tsx
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
    // Simulando fetch para pegar post
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

      // Opcional: redirecionar após salvar
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
    <div>
      <h1>Editando Post #{post.id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Título:
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              disabled={saving}
            />
          </label>
        </div>
        <div>
          <label>
            Corpo:
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              required
              disabled={saving}
            />
          </label>
        </div>
        <button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
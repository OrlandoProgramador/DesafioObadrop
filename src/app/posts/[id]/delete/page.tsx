'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function DeletePostPage() {
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    async function deletePost() {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });

        if (res.ok) {
          alert(`Post ${id} deletado!`);
          router.push('/posts'); 
        } else {
          alert('Falha ao deletar post');
        }
      } catch (error) {
        console.error(error);
        alert('Erro ao deletar post');
      }
    }

    deletePost();
  }, [id, router]);

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
      <p style={{
        fontSize: '1.5rem',
        fontWeight: 600,
        color: '#58a6ff', 
        marginBottom: 20,
      }}>
        Deletando post #{id}...
      </p>
    </div>
  </div>
);
}
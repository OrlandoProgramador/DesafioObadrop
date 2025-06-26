'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

export default function CommentsPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = 'https://jsonplaceholder.typicode.com/comments';
    if (postId) {
      url += `?postId=${postId}`;
    }

    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar comentários');
        return res.json();
      })
      .then(setComments)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [postId]);

return (
  <div style={{
    padding: 40,
    backgroundColor: '#0d1117', 
    backgroundImage: 'linear-gradient(to bottom, #0d1117, #161b22)', 
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif", 
    color: '#ffffff', 
  }}>
    <div style={{
      maxWidth: 1200, 
      margin: '0 auto',
      backgroundColor: '#161b22', 
      padding: 40,
      borderRadius: 12,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)', 
      border: '1px solid #30363d', 
    }}>
      <h1 style={{
        color: '#58a6ff', 
        fontSize: '2.5rem',
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 40,
        letterSpacing: '0.5px',
      }}>
        Comentários
      </h1>

      {loading && (
        <p style={{
          color: '#c9d1d9', 
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 500,
        }}>
          Carregando...
        </p>
      )}

      {error && (
        <p style={{
          color: '#f85149', 
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 500,
        }}>
          {error}
        </p>
      )}

      {!loading && comments.length === 0 && (
        <p style={{
          color: '#c9d1d9', 
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 500,
        }}>
          Nenhum comentário encontrado.
        </p>
      )}

      <div style={{
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 30, // 
      }}>
        {comments.map(comment => (
          <div
            key={comment.id}
            style={{
              flex: '1 1 calc(33.333% - 60px)', 
              padding: 20,
              borderRadius: 12,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)', 
              transition: 'transform 0.2s ease, box-shadow 0.2s ease', 
              textAlign: 'center', 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
            }}
          >
           
            <div style={{
              width: '100%',
              height: 'auto', 
              backgroundColor: '#21262d', 
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #30363d',
              boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.2)',
              padding: 30, 
            }}>
              <strong style={{ fontSize: '1.5rem', fontWeight: 600, color: '#58a6ff', marginBottom: 10 }}>
                {comment.name}
              </strong>
              <em style={{ fontSize: '1rem', color: '#c9d1d9', marginBottom: 15 }}>
                {comment.email}
              </em>
              <p style={{ fontSize: '1.1rem', color: '#c9d1d9', textAlign: 'center', lineHeight: '1.6' }}>
                {comment.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
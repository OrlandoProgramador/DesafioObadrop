'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

// Interface da resposta esperada da API
interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function EditPost() {
  const params = useParams();
  const postId = Number(params.id); // Converte o ID da URL para número

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PostResponse | null>(null); // Tipagem correta

  // Função para atualizar o post
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

  // Ação ao clicar no botão
  const handleClick = () => {
    const dataToUpdate = {
      title: 'Título atualizado',
      body: 'Corpo do post atualizado',
      userId: 1,
    };
    updatePost(postId, dataToUpdate);
  };

  // Verifica se o ID é inválido
  if (isNaN(postId)) {
    return <div>ID inválido</div>;
  }

  return (
    <div>
      <h1>Editando post {postId}</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Atualizando...' : 'Atualizar Post'}
      </button>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}
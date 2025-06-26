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
          router.push('/posts'); // redireciona para a lista ou outra página
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

  return <p>Deletando post {id}...</p>;
}
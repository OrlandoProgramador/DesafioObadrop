"use client";
import React, { useEffect, useState } from 'react';
import { getTodo } from '../services/api';
import { Todo } from '../types/Todo';

function TodoComponent() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodo(1)
      .then(setTodo)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h1>TODO com Fetch</h1>
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {todo ? (
        <div>
          <p><strong>ID:</strong> {todo.id}</p>
          <p><strong>Título:</strong> {todo.title}</p>
          <p><strong>Concluído:</strong> {todo.completed ? 'Sim' : 'Não'}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default TodoComponent;
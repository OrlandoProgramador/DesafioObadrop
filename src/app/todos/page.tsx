"use client";
import { useEffect, useState } from 'react';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar tarefas');
        return res.json();
      })
      .then(setTodos)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Tarefas (Todos)</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: 10 }}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span style={{ marginLeft: 8, textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
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
      maxWidth: 800, 
      margin: '0 auto',
      backgroundColor: '#161b22', 
      padding: 40,
      borderRadius: 12,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)', 
      border: '1px solid #30363d', 
    }}>
    
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 600,
        color: '#58a6ff', 
        textAlign: 'center',
        marginBottom: 40,
        letterSpacing: '0.5px',
      }}>
        Lista de Tarefas (Todos)
      </h1>

      
      {error && (
        <p style={{
          color: '#f85149', 
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 500,
          marginBottom: 40,
        }}>
          {error}
        </p>
      )}

     
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              marginBottom: 15,
              padding: 15,
              backgroundColor: '#21262d', 
              borderRadius: 8,
              border: '1px solid #30363d', 
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', 
              transition: 'transform 0.2s ease, box-shadow 0.2s ease', 
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
            }}
          >
          
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                style={{
                  width: 20,
                  height: 20,
                  accentColor: '#58a6ff', 
                  cursor: 'pointer',
                }}
              />
              <span
                style={{
                  marginLeft: 10,
                  fontSize: '1rem',
                  color: todo.completed ? '#c9d1d9' : '#ffffff', 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  transition: 'color 0.2s ease', 
                }}
              >
                {todo.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
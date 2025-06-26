"use client";
import { useEffect, useState } from 'react';

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  catchPhrase: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        return res.json();
      })
      .then(setUsers)
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
      maxWidth: 1200, 
      margin: '0 auto',
      backgroundColor: '#161b22', 
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
        Lista de Usuários
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
        {users.map(user => (
          <li
            key={user.id}
            style={{
              marginBottom: 30,
              padding: 20,
              backgroundColor: '#21262d', 
              borderRadius: 12,
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
            
            <strong style={{ fontSize: '1.1rem', fontWeight: 600, color: '#58a6ff' }}>
              {user.name} (@{user.username})
            </strong>

           
            <p style={{ fontSize: '1rem', color: '#c9d1d9', marginTop: 10 }}>
              <strong>Email:</strong> {user.email}
            </p>

            
            <p style={{ fontSize: '1rem', color: '#c9d1d9', marginTop: 5 }}>
              <strong>Endereço:</strong> {user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}
            </p>

           
            <p style={{ fontSize: '1rem', color: '#c9d1d9', marginTop: 5 }}>
              <strong>Telefone:</strong> {user.phone}
            </p>

           
            <p style={{ fontSize: '1rem', color: '#c9d1d9', marginTop: 5 }}>
              <strong>Empresa:</strong> {user.company.name} — {user.company.catchPhrase}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
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
    <div style={{ padding: 20 }}>
      <h1>Lista de Usuários</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            <>
              <strong>{user.name} (@{user.username})</strong><br />
              <strong>Email: {user.email}</strong><br />
              <strong>Endereço: {user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}</strong><br />
              <strong>Telefone: {user.phone}</strong><br />
              <strong>Empresa: {user.company.name} — {user.company.catchPhrase}</strong>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
}
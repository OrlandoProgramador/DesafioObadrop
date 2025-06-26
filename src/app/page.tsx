import React from 'react';
import TodoComponent from '../components/TodoComponent';
export default function Page() {
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
      padding: 40,
      borderRadius: 12,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)', 
      border: '1px solid #30363d', 
      textAlign: 'center',
    }}>
   
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 600,
        color: '#58a6ff', 
        marginBottom: 40,
        letterSpacing: '0.5px',
      }}>
        Meu App com Fetch
      </h1>

      
      <div>
        <TodoComponent />
      </div>
    </div>
  </div>
);
}

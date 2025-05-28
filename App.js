
import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🔱 Babadham-A2Z Login 🔱</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/><br/>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    // Simple authentication check - in production, this should be more secure
    if (email === 'admin@babadham-a2z.com' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use admin@babadham-a2z.com / admin123');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="app">
        <AdminPanel />
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🔱 Babadham-A2Z Admin Login 🔱</h2>
          <p>Access the job management system</p>
        </div>
        
        <div className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email"
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          
          <button className="login-btn" onClick={login}>
            Login to Admin Panel
          </button>
          
          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@babadham-a2z.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
// components/Login.tsx
import React, { useState } from 'react';
import { useLoginMutation } from '../services/authApi';
import { TextField, Button } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await login({ email, password }).unwrap();
      console.log(result); // Handle success (e.g., save the token)
      localStorage.setItem('token', result.token); // Save token to localStorage
    } catch (err) {
      console.error('Error:', err); // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        {isLoading ? 'Logging In...' : 'Log In'}
      </Button>
      {error && <p style={{ color: 'red' }}>Error: {}</p>}
      {isSuccess && <p>Login Successful!</p>}
    </form>
  );
};

export default Login;

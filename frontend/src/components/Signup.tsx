// components/Signup.tsx
import React, { useState } from 'react';
import { useSignupMutation } from '../services/authApi';
import { TextField, Button } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // or 'admin'
  
  const [signup, { isLoading, error, isSuccess }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await signup({ email, password, role }).unwrap();
      console.log(result); // Handle success (e.g., show a success message)
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
      <TextField
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </Button>
      {error && <p style={{ color: 'red' }}>Error: {}</p>}
      {isSuccess && <p>Signup Successful!</p>}
    </form>
  );
};

export default Signup;

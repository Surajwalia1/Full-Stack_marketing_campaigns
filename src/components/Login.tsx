// components/Login.tsx
import React, { useState } from 'react';
import { useLoginMutation } from '../services/authApi';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

interface LoginProps {
  onLoginSuccess?: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await login({ email, password }).unwrap();
      console.log('Login response:', result); // Debug log
      
      // Store user data
      localStorage.setItem('token', result.token);
      localStorage.setItem('userRole', result.role || result.user?.role);
      
      // Get the role from the response
      const userRole = result.role || result.user?.role;
      console.log('User role:', userRole); // Debug log
      
      if (onLoginSuccess && userRole) {
        onLoginSuccess(userRole);
      }
    } catch (err) {
      console.error('Login Error:', err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
            type="email"
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            variant="outlined"
            autoComplete="current-password"
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={isLoading}
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
        </Box>
      </form>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          "Invalid email or password. Please try again."
        </Alert>
      )}
      {isSuccess && <Alert severity="success" sx={{ mt: 2 }}>Login Successful!</Alert>}
    </Box>
  );
};

export default Login;

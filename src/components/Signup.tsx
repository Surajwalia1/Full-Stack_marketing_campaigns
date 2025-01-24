// components/Signup.tsx
import React, { useState } from 'react';
import { useSignupMutation } from '../services/authApi';
import { 
  TextField, 
  Button, 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

interface SignupProps {
  onSignupSuccess?: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  
  const [signup, { isLoading, error, isSuccess }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await signup({ email, password, role }).unwrap();
      console.log(result);
      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            Sign Up
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
                autoComplete="new-password"
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={isLoading}
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Box>
          </form>
          {error && <Alert severity="error" sx={{ mt: 2 }}>An error occurred during signup</Alert>}
          {isSuccess && <Alert severity="success" sx={{ mt: 2 }}>Signup Successful!</Alert>}
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;

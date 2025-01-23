// pages/HomePage.tsx
import { Box, Container, Grid, Typography, Paper, Button } from '@mui/material';
import { useState } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';

const HomePage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="h3" gutterBottom align="center" color="primary">
          Launch Your Marketing Campaigns
        </Typography>
        <Typography variant="h6" gutterBottom align="center" color="textSecondary">
          Start managing, scheduling, and optimizing your marketing campaigns with ease
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Signup Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f9fafb' }}>
              <Typography variant="h5" align="center" color="primary" gutterBottom>
                Sign Up and Get Started
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary" paragraph>
                Create your account to start building and tracking your marketing campaigns.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowSignup(!showSignup)}
              >
                {showSignup ? 'Hide Signup Form' : 'Sign Up'}
              </Button>
              {showSignup && <Signup />}
            </Paper>
          </Grid>

          {/* Login Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f9fafb' }}>
              <Typography variant="h5" align="center" color="primary" gutterBottom>
                Already Have an Account? Login
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary" paragraph>
                Log in to manage your ongoing campaigns and see the results.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowLogin(!showLogin)}
              >
                {showLogin ? 'Hide Login Form' : 'Login'}
              </Button>
              {showLogin && <Login />}
            </Paper>
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" href="/about" sx={{ textTransform: 'none' }}>
            Discover Campaign Features
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;

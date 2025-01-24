// pages/HomePage.tsx
import { 
  Box, 
  Container, 
  AppBar,
  Toolbar,
  Typography, 
  Button,
  Dialog,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';

const HomePage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (role: string) => {
    console.log('Handling login success with role:', role); // Debug log
    setShowLogin(false);
    
    // Ensure role comparison is case-insensitive
    const normalizedRole = role.toLowerCase();
    if (normalizedRole === 'admin') {
      console.log('Navigating to admin dashboard'); // Debug log
      navigate('/admin-dashboard');
    } else {
      console.log('Navigating to user dashboard'); // Debug log
      navigate('/user-dashboard');
    }
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
    // Show login dialog after successful signup
    setShowLogin(true);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Marketing Campaigns
          </Typography>
          <Button color="inherit" onClick={() => setShowSignup(true)}>
            Sign Up
          </Button>
          <Button color="inherit" onClick={() => setShowLogin(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ 
          mt: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          minHeight: '80vh'
        }}>
          <Typography variant="h2" component="h1" gutterBottom align="center" color="primary">
            Launch Your Marketing Campaigns
          </Typography>
          <Typography variant="h5" gutterBottom align="center" color="textSecondary" sx={{ mb: 6 }}>
            Create, manage, and track your marketing campaigns with ease
          </Typography>
        </Box>
      </Container>

      {/* Signup Dialog */}
      <Dialog 
        open={showSignup} 
        onClose={() => setShowSignup(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ position: 'relative', p: 2 }}>
          <IconButton
            onClick={() => setShowSignup(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Signup onSignupSuccess={handleSignupSuccess} />
        </Box>
      </Dialog>

      {/* Login Dialog */}
      <Dialog 
        open={showLogin} 
        onClose={() => setShowLogin(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ position: 'relative', p: 2 }}>
          <IconButton
            onClick={() => setShowLogin(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Login onLoginSuccess={handleLoginSuccess} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default HomePage;

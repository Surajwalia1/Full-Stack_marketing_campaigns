import { Container, Typography, Paper, Box } from '@mui/material';

const UserDashboard = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Thank you for registering!
          </Typography>
          <Typography variant="h6" color="textSecondary">
            You will start getting campaign notifications soon.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserDashboard;

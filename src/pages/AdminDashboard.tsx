import { Container, Typography, Box } from '@mui/material';
import CreateCampaign from './CreateCampaign';

const AdminDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary" textAlign="center">
          Admin Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom color="textSecondary" textAlign="center" sx={{ mb: 4 }}>
          Create and manage your marketing campaigns
        </Typography>
        <CreateCampaign />
      </Box>
    </Container>
  );
};

export default AdminDashboard;

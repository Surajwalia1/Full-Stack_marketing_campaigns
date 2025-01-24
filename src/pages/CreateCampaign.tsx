import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import { useCreateCampaignMutation, useUpdateCampaignMutation } from '../services/campaignApi';
import { Campaign } from '../types/campaign'; // Import the Campaign type

const CreateCampaign = () => {
  const [createCampaign, { isLoading }] = useCreateCampaignMutation();
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();

  const [formData, setFormData] = useState<Campaign>({
    message: '',
    category: '',
    scheduledTime: '',
    repeatPattern: '',
  });

  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCampaign) {
      try {
        await updateCampaign({ id: editingCampaign._id!, data: formData }).unwrap();
        alert('Campaign updated successfully!');
        setEditingCampaign(null);
      } catch (err) {
        alert('Error updating campaign: ');
      }
    } else {
      try {
        const response = await createCampaign(formData).unwrap();
        alert('Campaign created successfully!');
        setEditingCampaign(response.campaign);
      } catch (err) {
        alert('Error creating campaign: ');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {editingCampaign ? 'Edit Campaign' : 'Create Campaign'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Scheduled Time"
          name="scheduledTime"
          type="datetime-local"
          value={formData.scheduledTime}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Repeat Pattern"
          name="repeatPattern"
          value={formData.repeatPattern}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <Grid container justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || isUpdating}
          >
            {isLoading || isUpdating
              ? editingCampaign
                ? 'Updating Campaign...'
                : 'Creating Campaign...'
              : editingCampaign
              ? 'Update Campaign'
              : 'Create Campaign'}
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateCampaign;

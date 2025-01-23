import React, { useState } from 'react';
import { useCreateCampaignMutation } from '../services/campaignApi';

const CreateCampaign = () => {
  const [createCampaign, { isLoading, isError }] = useCreateCampaignMutation();
  
  const [formData, setFormData] = useState({
    message: '',
    category: '',
    scheduledTime: '',
    repeatPattern: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCampaign(formData).unwrap();
      alert('Campaign created successfully!');
    } catch (err) {
      alert('Error creating campaign: ');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Message</label>
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Scheduled Time</label>
        <input
          type="datetime-local"
          name="scheduledTime"
          value={formData.scheduledTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Repeat Pattern</label>
        <input
          type="text"
          name="repeatPattern"
          value={formData.repeatPattern}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating Campaign...' : 'Create Campaign'}
      </button>

      {isError && <div>Error: {}</div>}
    </form>
  );
};

export default CreateCampaign;

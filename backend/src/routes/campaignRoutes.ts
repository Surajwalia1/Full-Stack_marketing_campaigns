import express, { Request, Response } from 'express';
import { authenticateJWT, authorizeAdmin } from '../middleware/authMiddleware';
import CampaignModel from '../models/campaign';
import UserModel from '../models/User'; // Correct import for User model
import { sendEmail } from '../services/emailService';

const router = express.Router();

/**
 * Route handler to create a new campaign.
 * Only accessible by authenticated admins.
 */
router.post('/campaigns', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  const { message, category, scheduledTime, repeatPattern } = req.body;

  try {
    const newCampaign = new CampaignModel({
      message,
      category,
      scheduledTime,
      repeatPattern,
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    res.status(400).json({ error: 'Error creating campaign', details: error });
  }
});

/**
 * Route handler to get all campaigns.
 * Only accessible by authenticated admins.
 */
router.get('/campaigns', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await CampaignModel.find();
    res.status(200).json({ campaigns });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching campaigns', details: error });
  }
});

/**
 * Route handler to update an existing campaign.
 * Only accessible by authenticated admins.
 */
router.put('/campaigns/:id', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { message, category, scheduledTime, repeatPattern } = req.body;

  try {
    const updatedCampaign = await CampaignModel.findByIdAndUpdate(
      id,
      { message, category, scheduledTime, repeatPattern },
      { new: true }
    );

    if (!updatedCampaign) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }

    res.status(200).json({ message: 'Campaign updated successfully', campaign: updatedCampaign });
  } catch (error) {
    res.status(400).json({ error: 'Error updating campaign', details: error });
  }
});

/**
 * Route handler to execute a campaign (send emails to users in the target category).
 * Only accessible by authenticated admins.
 */
router.post('/campaigns/:id/execute', authenticateJWT, authorizeAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const campaign = await CampaignModel.findById(id);

    if (!campaign) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }

    // Fetch all users from the database regardless of category
    const users = await UserModel.find();

    if (users.length === 0) {
      res.status(404).json({ error: 'No users found in the database' });
      return;
    }

    // Send the campaign message to all users
    for (const user of users) {
      await sendEmail(user.email, 'Broadcast Campaign', campaign.message || '');
    }

    // Update campaign status to executed
    campaign.status = 'executed';
    await campaign.save();

    res.status(200).json({ message: 'Campaign executed and emails sent successfully', campaign });
  } catch (error) {
    console.error('Error executing campaign:', error);
    res.status(500).json({ error: 'Error executing campaign', details: error });
  }
});

export default router;
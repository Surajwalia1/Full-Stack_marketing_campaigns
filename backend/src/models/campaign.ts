// Updated Campaign Schema with optional reference to User
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the properties of a Campaign document.
 */
interface Campaign extends Document {
  message: string;           // The content of the campaign
  category: string;          // User category (all, specific category)
  scheduledTime: Date;       // When the campaign should be sent
  repeatPattern?: string;    // Optional, for recurring campaigns
  status: string;            // Status (e.g., 'pending', 'executed', etc.)
}

/**
 * Mongoose schema for the Campaign model.
 */
const CampaignSchema = new Schema({
  message: { type: String, required: true },
  category: { type: String, required: true }, // Will still store category
  scheduledTime: { type: Date, required: true },
  repeatPattern: { type: String },
  status: { type: String, default: 'pending' },
});

export const CampaignModel = mongoose.model<Campaign>('Campaign', CampaignSchema);

export default CampaignModel;

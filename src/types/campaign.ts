// src/types/campaign.ts
export interface Campaign {
    _id?: string; // Optional because it won't be present when creating a new campaign
    message: string;
    category: string;
    scheduledTime: string;
    repeatPattern: string;
    status?: string; // The campaign's status (e.g., 'pending', 'active', etc.), returned after creation
  }
  
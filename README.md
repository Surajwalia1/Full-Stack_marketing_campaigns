# Marketing Campaign Automation System

This project is a **Marketing Campaign Automation System** designed to manage campaigns, schedule them, and send emails to targeted user categories. It uses **TypeScript**, **Express**, **MongoDB**, and **JWT-based authentication** for secure access control. The system includes features like campaign creation, execution, and email notifications, along with a scheduler that automatically runs campaigns based on predefined time schedules.

---


## Overview

The Marketing Campaign Automation System allows admins to:

- Create and manage marketing campaigns.
- Schedule campaigns to run at specific times.
- Execute campaigns and send emails to users in specific categories.
- Track campaign statuses (pending, executed).
- Secure access to the system using JWT tokens with admin privileges.

---

## Features

- **User Authentication**: Users can sign up and log in securely using JWT-based authentication.
- **Campaign Management**: Admins can create, update, and delete campaigns, including scheduling the campaigns for execution.
- **Email Notifications**: The system sends emails to users based on their categories, notifying them of campaigns.
- **Scheduler**: A scheduler is used to run campaigns automatically based on a set time.
- **Admin Access**: Only users with the "admin" role have access to sensitive routes like creating and managing campaigns.

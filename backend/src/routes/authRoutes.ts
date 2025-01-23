import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { limiter } from '../middleware/rateLimiter';

const router = express.Router();



/**
 * @route POST /signup
 * @desc Create a new user account with email, password, and role
 * @access Public (Rate limited)
 * @param {string} req.body.email - The user's email address
 * @param {string} req.body.password - The user's password
 * @param {string} req.body.role - The role of the user (user/admin)
 * @returns {Object} 201 - Success message
 * @returns {Object} 400 - Error message if the user already exists
 * @throws {Error} 500 - Internal Server Error
 */

// Sign up route
router.post('/signup', limiter, async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role ,category} = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      category
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
});



/**
 * @route POST /login
 * @desc Log in the user by verifying email and password, and returning a JWT token
 * @access Public (Rate limited)
 * @param {string} req.body.email - The user's email address
 * @param {string} req.body.password - The user's password
 * @returns {Object} 200 - JWT Token upon successful login
 * @returns {Object} 400 - Error message if credentials are invalid
 * @throws {Error} 500 - Internal Server Error
 */

// Login route
router.post('/login', limiter, async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
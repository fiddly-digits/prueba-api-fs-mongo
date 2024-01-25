import express from 'express';
import { register, login } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const token = await login(req.body);
    if (!token) throw createError(400, 'Error creating token');
    res.status(200).json({ success: true, message: 'User logged in', token });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const createdUser = await register(req.body, req.file);
    if (!createdUser) throw createError(400, 'Error creating user');
    res
      .status(201)
      .json({ success: true, message: 'User created', data: createdUser });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

export default router;

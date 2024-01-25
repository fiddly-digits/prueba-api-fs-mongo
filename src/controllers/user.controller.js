import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import createError from 'http-errors';

const { SECRET_KEY } = process.env;

export const register = async (data) => {
  let user = await User.findOne({ email: data.username });
  if (user) throw createError(400, 'User already registered');

  user = await User.create(data);

  return user;
};

export const login = async (data) => {
  const user = await User.findOne({ username: data.username });
  if (!user) throw createError(404, 'User not found');

  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) throw createError(400, 'Invalid credentials');

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: 5 * 60 * 60
  });
  return token;
};

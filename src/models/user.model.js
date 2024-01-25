import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { Schema, model } = mongoose;

// ! Add Rating to worker and user in next iteration

const userSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
    throw new Error('Error hashing password');
  }
});

userSchema.methods.comparePassword = async function (clientPassword) {
  return await bcrypt.compare(clientPassword, this.password);
};

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.__v;
  delete obj.password;
  return obj;
};

export const User = model('Users', userSchema);

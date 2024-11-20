import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { IUser, IUserModel } from './user.interface';

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (el: string) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(el);
      },
      message: 'Please provide a valid email',
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  profileImage: {
    type: String,
    default: null,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (this: IUser, el: string) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  isActived: {
    type: Boolean,
    default: false,
  },
  isDeactivated: {
    type: Boolean,
    default: false,
  },
  activationToken: {
    type: String,
    select: false,
  },
  notifyMe: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Middleware to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Middleware to update `passwordChangedAt` timestamp
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date();
  next();
});

// Instance methods
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// Export the model
const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;

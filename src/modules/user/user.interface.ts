import { Document, Model } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: 'visitor' | 'admin' | 'user';
    profileImage?: string | null;
    dateOfBirth?: Date | null;
    phoneNumber?: string | null;
    address?: string | null;
    password: string;
    passwordConfirm?: string;
    isActived: boolean;
    isDeactivated: boolean;
    activationToken?: string;
    notifyMe: boolean;
    createdAt: Date;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
  
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    createPasswordResetToken(): string;
    changedPasswordAfter(JWTTimestamp: number): boolean;
  }

  
export interface IUserModel extends Model<IUser> {}
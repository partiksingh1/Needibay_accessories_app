import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string; // Added for salesperson
  email: string;
  password: string;
  role: string; // 'admin', 'salesperson', 'distributor'
  employeeCode?: string; // Optional for salesperson
  panCard?: string; // Optional for salesperson
  city?: string; // Optional for salesperson
  distributorId?: mongoose.Types.ObjectId; // Link to distributor if necessary
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'salesperson', 'distributor'], required: true },
  employeeCode: { type: String },
  panCard: { type: String },
  city: { type: String },
  distributorId: { type: mongoose.Types.ObjectId, ref: 'Distributor' },
});

export default mongoose.model<IUser>('User', UserSchema);

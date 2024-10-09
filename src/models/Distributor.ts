import mongoose, { Document, Schema } from 'mongoose';

export interface IDistributor extends Document {
  distributorName: string;
  ownerName: string;
  publicName: string;
  businessAddress: string;
  contactNo: string;
  email: string;
  gst: string;
  city: string;
  pan: string;
}

const DistributorSchema = new Schema<IDistributor>({
  distributorName: { type: String, required: true },
  ownerName: { type: String, required: true },
  publicName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gst: { type: String, required: true },
  city: { type: String, required: true },
  pan: { type: String, required: true },
});

export default mongoose.model<IDistributor>('Distributor', DistributorSchema);

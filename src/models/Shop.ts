import mongoose, { Document, Schema } from 'mongoose';

// Define the Shopkeeper interface
export interface IShopkeeper extends Document {
  shopName: string;
  name: string;
  publicName: string;
  contactDetail: string;
  city: string;
  distributors: mongoose.Types.ObjectId[]; // Array of distributor IDs
  onboardedBy: mongoose.Types.ObjectId; // Reference to the salesperson who onboarded
}

// Define the Shopkeeper schema
const ShopkeeperSchema = new Schema<IShopkeeper>({
  shopName: { type: String, required: true },
  name: { type: String, required: true },
  publicName: { type: String, required: true },
  contactDetail: { type: String, required: true },
  city: { type: String, required: true },
  distributors: [{ type: Schema.Types.ObjectId, ref: 'Distributor' }], // Corrected type here
  onboardedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Corrected type here
});

// Export the Shopkeeper model
export default mongoose.model<IShopkeeper>('Shopkeeper', ShopkeeperSchema);

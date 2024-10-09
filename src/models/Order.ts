import mongoose, { Document, Schema } from 'mongoose';

// Define the Order interface
export interface IOrder extends Document {
  products: { productId: mongoose.Types.ObjectId; quantity: number }[]; // List of products in the order
  salesperson: mongoose.Types.ObjectId; // Reference to the salesperson
  distributor: mongoose.Types.ObjectId; // Reference to the distributor
  shopkeeper: mongoose.Types.ObjectId; // Reference to the shopkeeper
  status: string; // e.g., 'pending', 'dispatched', 'delivered'
  paymentStatus: string; // e.g., 'paid', 'unpaid'
  paymentMode: string; // e.g., 'cash', 'card', 'UPI'
  createdAt: Date;
}

// Define the Order schema
const OrderSchema = new Schema<IOrder>({
  products: [
    { 
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Corrected type
      quantity: { type: Number, required: true }
    }
  ],
  salesperson: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Corrected type
  distributor: { type: Schema.Types.ObjectId, ref: 'Distributor', required: true }, // Corrected type
  shopkeeper: { type: Schema.Types.ObjectId, ref: 'Shopkeeper', required: true }, // Corrected type
  status: { type: String, default: 'pending' }, // Default to pending
  paymentStatus: { type: String, default: 'unpaid' }, // Default to unpaid
  paymentMode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the Order model
export default mongoose.model<IOrder>('Order', OrderSchema);

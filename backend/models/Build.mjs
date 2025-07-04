import mongoose from 'mongoose';

const BuildSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  name: {
    type: String
  },
  description: {
    type: String
  },
  totalPrice: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

const Build = mongoose.model('Build', BuildSchema);
export default Build;
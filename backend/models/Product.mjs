import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    required: true,
    enum: ['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu', 'case', 'cooler']
  },
  image: { type: String, required: true },
  model3D: {
    glb: { type: String, required: true },
  },
  specs: {
    type: Map,
    of: String
  },
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

export default mongoose.model('Product', ProductSchema);
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  telephone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  surname: {
    type: String,
    default: ''
  },
  patronymic: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  cart: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'cart.itemType'
    },
    itemType: {
      type: String,
      enum: ['Product', 'Build']
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    }
  }]
}, { versionKey: false });

export default mongoose.model('User', UserSchema);
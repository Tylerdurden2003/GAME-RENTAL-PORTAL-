const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  mobileVerified: {
    type: Boolean,
    default: false
  },
  rentals: [
    {
      gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
      rentType: { type: String, enum: ['hourly', 'daily', 'monthly'] },
      rentStart: Date,
      rentEnd: Date
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

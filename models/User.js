import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  theme: { type: String, default: 'light' },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

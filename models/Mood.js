// models/Journal.js
import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);

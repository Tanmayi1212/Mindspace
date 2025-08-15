// models/Journal.js
import mongoose from 'mongoose';

// models/Journal.js
const JournalSchema = new mongoose.Schema({
  title: String,
  content: String,
  mood: {
    type: String,
    required: false,
  },
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);

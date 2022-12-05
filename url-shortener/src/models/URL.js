import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortenUrl: {
    type: String,
    index: true,
  },
  clickNo: Number,
});

const URL = mongoose.model('url', urlSchema);

export default URL;

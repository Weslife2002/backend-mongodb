import mongoose from 'mongoose';

const pageTrackSchema = new mongoose.Schema({
  originalUrl: String,
  shortenUrl: {
    type: String,
    index: true,
  },
  clickNo: Number,
});

const PageTrack = mongoose.model('pageTrack', pageTrackSchema);

export { PageTrack };

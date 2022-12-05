import mongoose from 'mongoose';

const urlTrackSchema = new mongoose.Schema({
  originalUrl: String,
  shortenUrl: {
    type: String,
    index: true,
  },
  clickNo: Number,
});

const URLTrack = mongoose.model('urlTrack', urlTrackSchema);

export default URLTrack;

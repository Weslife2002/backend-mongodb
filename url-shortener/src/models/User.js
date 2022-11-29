import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  urlList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'url',
  }],
});

const User = mongoose.model('User', userSchema);

export { User };

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
      message: props => `${props.value} is not a valid email!`,
    },
    unique: true,
    index: true,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  nativeUser: Boolean,
  connectFacebook: Boolean,
  connectGoogle: Boolean,
  password: String,
  urlList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'url',
  }],
});

const User = mongoose.model('User', userSchema);

export { User };

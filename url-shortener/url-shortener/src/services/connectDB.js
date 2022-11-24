import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = URI => {
  mongoose.connect(URI);
};

export default connectDB;

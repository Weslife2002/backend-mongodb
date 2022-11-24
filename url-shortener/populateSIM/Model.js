import mongoose from 'mongoose';

const { Schema } = mongoose;
const NonStrictSchema = new Schema({}, { strict: false });
const Author = mongoose.model('Author', NonStrictSchema);
const Book = mongoose.model('Book', NonStrictSchema);

export { Author, Book };

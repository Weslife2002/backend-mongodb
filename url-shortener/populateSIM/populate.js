/* eslint-disable import/extensions */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import _ from 'lodash';
import dotenv from 'dotenv';
import { fakeAuthorData, fakeBookData } from './fakeData.js';
import { Author, Book } from './Model.js';

dotenv.config();
// Connection URL
const url = process.env.MONGODB_URI;
mongoose.connect(url);

async function main() {
  // await fakeAuthorData(1000);
  // await fakeBookData(1000);
  const books = await Book.find({}).limit(10);
  const result = await populate(books);
  console.log(result);
  console.log(result[0].authors[0]);
}

async function populate(books) {
  const authors = _.map(books, book => book.authors);
  const distinctAuthors = _.uniq(_.flatten(authors));
  const authorList = await Author.find({ _id: { $in: distinctAuthors } });
  const authorDict = _.keyBy(authorList, author => author._id);
  const result = _.map(books, book => {
    const newBook = { _id: book._id, name: book.name, authors: [] };
    _.forEach(book.authors, author => newBook.authors.push(authorDict[author]));
    return newBook;
  });
  return result;
}

main();

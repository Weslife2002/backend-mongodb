/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import configViewEngine from './configs/configViewEngine.js';
import configMiddleware from './middleware/configMiddleware.js';
import connectDB from './services/connectDB.js';
import route from './route/index.js';

dotenv.config();

const app = express();

// connect database;
const databaseURI = process.env.MONGODB_URI;
connectDB(databaseURI);

// session middleware
configMiddleware(app);

// Setup view engine
configViewEngine(app);

// Init web route
route(app);

export default app;

/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import configViewEngine from './configs/configViewEngine.js';
import initWebroute from './route/routes.js';
import configMiddleware from './middleware/configMiddleware.js';
import connectDB from './services/connectDB.js';

dotenv.config();

const databaseURI = process.env.MONGODB_URI;
const app = express();

// connect database;
connectDB(databaseURI);

// session middleware
configMiddleware(app);

// Setup view engine
configViewEngine(app);

// Init web route
initWebroute(app);

export default app;

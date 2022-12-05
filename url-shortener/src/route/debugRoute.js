/* eslint-disable import/extensions */
import express from 'express';

const debugRoute = express.Router();

// Admin basic - CRUD
debugRoute.get('/session', (req, res) => res.status(200).send(req.session));
debugRoute.get('/session-id', (req, res) => res.status(200).send(req.session.id));
debugRoute.get('/client-ip', (req, res) => res.status(200).send({ ip: req.ip }));

export default debugRoute;

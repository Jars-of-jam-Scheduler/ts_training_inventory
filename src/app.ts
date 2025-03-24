import dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import './config/dependency-config';
import express from 'express';
import routes from './routes/routing';
import mongoose from 'mongoose';
import { mongoConnectionString } from './config/database';

try {
    mongoose.connect(mongoConnectionString);
    console.log('Connecté à MongoDB avec Mongoose');

    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use('/', routes);

    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });

} catch (error) {
    console.error('Erreur de connexion à MongoDB avec Mongoose', error);
    throw error;
}
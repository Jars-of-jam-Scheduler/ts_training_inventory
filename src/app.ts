import express from 'express';
import routes from './routes/routing';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
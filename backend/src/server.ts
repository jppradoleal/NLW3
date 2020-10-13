import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import './database/connection';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on ${8080}`);
});
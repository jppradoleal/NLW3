import express from 'express';
import './database/connection';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on ${8080}`);
});
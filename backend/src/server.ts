import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({message: 'Hello World'});
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on ${8080}`);
});
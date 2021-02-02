import express from 'express';
import cors from 'cors';

import faceRouter from './routes/face';

const app = express();
const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 6060);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/face', faceRouter);

app.get('*', (err, req, res, next) => {
  console.log(err);
  res.status(500).send('error');
});

app.get('/', (req, res, next) => res.status(200).json('Hello, Server.'));

app.listen(app.get('port'), console.log(`Server listening on ${app.get('port')}.`));

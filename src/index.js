'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const pool = require('./db/db');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

const votingRouter = require('./routers/voting.js');
app.use('/voting', votingRouter);

const userRouter = require('./routers/user.js');
app.use('/user', userRouter);

const petitionRouter = require('./routers/petition.js');
app.use('/petition', petitionRouter);

const falsificationRouter = require('./routers/falsification.js');
app.use('/falsification', falsificationRouter);


app.get('/', (req, res) => {
  res.json('Seccessfully connected to voting system');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

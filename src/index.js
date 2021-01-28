'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(helmet());
// app.use(cors());
app.use(cors({
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

const dataRouter = require('./routers/data');
app.use('/', dataRouter);

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

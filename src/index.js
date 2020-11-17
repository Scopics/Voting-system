'use strict';

const express = require('express');
const helmet = require('helmet');
const pool = require('./db/db');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

const votingRouter = require('./routers/voting.js');
app.use('/voting', votingRouter);

const userRouteer = require('./routers/user.js');
app.use('/user', userRouteer);

const petitionRouter = require('./routers/petition.js');
app.use('/petition', petitionRouter);

const falsificationRouter = require('./routers/falsification.js');
app.use('/falsification', falsificationRouter);


app.get('/', (req, res) => {
  pool.query('SELECT * FROM votings ORDER BY start_date DESC')
    .then(query => {
      res.json(query.rows);
    })
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

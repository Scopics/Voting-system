'use strict';

const { Pool } = require('pg');
const express = require('express');
const helmet = require('helmet');

const pool = new Pool();

const app = express();

app.use(express.urlencoded())
app.use(express.json());
app.use(helmet());

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get('/', (req, res) => {
    res.json('/');
});
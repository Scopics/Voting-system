'use strict';

const { Pool } = require('pg');
const express = require("express");

const app = express();

const pool = new Pool();

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get('/', (req, res) => {
    res.json('/');
});
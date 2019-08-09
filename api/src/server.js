const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb://localhost/tindev', {
  useNewUrlParser: true
});

server.use(express.json())
server.use(routes);

server.listen(3333);
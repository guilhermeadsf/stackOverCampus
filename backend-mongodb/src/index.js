const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

mongoose.connect(
  'mongodb+srv://guilherme:pZeB8XSZovy0AKE0@cluster0-twtkw.mongodb.net/stackOverCampus?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333);

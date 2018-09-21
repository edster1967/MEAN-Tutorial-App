const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const app = express();

mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@cluster0-xriam.mongodb.net/test?retryWrites=true')
.then(() => {
  console.log('connected to the database')
}).catch(() => {
  console.log('connection failed')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS,PUT' );
  next();
});

app.use('/api/posts', postRoutes);


 module.exports = app;


const express = require('express');
const bodyPasrser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@cluster0-xriam.mongodb.net/test?retryWrites=true')
.then(() => {
  console.log('connected to the database')
}).catch(() => {
  console.log('connection failed')
});

app.use(bodyPasrser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS' );
  next();
});


app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(createdPost => {
    res.status(201).json({
      message:'Post added successfully',
      postId: createdPost._id
    });

  });


});

app.get('/api/posts',(req, res, next) =>{
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message:'post sent successfully',
      posts: documents
    });
  });

app.delete('/api/posts/:id',(req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  });

})

 });

 module.exports = app;


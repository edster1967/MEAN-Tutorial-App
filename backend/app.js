const express = require('express');
const bodyPasrser = require('body-parser');
const app = express();

app.use(bodyPasrser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS' );
  next();
});


app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({message:'Post added successfully'});

});

app.use('/api/posts',(req, res, next) =>{
  console.log('entering the posts part');
  const posts = [
    {id: '1233', title:'ServerSide1',content:'this is server side one content'},
    {id: '1233xsa', title:'ServerSide2',content:'this is server side two content'}
  ];
  console.log('yep loaded this right');
  res.status(200).json({
    message:'post sent successfully',
    posts: posts
  });

 });

 module.exports = app;

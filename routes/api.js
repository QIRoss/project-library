/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const mongoose = require('mongoose');

module.exports = (app) => {

  mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

  const titleSchema = new mongoose.Schema({
    title: String,
    comments: [String],
    commentcount: Number
  });

  const Title = mongoose.model('Title', titleSchema);

  app.route('/api/books')
    .get((req, res) => {

      Title.find({}, (err, data) => {
        res.json(data);
      });
    })
    
    .post((req, res) => {

      if(!req.body.title){
        res.send('missing required field title');
        return
      }

      const title = new Title({
        title: req.body.title,
        commentcount: 0
      });

      title.save((err,data) => 
        res.json(data)
      );
    })
    
    .delete((req, res) => {
      Title.deleteMany({}, (err) => 
          res.send('complete delete successful')
      )
    });



  app.route('/api/books/:id')
    .get( (req, res) => {
      const bookid = req.params.id;

      Title.findById(bookid, (err,data) => 
        !data ?   
          res.send('no book exists')
        :         
          res.json(data)
      )
    })
    
    .post((req, res) => {
      const bookid = req.params.id;
      const comment = req.body.comment;

      if(!comment){
        res.send('missing required field comment');
        return;
      }

      Title.findByIdAndUpdate({_id: bookid},{$push: {comments: comment}, $inc: {commentcount: 1}},{useFindAndModify: false, new: true},  (err,data) => 
        !data ?
          res.send('no book exists')
        :
          res.json(data)
      )

    })
    
    .delete((req, res) => {
      let bookid = req.params.id;
      Title.findByIdAndDelete(bookid, (err, data) => {
        ! data ?  res.send('no book exists')
        :         res.send('delete successful')
      })
    });
  
};

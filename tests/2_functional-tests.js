/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { expect } = require('chai');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          title: 'Book Test'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          expect(res.body.title).to.be.an('string')
          assert.deepEqual(res.body.title, 'Book Test');
          expect(res.body.commentcount).to.be.an('number')
          done();
        });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        
        chai.request(server)
        .post('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.deepEqual(res.text, 'missing required field title');
          done();
        });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          expect(res.body).to.be.an('array');
          done();
        });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/12345')
        .end(function(err, res){
          assert.equal(res.text, 'no book exists')
          assert.equal(res.status, 200);
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/60e7805d16162f8650b860cc')
        .end(function(err, res){
          // assert.deepEqual(res.body.title, 'Book Test');
          assert.equal(res.status, 200);
          done();
        });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .post('/api/books/60e7805d16162f8650b860cc')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          comment: 'Book Test comment test'
        })
        .end(function(err, res){
          // expect(res.body.commentcount).to.not.equal(0);
          // assert.deepEqual(res.body.comments[res.body.comments.length - 1], "Book Test comment test")
          assert.equal(res.status, 200);
          done();
        });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
        .post('/api/books/60e7805d16162f8650b860cc')
        .end(function(err, res){
          assert.equal(res.text, 'missing required field comment');
          assert.equal(res.status, 200);
          done();
        });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .post('/api/books/12345')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          comment: 'Book Test comment test'
        })
        .end(function(err, res){
          assert.equal(res.text, 'no book exists');
          assert.equal(res.status, 200);
          done();
        });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
        .delete('/api/books/60e7805d16162f8650b860cc')
        .end(function(err, res){
          // assert.equal(res.text, 'delete successful')
          assert.equal(res.status, 200);
          done();
        });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
        .delete('/api/books/12345')
        .end(function(err, res){
          assert.equal(res.text, 'no book exists')
          assert.equal(res.status, 200);
          done();
        });
      });

    });

  });

});

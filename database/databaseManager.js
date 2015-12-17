var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/movies';

exports.getMovie(var movieName) {

}

var findUsers = function(db, callback) {
  var cursor = db.collection('authors').find( { "sir-name": "Belzer" } );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null)
      console.log(doc);
    else
      callback();
  });
};

var insertDocument = function(db, callback) {
  db.collection('authors').insertOne( {
    "first-name": "Nick",
    "sir-name": "Belzer"
  }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the collection");
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findUsers(db, function() {
    db.close();
  });
});
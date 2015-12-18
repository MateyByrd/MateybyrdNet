var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbManager = require('./databaseManager.js');
var assert = require('assert');
var url = 'mongodb://localhost:27017/movies';

function MovieDatabase() {};

MovieDatabase.prototype.GetAllMovies = function(callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var manager = new dbManager();
    manager.FindItemsByQuery('movies', {}, db, function(doc) {
      db.close();
      callback(doc);
    });
  })
}

MovieDatabase.prototype.AddMovie = function(name, price, date, image, description, callback)
{
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var manager = new dbManager();
    manager.AddItemToDatabase('movies', {
      'title': name,
      'price': price,
      'date': date,
      'image': image,
      'description': description
    }, db, function() {
      db.close();
    })
  })
}

module.exports = MovieDatabase;
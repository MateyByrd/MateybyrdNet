var MongoClient = require('mongodb').MongoClient;
var dbManager = require('./databaseManager.js');

var assert = require('assert');
var url = 'mongodb://localhost:27017/movies';

/**
 * Constructor method
 * @constructor Costructor of a MovieDatabase class
 */
function MovieDatabase() {};

/**
 * GetAllMovies
 * Returns all the movies that are stored in the database.
 * @param callback Returns the results and could performs an action after we are done searching the items
 */
MovieDatabase.prototype.GetAllMovies = function(callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var manager = new dbManager();
    manager.FindItemsByQuery('movies', {}, { "date": 1 }, db, function(doc) {
      db.close();
      callback(doc);
    });
  });
}

/**
 * GetMovie
 * Returns a movie(s) depending on the query
 * @param query The query to look for in the database
 * @param callback Returns the movie and could perform an action after the search is done.
 * @constructor
 */
MovieDatabase.prototype.GetMovie = function(query, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var manager = new dbManager();
    manager.FindItemsByQuery('movies', query, {}, db, function(doc) {
      db.close();
      callback(doc);
    })
  });
}

/**
 * AddMovie
 * Method used to add a movie to the database
 * @param name The name of the movie
 * @param price The price that people have to pay for the movie
 * @param date The date and time we are going to the movie
 * @param image The cover image used to display the movie on the movies page
 * @param description Description of the movie, can contain any information about why or how we are going to this movie or just what the movie is about.
 * @param callback What action to perform after done adding in the movie.
 */
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
    });
  });
}

module.exports = MovieDatabase;
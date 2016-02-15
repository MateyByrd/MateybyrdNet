var assert = require('assert');

function DatabaseManager() {};

/**
 * AddItemToDatabase
 * This function allows you to add data to a database
 * @param collection The collection that the data should be placed in
 * @param data The data you want to store
 * @param db The database to store the data in
 * @param callback A function that will be called when all actions are done
 * @constructor
 */
DatabaseManager.prototype.AddItemToDatabase = function(collection, data, db, callback) {
  db.collection(collection).insertOne(data, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted data");
    callback();
  });
}

/**
 * EditItem
 * @param collection The collection which contains the data you want to change
 * @param item The expressions which will give us the item you want to change
 * @param changedData The data you want to change on this item
 * @param db The database where we are changing in
 * @param callback A function that will be called when all actions are done
 * @constructor
 */
DatabaseManager.prototype.EditItem = function(collection, item, changedData, db, callback) {
  db.collection(collection).updateOne(
    item,
    changedData,
    function(err, result) {
      assert.equal(err, null);
      callback(result);
    }
  );
}

/**
 * FindItemByQuery
 * A general function to find an item in a database
 * @param collection The collection that you want to search
 * @param query The query to execute
 * @param sorting Way of sorting the items that are returned
 * @param db The database to work in
 * @param callback A function that will be called when all actions are done
 * @constructor
 */
DatabaseManager.prototype.FindItemsByQuery = function(collection, query, sorting, db, callback) {
    var collection = db.collection(collection);

    collection.find(query).sort(sorting).toArray(function (err, docs) {
      if (err) throw err;
      callback(docs);;
    });
}

module.exports = DatabaseManager;
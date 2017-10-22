var Datastore = require('nedb');
var db = new Datastore({
  filename: 'goals.db', // Provide a path to the database file.
  autoload: true, // Automatically load the database.
  timestampData: true // Add and manage the fields createdAt and updatedAt.
});

module.exports = db;

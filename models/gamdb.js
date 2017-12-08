var Datastore = require('nedb');
var db = new Datastore({
  filename: 'gamedb.db', // Provide a path to the database file.
  autoload: true, // Automatically load the database.
  timestampData: true // Add and manage the fields createdAt and updatedAt.
});
db.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 30 }, function (err) {
});
module.exports = db;

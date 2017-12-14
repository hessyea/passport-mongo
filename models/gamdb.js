var Datastore = require('nedb');
var db = new Datastore({
  filename: 'gamedb.db', // Provide a path to the database file.
  autoload: true, // Automatically load the database.
  timestampData: true // Add and manage the fields createdAt and updatedAt.
});
db.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 600 }, function (err) {
});
db.ensureIndex({ fieldName: 'timeout', expireAfterSeconds: 5 }, function (err) {
});
db.ensureIndex({ fieldName: 'p1cin', expireAfterSeconds: 4 }, function (err) {

});
db.ensureIndex({ fieldName: 'p2cin', expireAfterSeconds: 4 }, function (err) {

});
module.exports = db;

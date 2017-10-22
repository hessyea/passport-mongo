

var Datastore = require('nedb');
var db = new Datastore({
  filename: 'goals.db', // Provide a path to the database file.
  autoload: true, // Automatically load the database.
  timestampData: true // Add and manage the fields createdAt and updatedAt.
});


var doc = {      username: ''
               , password: ''
               , email: ''
               , firstName: ''
               , lastName: ''
               };
module.exports = db.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});

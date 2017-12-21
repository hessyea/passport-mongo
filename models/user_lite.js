var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB,{useMongoClient: true},function(err){});
var Schema = mongoose.Schema;
var userschema = new Schema ( {      username: String
               				, password: String
               				, email: String
               				});

var user22 = mongoose.model('users', userschema);
var fluffy = new user22({ username: 'fluffy101' });
fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);

});
module.exports = user22;

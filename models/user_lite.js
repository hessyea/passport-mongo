var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB,{useMongoClient: true},function(err){});
var Schema = mongoose.Schema;
var userschema = new Schema ( {      username: String
               				, password: String
               				, email: String
               				});

var user22 = mongoose.model('users', userschema);

module.exports = user22;

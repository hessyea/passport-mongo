var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB, function(err){
    if(err){
        console.log('database not connected');
    }
});
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

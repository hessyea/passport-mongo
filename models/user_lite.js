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

var user = mongoose.model('users', userschema);
user.insert({username: 'first'}, function(err, doc){});
module.exports = user;

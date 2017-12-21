var db = require('mongo-lite').connect(process.env.PROD_MONGODB);

db.users22 = db.collection('users')
db.users22.insert({title: 'first'}, function(err, doc){})
var exp = db.users22

module.exports = exp;

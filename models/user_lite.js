var db = require('mongo-lite').connect('mongodb://hexia:678u15po@ds161346.mlab.com:61346/mgcs101', ['users']);
db.users.insert({title: 'first'}, function(err, doc){})
var exp = db.users

module.exports = exp;
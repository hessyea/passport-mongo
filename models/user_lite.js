var db = require('mongo-lite').connect('mongodb://hexxua:67u15po@ds161346.mlab.com:61346/mgcs101');


db.users22 = db.collection('users')
db.users22.insert({title: 'first'}, function(err, doc){})
var exp = db.users22

module.exports = exp;

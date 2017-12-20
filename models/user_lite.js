var db = require('mongo-lite').connect('mongodb://hexia:678u15po@ds161346.mlab.com:61346/mgcs101', ['users', 'comments']);
var db = db.users

module.exports = db;

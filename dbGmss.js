
var gambd = require('../models/gamdb');



module.exports = function(req) {

	var doc = {			username: req.body.gmName
               				, password: req.body.password
               			};
				gambd.insert(doc, function (err, newDoc) {
				if (err){
                                	console.log('Error in Saving user: '+err);
                                	throw err;
				}
				console.log('Game succesfully Cer8');
				return done(null,newDoc);
				})};


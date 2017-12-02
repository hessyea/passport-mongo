
var Gambd = require('../models/gamdb');


module.exports = function(req, res) {

	var doc = {			username: req.param('gmName')
               				, password: createHash(req.param("password"))
               			};
				Gambd.insert(doc, function (err, newDoc) {
				if (err){
                                	console.log('Error in Saving user: '+err);
                                	throw err;
				}
				console.log('Game succesfully Cer8');
				return done(null,newDoc);
				});


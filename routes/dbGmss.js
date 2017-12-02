
var gambd = require('../models/gamdb');


module.exports = function(req) {

	var doc = {			gnme: req.body.gmName
               				, password: req.body.password
               			};
				gambd.insert(doc, function (err, newDoc) {
				if (err){
                                	console.log('Error in Saving user: '+err);
                                	throw err;
				} else {
					return newDoc;
				}
				console.log('Game succesfully Cer8');
				})};


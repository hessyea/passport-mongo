
var gambd = require('../models/gamdb');
var evilGlob

module.exports = function(req) {

				var doc = {			
					gnme: req.body.gmName
               				, password: req.body.password
               			};
				gambd.insert(doc,function (err, newDoc) {
				if (err){
                                	console.log('Error in Saving game: '+err);
                                	throw err;
				}
				
				console.log('Game succesfully Cer8' + newDoc[0]);
					evilGlob =  newDoc[0];

				})
					//gambd.find(req.body.gmName,function (err, docs) {
					
					//}
					//return gambd.find({ gnme: req.body.gmName })
  					//.exec(function(err, result) {
    					//	if (err) {
        				//		return err;
    					//	} else {
        				//		return result;
    					//	}
					//});
					return evilGlob;

				};


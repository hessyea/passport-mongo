
module.exports = function(req) {

				var doc = {			
					gnme: req.body.gmName
               				, password: req.body.password
               			};
				return doc;

				};


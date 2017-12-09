
module.exports = function(req) {

				var doc = {
					gnme: req.body.gmName
               				, password: req.body.password
					, gmeStatus: req.body.gmeStatus
					, syncTime: req.body.syncTime
					, p1Name: req.body.p1Name
					, p2Name: req.body.p2Name
					, myxY: req.body.myxY
					, lookingFP: req.body.lf

               			};
				return doc;

				};

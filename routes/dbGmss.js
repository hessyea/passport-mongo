
module.exports = function(req) {

				var doc = {
					gnme: req.body.gmName
               				, password: req.body.password
					, gmeStatus: req.body.gmeStatus
					, syncTime: req.body.syncTime
					, p1Name: req.body.p1Name
					, p2Name: req.body.p2Name
					, curryPos: req.body.curryPos
					, shotXY: req.body.shotXY
					, st2nd: req.body.st2nd
					,mpp: req.body.mapID

               			};
				return doc;

				};


module.exports = function(docsSelf,docsOther) {

				var doc = {
            gmeStatus: "starting"
					, syncTime: ""
					, p1Name: docsSelf.p1Name
					, p2Name: docsOther.p1Name
					, p1Stat: ""
					, p2Stat: ""
					, curryPos: ""
					, shotXY1: docsSelf.myxY
					, shotXY2: docsOther.myxY
					, winner: ""
					, mppP1: ""
					, mppP2: ""

               			};
				return doc;

				};

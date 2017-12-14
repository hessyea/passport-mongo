
module.exports = function(docsSelf,docsOther,date22) {

				var doc = {
            gmeStatus: "starting"
					, syncTime: ""
					, p1Name: docsSelf.p1Name
					, p2Name: docsOther._id
					, p1Stat: ""
					, p2Stat: ""
					, p1cin: date22
					, p2cin: date22
					, curryPos: ""
					, shotXY1: docsSelf.myxY
					, shotXY2: docsOther.myxY
					, winner: ""
					, mppP1: ""
					, mppP2: ""
					, mppP3: ""

               			};
				return doc;

				};

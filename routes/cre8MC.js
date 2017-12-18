
module.exports = function(docsSelf,docsOther,date22) {

				var doc = {
            gmeStatus: "starting"
					, syncTime: ""
					, p1Name: docsSelf.p1Name
					, p2Name: docsOther.p1Name
					, p1Stat: ""
					, p2Stat: ""
					, indMe: docsOther._id
					, p1cin: date22
					, p2cin: date22
					, curryPos: ""
					, shotXY1: docsSelf.myxY
					, shotXY2: docsOther.myxY
					, shotXY3: ""
					, winner: ""
					, mppP1: ""
					, mppP2: ""
					, mppP3: ""
					, mppP3Stat: ""

               			};
				return doc;

				};

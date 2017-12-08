
module.exports = function(field,val) {

				var a = {};
				var dthird = "$set";
				var firstTerm = field;
				var secondTerm = val;
				a[dthird] = {};
				a[dthird][firstTerm] = secondTerm;
				return a;

				};

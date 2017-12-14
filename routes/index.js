var express = require('express');
var router = express.Router();
var gamdb33 = require('../models/gamdb');
var cregmJS = require('./dbGmss.js');
var createMtchSC = require('./cre8MC.js');
var setVal = require('./setMe.js');
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* GET Games Page */
	router.get('/game', isAuthenticated, function(req, res){

		var x = null;
			gamdb33.find({ }, function (err, docs) {
  			x = docs;
			res.render('gmsess', { user: x});
		});

	});

	/* Handle GameStart POST */
	router.post('/cr8gm',isAuthenticated , function (req, res) {

	res.setHeader('Content-Type', 'application/json');
	gamdb33.insert(cregmJS(req,new Date()),function (err, newDoc) {
		res.send(newDoc._id);
	});

	//JSON.stringify(cregmJS(req))
	}
	);


		/* Handle GameStart POST */
	router.post('/showgme',isAuthenticated , function (req, res) {
			var x = null;
			gamdb33.findOne({_id: req.body.pName}, function (err, docs) {
				//res.render('gmess1', { gmedtta: x, idGot: req.body.id});

				if (docs){
				var doc = {
						gmeStatus: docs.gmeStatus
					, syncTime: docs.syncTime
					, p1Name: docs.p1Name
					, p2Name: docs.p2Name
					, p1Stat: docs.p1Stat
					, p2Stat: docs.p2Stat
					, curryPos: docs.curryPos
					, shotXY1: docs.shotXY1
					, shotXY2: docs.shotXY2
					, winner: docs.winner

										};
				res.send(JSON.stringify(doc));
			}
			else{
				res.send("gameNotFound");
			}
		});

	}
	);


	router.post('/recMap',isAuthenticated , function (req, res) {
			gamdb33.findOne({_id: req.body.mGId}, function (err, docs) {
				//res.render('gmess1', { gmedtta: x, idGot: req.body.id});
				console.log(req.body.mpNr);
				if(docs != null){if(req.body.mpNr == "1" ||req.body.mpNr == "2" ){
						if(req.body.mpName == "2"){
							res.send(docs.mppP1);
							console.log("+++-----");
					  }
						else if (req.body.mpName == "1") {
							console.log("-------+++");
							res.send(docs.mppP2);
						}
					}
				else{
					res.send(docs.mppP3);
				}
			} else {
				console.log("ERR++++");
			}
				});

	}
	);

	router.post('/sndMap',isAuthenticated , function (req, res) {

	console.log("sndMap++"+" "+req.body.pmNR);
	gamdb33.update({ _id: req.body.gID },setVal(req.body.pmNR,req.body.maP),
			{ multi: false },
			function (err, numReplaced) {
				console.log(err+" nr "+numReplaced+"iiiii"+req.body.gID)
					res.send("ok");
			});
	});

		/* Handle Game POST */
	router.post('/updtGme',isAuthenticated , function (req, res) {
			var a = {};
			var dthird = "$set";
			var firstTerm = req.body.field;
			var secondTerm = req.body.val;
			a[dthird] = {};
			a[dthird][firstTerm] = secondTerm;
			gamdb33.update({ _id: req.body.id },a,
				{ multi: false },
				function (err, numReplaced) {
				//res.render('gmess1', { gmedtta: x, idGot: req.body.id});
				res.send(numReplaced.toString());
		});

	}
	);


	router.post('/checkin',isAuthenticated , function (req, res) {
		var pupdte;
		if(req.body.pNr=="1"){
				pupdte = setVal("p1cin",new Date());
		}

		else if(req.body.pNr=="2"){
				pupdte = setVal("p2cin",new Date());
		}
			gamdb33.update({ _id: req.body.mGId },pupdte,
				{ multi: false },
				function (err, numReplaced) {

				});
				res.send(req.body.pNr);
	}
	);
	/* Match GameStart POST */
	router.post('/autoMatch',isAuthenticated , function (req, res) {
		gamdb33.findOne({p2Name: req.body._id}, function (err, docsMyGame) {
			//res.render('gmess1', { gmedtta: x, idGot: req.body.id});
			console.log("docsMyGame-------");
			if(docsMyGame == null){
				console.log("notNull-------");
				gamdb33.find({lookingFP: { $exists: true }, lookingFP: 'true' , $not: { _id: req.body._id }}).sort({ createdAt: -1 }).exec(function (err, docsOther) {
					console.log(docsOther+"-------");
					if(docsOther[0]){
						console.log(docsOther+"---!= null");
						gamdb33.findOne({_id: req.body._id}, function (err, docsSelf) {
							gamdb33.insert(createMtchSC(docsSelf,docsOther[0],new Date()),function (err, newDoc) {
								gamdb33.update({ _id: req.body._id },setVal("lookingFP","false"),
									{ multi: false },
									function (err, numReplaced) {

									});
								gamdb33.update({ _id: docsOther[0]._id },setVal("lookingFP","false"),
										{ multi: false },
										function (err, numReplaced) {

										});
									//res.render('gmess1', { gmedtta: x, idGot: req.body.id});
								console.log("d!= null")
								res.send(newDoc._id+";1");
							});

								});
							} else {

								gamdb33.update({ _id: req.body._id },setVal("timeout",new Date()),
										{ multi: false },
										function (err, numReplaced) {

										});

								res.send("Wait5");
							}
							});
			} else {

				res.send(docsMyGame._id+";2");

			}


	  // docs is [doc3, doc1]


	});
});


	/* Match GameStart POST */
	router.post('/matchMe',isAuthenticated , function (req, res) {

	res.setHeader('Content-Type', 'application/json');
	gamdb33.findOne({ p1Name: req.body.pName},function (err, newDoc) {
		if(err){
			res.send("null");
		} else{
			res.send(newDoc._id);
		}
	})
	});
	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
return router;
}

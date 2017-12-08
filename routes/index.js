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
	gamdb33.insert(cregmJS(req),function (err, newDoc) {
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
				res.send(JSON.stringify(docs));
		});

	}
	);


	router.post('/recMap',isAuthenticated , function (req, res) {
			gamdb33.findOne({_id: req.body.mpName}, function (err, docs) {
				//res.render('gmess1', { gmedtta: x, idGot: req.body.id});
				console.log(docs.map22+"-------");
				res.send(docs.map22);

				});

	}
	);

	router.post('/sndMap',isAuthenticated , function (req, res) {

	res.setHeader('Content-Type', 'application/json');
	var map = {map22: req.body.maP};
	console.log(req.body.maP);
		gamdb33.insert(map,function (err, newDoc) {
			res.send(newDoc._id);
		})
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

	/* Match GameStart POST */
	router.post('/autoMatch',isAuthenticated , function (req, res) {
		gamdb33.findOne({p2Name: req.body.myID}, function (err, docsMyGame) {
			//res.render('gmess1', { gmedtta: x, idGot: req.body.id});
			//console.log(docsMyGame._id+"-------");
			if(docsMyGame == null){

				gamdb33.find({$and:[{lookingFP: { $exists: true }}, { lookingFP: 'true' }, {$not: { _id: req.body._id }}]}).sort({ createdAt: -1 }).exec(function (err, docsOther) {
					if(docsOther != null){
						gamdb33.findOne({_id: req.body._id}, function (err, docsSelf) {
							gamdb33.insert(createMtchSC(docsSelf,docsOther),function (err, newDoc) {
								gamdb33.update({ _id: req.body._id },setVal("lookingFP","false"),
									{ multi: false },
									function (err, numReplaced) {

									});
								gamdb33.update({ _id: docsOther[0]._id },setVal("lookingFP","false"),
										{ multi: false },
										function (err, numReplaced) {

										});
									//res.render('gmess1', { gmedtta: x, idGot: req.body.id});

								res.send(newDoc._id+" Name: "+docsOther[0].p1Name);
							});

								});
							} else {

								res.send("Wait5")
							}
							});
			} else {

				res.send(docsMyGame._id+" Name: "+docsMyGame.p2Name);

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

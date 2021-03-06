var LocalStrategy   = require('passport-local').Strategy;
var mongoose = require('mongoose');




var bCrypt = require('bcrypt-nodejs');
var users44 = mongoose.model('users44');


module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                users44.findOne({ 'username' :  req.param('username') }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
												var doc = new users44({      username: req.param('username')
               				, password: createHash(req.param("password"))
               				, email: req.param('email')
										});

										doc.save(function (err, fluffy) {
										  if (err) return console.error(err);
											console.log('User Registration succesful');
											return done(null, fluffy);
										});




                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}

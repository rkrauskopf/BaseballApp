
var authUtils = require('../utils/authUtils.js');

module.exports = function(router, passport) {

    router.use(function(req, res, next) {
        //do logging
        console.log('Something is happening');
        next(); // make sure we go to the next routes and don't stop there
    });



    router.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });



    /*
    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    */

    // process the login form

    /*
    router.post('/signin/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/' // redirect back to the signup page if there is an error
        //failureFlash : true // allow flash messages
    }));
    */

    /*
        router.post('/signin/login', passport.authenticate('local-login',
            //Error Handler
            function(req, res) {
                console.log('made it to the error Handler');
                //res.redirect('/profile');
                res.json({message:"Error Login!"});
            }),

            //Successful Handler
            function(req, res) {
                console.log('made it to the success handler');
                //res.redirect('/profile');
                res.json({message:"Successful Login!"});
            }
        );
    */
    router.post('/test/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.send('401', 'Failed login!');
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send('200', 'Successful Login!');
            });
        })(req, res, next);
    });
    /*
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    */
    // process the signup form
    /*
    router.post('/test/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    */

    router.post('/test/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.send('406', 'User already exists');
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send('201', 'User Created');
            });
        })(req, res, next);
    });
    /*
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile', authUtils.isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/videoUpload', function(req, res, next) {
        //use req.user.id to get the logged in User's id
        res.render('videoUpload.ejs');
    });

    router.get('orderUpload', function(req, res) {
       res.render('orderUpload.ejs');
    });
    */

}
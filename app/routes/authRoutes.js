module.exports = function(router, passport) {

    //// =====================================
    // LOCAL USER SIGNUP =====================
    // =====================================

    router.post('/auth/customerSignup', function(req, res, next) {
        passport.authenticate('local-user-signup', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.send('406', 'User already exists');
            }

            return res.send('201', 'Customer Created');

        })(req, res, next);
    });

    //// =====================================
    // LOCAL TRAINER SIGNUP =====================
    // =====================================

    router.post('/auth/trainerSignup', function(req, res, next) {
        passport.authenticate('local-trainer-signup', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.send('406', 'Trainer already exists');
            }

            return res.send('201', 'Trainer Created');

        })(req, res, next);
    });
    //// =====================================
    // LOCAL LOGIN =====================
    // =====================================

    router.post('/auth/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                return res.send('401', 'Failed login!');
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                //return res.send('200', 'Successful Login!');
                return res.json({userType: user._doc.local.userType})
            });
        })(req, res, next);
    });

    //// =====================================
    // SIGN OUT ROUTES =====================
    // =====================================

    router.get('/auth/logout', function (req, res) {
        req.logout();
        res.send('200', 'User logged out');
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    /*
     router.get('/auth/facebook/callback',
     passport.authenticate('facebook', function(err, user, info){
     if(err) {return next(err);}

     res.send('200', 'Successful login!');
     }));
     */
    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    router.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    router.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    /*
     router.get('/auth/google/callback',
     passport.authenticate('google', {
     successRedirect : '/profile',
     failureRedirect : '/'
     }));
     */
    router.get('/auth/google/callback', function (req, res, next) {
        passport.authenticate('google', function (err, user, info) {
            if(err) {return next(err); }

            return res.send('200', 'Successful Login!');

        })(req, res, next);
    });
}
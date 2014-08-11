module.exports = function(router, passport) {

    router.use(function(req, res, next) {
        //do logging
        console.log('Something is happening');
        next(); // make sure we go to the next routes and don't stop there
    });

    router.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

}
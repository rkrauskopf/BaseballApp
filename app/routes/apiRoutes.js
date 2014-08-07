var User = require('../models/user.js');
var Video = require('../models/video.js');
var Order = require('../models/order.js');

var multiparty = require('multiparty');

var MongoClient = require('mongodb').MongoClient;

var mongodb = require('mongodb');

var dbConfig = require('../../config/database.js');

var mongoDBConnectString = 'mongodb://localhost/apiDB';

module.exports = function(router, passport) {
    router.route('/api/videos')

        // create a video (accessed at POST http://localhost:8080/api/videos)
        .post(function(req, res) {

            MongoClient.connect(dbConfig.url, function(err, db) {

                var form = new multiparty.Form({maxFieldsSize: "30MB"});
                form.parse(req, function(err, fields, files) {
                    //video.name = fields.name[0];
                    if(err) {
                        res.send(err);
                    }

                    var fileContentType = files.fileBinary[0].headers['content-type'];
                    var gs = new mongodb.GridStore(db, fields.name[0], 'w', {
                        'content_type': fileContentType
                    });

                    gs.writeFile(files.fileBinary[0].path, function(err, gs) {
                        //This is where we can get access to the file ID that was returned.
                        //This can be used to save add a video to a user's VideoID repository
                        gs.currentChunk.file.fileId.toString();
                        res.send("Success");
                    });

                });
            });
        })
        // get all the videos (accessed at GET http://localhost:8080/api/bears)
        .get(function(req, res) {

            MongoClient.connect(dbConfig.url, function(err, db) {

                //video.name = fields.name[0];
                var gs = new mongodb.GridStore(db);

                gs.read([261120], function(err, gs) {
                    res.send("Success");0
                });

            });
        });

    router.route('/api/videos/:video_id')

        // get the video with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function(req, res) {

            var videoID = req.params.video_id;
            MongoClient.connect(dbConfig.url, function(err, db) {

                //video.name = fields.name[0];
                var gs = new mongodb.GridStore(db, mongodb.ObjectID(videoID), 'r');

                gs.open(function(err, gs) {
                    // Set the pointer of the read head to the start of the gridstored file
                    gs.seek(0, function() {
                        // Read the entire file

                        gs.read(function(err, data) {
                            // Compare the file content against the orgiinal
                            res.set({'Content-Type': gs.contentType});
                            res.send(data);

                            //db.close();
                        });
                    });
                });

            });
        })
        .put(function(req, res) {

            // use our video model to find the bear we want
            Video.findById(req.params.video_id, function(err, video) {

                if (err)
                    res.send(err);

                video.name = req.video.name; 	// update the bears info

                // save the bear
                video.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Video updated!' });
                });

            });
        })
        // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
        .delete(function(req, res) {
            Video.remove({
                _id: req.params.video_id
            }, function(err, video) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    router.route('/api/orders')

        // create a order (accessed at POST http://localhost:8080/api/orders)
        .post(function(req, res) {

            var order = new Order(); 		// create a new instance of the Bear model
            order.name = req.body.name;  // set the bears name (comes from the request)
            order.originalVideoId = req.body.originalVideoId;
            order.isEvaluated = req.body.isEvaluated;
            order.isPayed = req.body.isPayed;

            // save the video and check for errors
            if(order.isPayed !== undefined) {
                order.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Order created!' });
                });
            }
            else {
                res.json({message: 'Order not created! '});
            }

        })
        // get all the videos (accessed at GET http://localhost:8080/api/bears)
        .get(function(req, res) {
            Order.find(function(err, orders) {
                if (err)
                    res.send(err);

                res.json(orders);
            });
        });

    router.route('/api/orders/:order_id')

        // get the video with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
            .get(function(req, res) {
            Order.findById(req.params.video_id, function(err, video) {
                if (err)
                    res.send(err);
                res.json(video);
            });
        })
        .put(function(req, res) {

            // use our video model to find the bear we want
            Order.findById(req.params.order_id, function(err, video) {

                if (err)
                    res.send(err);

                order.name = req.order.name; 	// update the bears info

                // save the bear
                order.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Order updated!' });
                });

            });
        })
        // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
        .delete(function(req, res) {
            Order.remove({
                _id: req.params.order_id
            }, function(err, video) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });
}
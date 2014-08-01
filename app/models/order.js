// app/models/order.js

var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;

var OrderSchema   = new Schema({
	name: String,
	originalVideoId: Schema.Types.ObjectId,
	evaluatedVideoId: Schema.Types.ObjectId,
	ownerID:  Schema.Types.ObjectId, 	//The customer that owns the video
	assignedTo: Schema.Types.ObjectId, 	//The Trainer that is assigned to evaluating the video
	isEvaluated: Boolean, 	//Has the video been evaluated?
	isPayed: Boolean //Has the evaluated video been payed for?
});

module.exports = mongoose.model('Order', OrderSchema);
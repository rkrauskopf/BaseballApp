// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var UserSchema   = new Schema({
	//userName: String,
	//saltedPassword: String, 	//hashed password
	//videos:[Schema.Types.ObjectId],	//Videos associated with this user
	//email: String

    local            : {
        email        : String,
        password     : String,
        userType     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        userType     : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String,
        userType     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        userType     : String
    }

});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
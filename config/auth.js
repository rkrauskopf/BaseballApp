// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID' 		: '316472985194920', // your App ID
        'clientSecret' 	: '950011b49df2f3bb78b4fa6d285b9e82', // your App Secret
        'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey' 		: 'UPSgGqLFUVORv2NF1KR9KJ3y8',
        'consumerSecret' 	: 'WcRw6aeNW6LuY3Wz5ZGrjVK6dG62WdM1enozjOLOZ4s3f5MhS2',
        'callbackURL' 		: 'http://127.0.0.1:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID' 		: '414763570678-0snmisvt9jpqpapjj8rlri0rlmuo4mf8.apps.googleusercontent.com',
        'clientSecret' 	: 'UtRAah28XMsL0PTLmoIO6kzs',
        'callbackURL' 	: 'http://127.0.0.1:8080/auth/google/callback'
    }

};
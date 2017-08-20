/*
 * @author ohmed
 * Router
*/

var express = require('express');
var _       = require('lodash');
var config  = require('./config');
var jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

var users = [{
    id: 1,
    username: 'gonto',
    password: 'gonto'
}];

//

function createToken ( user ) {

    return jwt.sign( _.omit( user, 'password' ), config.secret, { expiresInMinutes: 60 * 5 } );

};

function getUserScheme ( req ) {
  
    var username;
    var type;
    var userSearch = {};

    if ( req.body.username ) {

        username = req.body.username;
        type = 'username';
        userSearch = { username: username };

    } else if ( req.body.email ) {

        username = req.body.email;
        type = 'email';
        userSearch = { email: username };

    }

    return {
        username: username,
        type: type,
        userSearch: userSearch
    };

};

app.post('/api/users', function ( req, res ) {

    var userScheme = getUserScheme( req );  

    if ( ! userScheme.username || ! req.body.password ) {

        return res.status( 400 ).send("You must send the username and the password");

    }

    if ( _.find( users, userScheme.userSearch ) ) {

        return res.status( 400 ).send("A user with that username already exists");

    }

    var profile = _.pick( req.body, userScheme.type, 'password', 'extra' );
    profile.id = _.max( users, 'id' ).id + 1;

    users.push( profile );

    res.status( 200 ).send({
        id_token: createToken( profile )
    });

});

app.post('/api/sessions/create', function ( req, res ) {

    var userScheme = getUserScheme( req );

    if ( ! userScheme.username || ! req.body.password ) {

        return res.status( 400 ).send("You must send the username and the password");

    }

    var user = _.find( users, userScheme.userSearch );

    if ( ! user ) {

        return res.status( 401 ).send({message:"The username or password don't match", user: user});

    }

    if ( user.password !== req.body.password ) {

        return res.status( 401 ).send("The username or password don't match");

    }

    res.status( 200 ).send({
        id_token: createToken( user )
    });

});

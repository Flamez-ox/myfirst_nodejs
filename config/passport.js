var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// get user model here email fullname , password, role_id, status_id

// load user model here
const User = require('../models').User

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("JWT");
opts.secretOrKey = process.env.LOGIN_SECRET_TOKEN_VALUE;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net'; // JWT 5643gghsdty767623bhbhwdbjhdghghadsdbjksbjk


module.exports = async (passport) => {
    passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
        User.findByPK(jwt_payload.id)
        .then( (user) => {
            return done(null, user);
        })
        .catch( (error) => {
            return done(error, false)
        });
        
    }))
}


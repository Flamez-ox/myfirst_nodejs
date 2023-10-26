var createError = require('http-errors'); // error handler
var express = require('express'); // framework
var app = express();  // init framework

var path = require('path'); // provide the way of wrking with dir and file
var logger = require('morgan'); // logger use it to log information about http post, get, put, delete etc
var bodyParser = require('body-parser'); // pass body request
var session = require('express-session'); // session for login
var passport = require('passport');// for login authentication
var jwt = require('jsonwebtoken'); // for login
require('./config/passport')(passport) // login configuration

var fileUpload = require('express-fileupload'); // file upload
var helmet = require('helmet'); // securing http request
var cors = require('cors'); // help us to access numerous function on the browser
const env = require('dotenv');
env.config();


// initialize session
app.use(session({
    secret: process.env.LOGIN_SECRET_TOKEN_VALUE,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: true,
        maxAge: parseInt(process.env.LOGIN_SESSION_TIME)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.use(logger('dev'));

app.use(express.json()); // convert our data to json format

app.use(express.static(path.join(__dirname, 'src/public')));

// is used to set up middleware for parsing incoming HTTP request bodies in an Express.js application using the body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// This line configures the body-parser middleware to parse JSON data in incoming request bodies.
app.use(bodyParser.json());


// convert our url encoding form data from incoming http post
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); // convert our url encoding form data from incoming http post


// is a line of code used to apply the Helmet middleware to an Express.js application. Helmet is a collection of middleware functions that help secure your Express application by setting various HTTP headers
app.use(helmet());

// CORS - Cross-Origin Resource Sharing
app.use(cors());

app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 }, //5mb
}))

//////////start swagger documentation settings ////

////////////end swagger documentation settings ////

// route src/public/document
app.use(express.static('src/public/' + process.env.UPLOAD_PATH));

// swagger route

// application route
app.use('/api', require('./src/api'))

// catch 404 and forward to error handler api/adams
app.use(function (req, res, next) {
    next(createError(404)) // 404 not found
})


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.send(err)
})


console.log("Running on " + process.env.NODE_ENV + " mode...");
console.log("Listening to requests on : http://" + process.env.DEV_HOST + ":" + process.env.PORT);
console.log("Checkout the API Documentation (Swagger) here: http://" + process.env.DEV_HOST + ":" + process.env.PORT + "/api-docs/");
console.log("----------------------------------------------------------------");


module.exports = app;
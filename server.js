const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const category = require('./routes/category');
const item = require('./routes/item');
const user = require('./routes/user');
const connectedDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');


//To read our config values
dotenv.config({path: './config/config.env'})

// connection to DB
connectedDB();

// initialize our express framework
const app = express();

//use the morgan logger for development purposes ONLY
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//read/parse json data
app.use(bodyParser.json())

// parse cookies
app.use(cookieParser());

// file upload middleware
app.use(fileupload());

// sanitize our nosql injections
app.use(mongoSanitize());

// protect from cross site scripting
app.use(xss());

// protect from http parameter pollution
app.use(hpp());

// set up rate limit for 100 req every 10 mins
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // for every 10 mins
    max: 100
})

app.use(limiter);

// security headers
app.use(helmet());

// add cors protection
app.use(cors());

// use our logger
app.use(logger);

//hook up your routes
app.use('/api/v1/category', category)
app.use('/api/v1/item', item)
app.use('/api/v1/user', user)


//handles our errors
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => { 
    console.log(`Server is listening on PORT: ${PORT}`)
})

//process our error and close off our server
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    //kill our server
    server.close(() => process.exit(1))
})
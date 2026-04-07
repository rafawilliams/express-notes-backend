const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const users = require('./routes/users');
const notes = require('./routes/notes');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
// Security Headers
app.use(helmet());

// CORS Config
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { message: "Too many requests from this IP, please try again after 15 minutes." }
});
app.use(limiter);

// Limit Body Size
app.use(express.json({ limit: '10kb' }));

// NoSQL Injection Prevent
app.use(mongoSanitize());

//routes
app.use('/api/users', users);
app.use('/api/notes', notes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

module.exports = app;
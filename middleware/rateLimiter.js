const rateLimit = require('express-rate-limit');

exports.logInLimiter = rateLimit({
    windowMs: 60*1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    //message: "Too many login attempts from this IP, please try again after a minute"
    handler: (req, res, next)=>{
        let err = new Error("Too many login attempts from this IP, please try again after a minute");
        err.status = 429;
        return next(err);
    }
});
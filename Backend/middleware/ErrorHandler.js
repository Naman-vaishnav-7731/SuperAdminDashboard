// handle the error
const Constants = require("../Constants.js")
const ErrorHandler = (err , req , res , next) => {
    const StatusCode = err.statusCode ? err.statusCode : 500;

    switch(StatusCode){
        case Constants?.NOT_FOUND:
            res.json({title:"Not Found" , message: err.message , stackTrace: err.stack})
            break;
        case Constants.VALIDATION_ERROR:
            res.json({title:"Validation Error" , message: err.message , stackTrace: err.stack})
            break;
        case Constants.UNAUTORIALIZED:
            res.json({title:"Unauthorized", message: err.message, stackTrace: err.stack})
        case Constants.FORBIDDEN:
            res.json({title:"Forbidden", message: err.message, stackTrace: err.stack})
        case Constants.INTERNAL_SERVER_ERROR:
            res.json({title:"Internal Server Error", message: err.message, stackTrace: err.stack})
        default:
            console.log("no Error")
    }
};

module.exports = ErrorHandler;
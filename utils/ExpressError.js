class ExpressError extends Error {
    constructor(statusCode = 500, message = "Internal Server Error") {
        super(message); // Pass the message to the parent Error class
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? (typeof err.stack === 'string' ? err.stack.split('\n').map(line => line.trim()) : []) : {},
    });
}

module.exports = errorHandler;
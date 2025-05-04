const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        return handleDevelopmentError(err, res);
    }
    else {
        return handleProductionError(err, res);
    }
}

// In development, we want to expose the error stack trace
const handleDevelopmentError = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack ? err.stack.split('\n').map(line => line.trim()) : []
    });
}

// In production, we don't want to expose the error stack trace
const handleProductionError = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

module.exports = errorHandler;
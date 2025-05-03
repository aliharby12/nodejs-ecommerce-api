class ApiErrorHandler extends Error {
    /**
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code.
      */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

module.exports = ApiErrorHandler;
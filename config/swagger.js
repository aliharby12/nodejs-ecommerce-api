const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Node.js E-commerce API',
        version: '1.0.0',
        description: 'API documentation for the Node.js E-commerce application',
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Optional, but indicates the token format
            },
        },
    },
    security: [
        {
            bearerAuth: [], // Apply this globally to all endpoints
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
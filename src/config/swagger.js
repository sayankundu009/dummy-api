const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dummy API",
            version: "0.1.0",
        },
    },
    apis: ['./src/routes/**/*.js'],
};

module.exports = swaggerJsdoc(options);
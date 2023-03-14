const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Management APIs',
      version: '1.0.0',
      description: 'APIs for managing orders',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/orders',
      },
    ],
  },
  apis: ['./src/Routes/*.routes.js'], // Replace with the path to your API route files
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
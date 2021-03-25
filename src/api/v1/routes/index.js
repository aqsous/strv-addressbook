/* eslint-disable import/no-dynamic-require */
const express = require('express');
const fs = require('fs');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { serverUrl } = require('../../../config/vars');

const router = express.Router();

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    if (fs.lstatSync(`${__dirname}/${file}`).isDirectory()) {
      if (fs.existsSync(`${__dirname}/${file}/index.js`)) {
        // eslint-disable-next-line global-require
        router.use(`/${file}`, require(`./${file}`));
      }
    } else if (fs.lstatSync(`${__dirname}/${file}`).isFile()) {
      if (file.endsWith(('.route.js'))) {
        const routerPath = file.replace('.route.js', '');
        // eslint-disable-next-line global-require
        router.use(`/${routerPath}`, require(`./${routerPath}.route`));
      }
    }
  });

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  explorer: true,
  swaggerDefinition: {
    openapi: '3.0.1',
    servers: [
      {
        url: `${serverUrl}/api/v1`,
      },
    ],
    info: {
      title: 'Freelancination API',
      description: 'Freelancination API Information',
      contact: {
        name: 'Adham Goussous',
        email: 'adham.goussous@gmail.com',
      },
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Auth',
        description: 'Login, Register, and Me',
      },
      {
        name: 'Config',
        description: 'API config data',
      },
    ],
    definitions: {
      LocaleString: {
        type: 'object',
        properties: {
          en: {
            type: 'string',
          },
          ar: {
            type: 'string',
          },
        },
      },
      Token: {
        type: 'object',
        properties: {
          tokenType: {
            type: 'string',
          },
          accessToken: {
            type: 'string',
          },
          refreshToken: {
            type: 'string',
          },
          expiresIn: {
            type: 'date',
          },
        },
      },
    },
    components: {
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        ValidationError: {
          description: 'Validation error',
        },
        NotFoundError: {
          description: 'Not found error',
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: ['bearerAuth'],
  },
  apis: ['src/api/v1/routes/**/*.js', 'src/api/v1/models/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.get('/jsonDocs', (req, res) => {
  res.json(swaggerDocs);
});

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;

import { Router } from 'express';
import { serverUrl } from '../../../config/vars';
import publicRouter from './public';
import adminRouter from './admin';
import authRouter from './auth.route';
import usersRouter from './users.route';
import contactsRouter from './contacts.route';

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = Router();

router.use('/public', publicRouter);
router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/contacts', contactsRouter);

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
      title: 'STRV Addressbook API',
      description: 'STRV Addressbook API',
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
  apis: ['src/api/v1/routes/**/*.ts', 'src/api/v1/models/**/*.ts', 'src/api/v1/routes/**/*.js', 'src/api/v1/models/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.get('/jsonDocs', (req, res) => {
  res.json(swaggerDocs);
});

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;

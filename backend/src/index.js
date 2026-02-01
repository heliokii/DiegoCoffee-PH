const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const sqlRoutes = require('./routes/sql');
const pexelsRoutes = require('./routes/pexels');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const menu_itemsRoutes = require('./routes/menu_items');

const categoriesRoutes = require('./routes/categories');

const promotionsRoutes = require('./routes/promotions');

const reservationsRoutes = require('./routes/reservations');

const pitchesRoutes = require('./routes/pitches');

const locationsRoutes = require('./routes/locations');

const ordersRoutes = require('./routes/orders');

const mediaRoutes = require('./routes/media');

const pagesRoutes = require('./routes/pages');

const getBaseUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/api') ? url.slice(0, -4) : url;
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Diego Coffee & Cocktail Studio',
      description:
        'Diego Coffee & Cocktail Studio Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host =
      getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Diego Coffee & Cocktail Studio API',
    docs: '/api-docs',
    api: '/api',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use('/api/menu_items', menu_itemsRoutes);

app.use('/api/categories', categoriesRoutes);

app.use(
  '/api/promotions',
  passport.authenticate('jwt', { session: false }),
  promotionsRoutes,
);

app.use('/api/reservations', reservationsRoutes);

app.use('/api/pitches', pitchesRoutes);

app.use('/api/locations', locationsRoutes);

app.use(
  '/api/orders',
  passport.authenticate('jwt', { session: false }),
  ordersRoutes,
);

app.use('/api/media', mediaRoutes);

app.use(
  '/api/pages',
  passport.authenticate('jwt', { session: false }),
  pagesRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);
app.use(
  '/api/ai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);
app.use(
  '/api/sql',
  passport.authenticate('jwt', { session: false }),
  sqlRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;

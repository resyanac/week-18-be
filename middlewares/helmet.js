const helmet = require("helmet");

const setPermissionsPolicy = (req, res, next) => {
  res.setHeader("Permissions-Policy", "your-permissions-policy");
  next();
};

const helmetApp = (app) => {
  app.use(helmet());
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(setPermissionsPolicy);
};

module.exports = helmetApp;

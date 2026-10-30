require('dotenv').config();

const REQUIRED_ENV = ['JWT_SECRET', 'CORE_URL', 'CUSTOMER_URL', 'INTERNAL_TOKEN'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  missing.forEach((key) => console.error(`[fatal] Missing required environment variable: ${key}`));
  process.exit(1);
}

module.exports = {
  port: parseInt(process.env.PORT || '3006', 10),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwtSecret: process.env.JWT_SECRET,
  coreUrl: process.env.CORE_URL.replace(/\/$/, ''),
  customerUrl: process.env.CUSTOMER_URL.replace(/\/$/, ''),
  internalToken: process.env.INTERNAL_TOKEN,
};

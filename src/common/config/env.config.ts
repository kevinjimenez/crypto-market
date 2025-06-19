export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'local',
  port: parseInt(process.env.PORT ?? '3000', 10),
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT ?? '5433', 10),
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  coingeckoApi: process.env.COINGECKO_API,
});

const HapiServer = require('@hapi/hapi');
const routeConfigurations = require('./routes');

const startServer = async () => {
  const serverInstance = HapiServer.server({
    port: 9080,
    host: 'localhost',
  });

  serverInstance.route(routeConfigurations);

  await serverInstance.start();
  console.log(`Server is running at ${serverInstance.info.uri}`);
};

process.on('uncaughtException', (err) => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});

startServer();

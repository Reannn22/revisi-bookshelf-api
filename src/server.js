const Hapi = require('@hapi/hapi');
const bookRoutes = require('./routes/booksRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  server.route(bookRoutes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

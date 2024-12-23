const {
  createBook,
  listBooks,
  getBook,
  updateBook,
  deleteBook,
} = require('./handler');

const routeConfigurations = [
  {
    method: 'POST',
    path: '/bookRecords',
    handler: createBook,
  },
  {
    method: 'GET',
    path: '/bookRecords',
    handler: listBooks,
  },
  {
    method: 'GET',
    path: '/bookRecords/{bookId}',
    handler: getBook,
  },
  {
    method: 'PUT',
    path: '/bookRecords/{bookId}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/bookRecords/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routeConfigurations;
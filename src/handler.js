const { nanoid } = require('nanoid');
const bookCollection = require('./books');

const createBook = (req, res) => {
  const {
    title,
    publicationYear,
    authorName,
    description,
    publisherName,
    totalPages,
    pagesRead,
    isCurrentlyReading,
  } = req.payload;

  if (!title) {
    return res.response({
      status: 'error',
      message: 'Nama buku tidak boleh kosong.',
    }).code(400);
  }

  if (pagesRead > totalPages) {
    return res.response({
      status: 'error',
      message: 'Jumlah halaman yang dibaca tidak bisa melebihi total halaman.',
    }).code(400);
  }

  const bookId = nanoid(16);
  const isCompleted = totalPages === pagesRead;
  const creationDate = new Date().toISOString();

  const newBook = {
    id: bookId,
    title,
    publicationYear,
    authorName,
    description,
    publisherName,
    totalPages,
    pagesRead,
    isCompleted,
    isCurrentlyReading,
    createdAt: creationDate,
    updatedAt: creationDate,
  };

  bookCollection.push(newBook);

  return res.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan.',
    data: { bookId },
  }).code(201);
};

const listBooks = (req, res) => {
  const { title, isCurrentlyReading, isCompleted } = req.query;
  let filteredBooks = bookCollection;

  if (title) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (isCurrentlyReading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.isCurrentlyReading === (isCurrentlyReading === '1')
    );
  }

  if (isCompleted !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.isCompleted === (isCompleted === '1')
    );
  }

  const simplifiedBooks = filteredBooks.map(({ id, title, publisherName }) => ({
    id,
    title,
    publisherName,
  }));

  return res.response({
    status: 'success',
    data: { books: simplifiedBooks },
  }).code(200);
};

const getBook = (req, res) => {
  const { id } = req.params;
  const book = bookCollection.find((entry) => entry.id === id);

  if (book) {
    return res.response({
      status: 'success',
      data: { book },
    }).code(200);
  }

  return res.response({
    status: 'error',
    message: 'Buku dengan id tersebut tidak ditemukan.',
  }).code(404);
};

const updateBook = (req, res) => {
  const { id } = req.params;
  const {
    title,
    publicationYear,
    authorName,
    description,
    publisherName,
    totalPages,
    pagesRead,
    isCurrentlyReading,
  } = req.payload;

  if (!title) {
    return res.response({
      status: 'error',
      message: 'Nama buku harus diisi.',
    }).code(400);
  }

  if (pagesRead > totalPages) {
    return res.response({
      status: 'error',
      message: 'Jumlah halaman yang dibaca tidak boleh lebih besar dari total halaman.',
    }).code(400);
  }

  const bookIndex = bookCollection.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    const updatedBook = {
      ...bookCollection[bookIndex],
      title,
      publicationYear,
      authorName,
      description,
      publisherName,
      totalPages,
      pagesRead,
      isCurrentlyReading,
      isCompleted: totalPages === pagesRead,
      updatedAt: new Date().toISOString(),
    };

    bookCollection[bookIndex] = updatedBook;

    return res.response({
      status: 'success',
      message: 'Buku berhasil diperbarui.',
    }).code(200);
  }

  return res.response({
    status: 'error',
    message: 'Buku dengan id tersebut tidak ditemukan.',
  }).code(404);
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  const indexToDelete = bookCollection.findIndex((book) => book.id === id);

  if (indexToDelete !== -1) {
    bookCollection.splice(indexToDelete, 1);
    return res.response({
      status: 'success',
      message: 'Buku berhasil dihapus.',
    }).code(200);
  }

  return res.response({
    status: 'error',
    message: 'Buku dengan id tersebut tidak ditemukan.',
  }).code(404);
};

module.exports = {
  createBook,
  listBooks,
  getBook,
  updateBook,
  deleteBook,
};

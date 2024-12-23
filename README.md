Tes review Mandiri Submission Bookshelf API menggunakan cURL id Dicoding : Reannn22

// API dapat menyimpan buku
curl -X POST http://localhost:9080/bookRecords -H "Content-Type: application/json" -d '{
  "title": "Nama Buku",
  "publicationYear": 2021,
  "authorName": "Nama Penulis",
  "description": "Ringkasan Buku",
  "publisherName": "Penerbit",
  "totalPages": 100,
  "pagesRead": 10,
  "isCurrentlyReading": true
}'

// API dapat menampilkan seluruh buku
curl -X GET http://localhost:9080/bookRecords

// API dapat menampilkan detail buku
curl -X GET http://localhost:9080/bookRecords/{bookId}

// API dapat mengubah data buku
curl -X PUT http://localhost:9080/bookRecords/{bookId} -H "Content-Type: application/json" -d '{
  "title": "Nama Buku Baru",
  "publicationYear": 2022,
  "authorName": "Nama Penulis Baru",
  "description": "Ringkasan Buku Baru",
  "publisherName": "Penerbit Baru",
  "totalPages": 200,
  "pagesRead": 20,
  "isCurrentlyReading": false
}'

// API dapat menghapus buku
curl -X DELETE http://localhost:9080/bookRecords/{bookId}

// Project menggunakan port 9080
http://localhost:9080/

// Project memiliki runner script dengan nama start
npm run start
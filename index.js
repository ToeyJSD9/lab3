const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data for API
const books = [
  { id: 1, title: "1984", author: "George Orwell", genre: "Dystopian" },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
];

// Filter books by genre (optional)
app.get("/books", (req, res, next) => {
  setTimeout(() => {
    const { genre } = req.query;

    if (genre) {
      const filteredBooks = books.filter((book) => book.genre.includes(genre));
      res.json(filteredBooks);
    } else {
      res.json(books);
    }
  }, 1000);
});

// GET specific book by ID with async/await
app.get("/books/:id", async (req, res, next) => {
    try {
      const book = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const foundBook = books.find((b) => b.id === parseInt(req.params.id, 10));
          
          if (foundBook) {
            resolve(foundBook);
          } else {
            const error = new Error("Book not found");
            error.status = 404;
            reject(error);
          }
        }, 1000);
      });
  
      res.json(book);
    } catch (err) {
      next(err);
    }
  });
  
//TODO: ADD CODE
app.use((err,req,res,next) => {})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");

const app = express();
app.use(express.json()); // Middleware
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const { title, year, director, duration, poster, genre, rate } = req.body;
  const newMovie = {
    id: crypto.randomUUID(),
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate: rate ?? 0,
  };
  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie);
  res.status(201).json(newMovie); // Puede ser interesante devolver la info para actualizar cache del cliente
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server listenting on port http://localhost:${PORT}`);
});

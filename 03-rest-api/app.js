const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");
const { validateMovie, validatePartialMovie } = require("./schema/movie");

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
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // A introducir en base de datos
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  // Podemos desestructurar sin temor a que se haya introducido un valor no deseado
  // puesto que ya hemos hecho la validacion previamente y no va a entrar un valor que no tengamos controlado ya

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie);
  res.status(201).json(newMovie); // Puede ser interesante devolver la info para actualizar cache del cliente
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server listenting on port http://localhost:${PORT}`);
});

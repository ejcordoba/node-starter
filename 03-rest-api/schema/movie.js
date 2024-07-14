const z = require("zod");

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventura",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
    {
      required_error: "Movie genre is required",
      invalid_type_error: "Movie genre must be an array of enum Genres",
    }
  ),
  rate: z.number().min(0).max(10),
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
} // safeParse devuelve un objecto resolve con error o datos, mejor para gestionar con condicional
// Con safeParseAsync evitariamos bloqueos en el proceso.

module.exports = {
  validateMovie,
};

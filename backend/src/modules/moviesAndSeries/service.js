class MovieAndSeriesService {

  static async getMoviesAndSeries(db) {
    return db.get("movies_series").map((movie) => ({
      id     : movie.id,
      poster : movie.poster,
      title  : movie.title,
      genre  : movie.genre,
    })).value();
  }
}

module.exports = { MovieAndSeriesService };
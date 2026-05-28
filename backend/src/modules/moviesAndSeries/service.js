class MovieAndSeriesService {

  static async get(db) {
    return db.get("movies_series").map((movie) => ({
      id     : movie.id,
      poster : movie.poster,
      title  : movie.title,
      genre  : movie.genre,
      year   : movie.year 
    })).value();
  }



  static async getInfoById(db, id) {
    return db.get("movies_series").find({ id : id }).value();
  }



  static async getFavoritesIds(db) {
    return db.get("favorites").map((item) => ( item.movies_series_id )).value();
  }



  static async addToFavorites(db, id) {

    const alreadyExists = db
      .get("favorites")
      .find({
        movies_series_id: id
      })
      .value();

    if (alreadyExists) {
      return alreadyExists;
    }

    const newFavorite = {
      id: Date.now().toString(),
      movies_series_id: id,
    };

    db.get("favorites")
      .push(newFavorite)
      .write();

    return newFavorite;
  }



  static async removeFromFavorites(db, id) {

    const exists = db
      .get("favorites")
      .find({ movies_series_id: id })
      .value();

    if (!exists) return false;

     db.get("favorites")
      .remove({ movies_series_id: id })
      .write();

    return true;
  }
}

module.exports = { MovieAndSeriesService };
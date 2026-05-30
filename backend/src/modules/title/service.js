class TitleService {

  static async isValidPosterUrl(url) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
      });

      const contentType = response.headers.get('content-type');

      const validFormats = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
      ];

      return validFormats.includes(contentType);
    } catch {
      return false;
    }
  }



  static async isValidPoster(poster) {
    const isImageBase64 =
      /^data:image\/(jpeg|jpg|png|webp);base64,/i.test(poster);

    if (isImageBase64) return true;

    const isUrl = /^https?:\/\//i.test(poster);

    if (isUrl) return await this.isValidPosterUrl(poster);

    return false;
  }



  static async get(db) {
    return db.get("titles").map((title) => ({
      id     : title.id,
      poster : title.poster,
      title  : title.title,
      genre  : title.genre,
      year   : title.year 
    })).value();
  }



  static async getInfoById(db, id) {
    return db.get("titles").find({ id : id }).value();
  }



  static async getFavoritesIds(db) {
    return db.get("favorites").map((item) => ( item.title_id )).value();
  }



  static async addToFavorites(db, id) {

    const alreadyAdded = db
      .get("favorites")
      .find({
        title_id: id
      })
      .value()
    ;

    if (alreadyAdded) return 'ALREADY_ADDED';

    const newFavorite = {
      id       : Date.now().toString(),
      title_id : id,
    };

    db.get("favorites")
      .push(newFavorite)
      .write()
    ;

    return newFavorite;
  }



  static async removeFromFavorites(db, id) {

    const exists = db
      .get("favorites")
      .find({ movies_series_id: id })
      .value()
    ;

    if (!exists) return 'ALREADY_UNFAVORITED';

     db.get("favorites")
      .remove({ movies_series_id: id })
      .write()
    ;

    return true;
  }



  static async new(db, data) {

    const validPosterFormat = await this.isValidPoster(data.poster);

    if (!validPosterFormat) {
      return 'INVALID_POSTER_FORMAT';
    }

    const exists = db
      .get("titles")
      .find({ title: data.title })
      .value()
    ;

    if (exists) return 'ALREADY_EXIST';

    const payload = {
      id     : Date.now().toString(),
      title  : data.title,
      genre  : data.genres,
      year   : data.year,
      poster : data.poster,
    };

    db.get("titles")
      .push(payload)
      .write()
    ;

    return true;
  }



  static async remove(db, id) {

    const exists = db
      .get("titles")
      .find({ id: id })
      .value()
    ;

    if (!exists) return 'NOT_FOUND';

    db.get("titles")
      .remove({ id: id })
      .write()
    ;

    return true;
  }
}

module.exports = { TitleService };
const { router } = require("../../../server");
const { MovieAndSeriesService } = require("./service");

class MovieAndSeriesController {

  static async get(req, res) {

    const movieAndSeries = await MovieAndSeriesService.get(router.db);

    res.status(200).jsonp(movieAndSeries);
  }



  static async getInfo(req, res) {

    const { id } = req.params;

    const movieOrSeries = await MovieAndSeriesService.getInfoById(
      router.db, 
      String(id)
    );

    if (!movieOrSeries) return res.status(404).jsonp({
      message: "Filme/Série não encontrado"
    });

    res.status(200).jsonp(movieOrSeries);
  }



  static async getFavoriteId(req, res) {

    const favoriteMoviesAndSeriesIds = await MovieAndSeriesService.getFavoritesIds(
      router.db, 
    );

    res.status(200).jsonp(favoriteMoviesAndSeriesIds);
  }



  static async addToFavorites(req, res) {

    const { id } = req.params;

    const newFavorite = await MovieAndSeriesService.addToFavorites(
      router.db, 
      String(id),
    );

    if (!newFavorite) {
      res.status(500).jsonp({
        message : 'Ocorreu um erro ao adicionar aos favoritos!',
        success : false,
      });
    }

    res.status(200).jsonp({
      message : 'Adicionado aos favoritos com sucesso!',
      success : true,
    });
  }



  static async removeFromFavorites(req, res) {

    const { id } = req.params;

    const removedFavorite = await MovieAndSeriesService.removeFromFavorites(
      router.db, 
      String(id),
    );

    if (!removedFavorite) {
      res.status(404).jsonp({
        message : 'Ocorreu um erro ao remover aos favoritos, pois já estava não favoritado!',
        success : false,
      });
    }

    res.status(200).jsonp({
      message : 'Removido dos favoritos com sucesso!',
      success : removedFavorite,
    });
  }
}

module.exports = { MovieAndSeriesController };
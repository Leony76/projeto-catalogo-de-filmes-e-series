const { router } = require("../../../server");
const { MovieAndSeriesService } = require("./service");

class MovieAndSeriesController {

  static genericResponseError = 'Erro interno no servidor!';

  static handleInternalError(res, error) {
    console.error(error);

    return res.status(500).jsonp({
      success: false,
      message: this.genericResponseError,
    });
  }

  static async get(req, res) {
    try {
      const movieAndSeries = await MovieAndSeriesService.get(router.db);
  
      return res.status(200).jsonp(movieAndSeries);
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }



  static async getInfo(req, res) {
    try {
      const { id } = req.params;
  
      const movieOrSeries = await MovieAndSeriesService.getInfoById(
        router.db, 
        String(id)
      );
  
      if (!movieOrSeries) return res.status(404).jsonp({
        message: "Filme/Série não encontrado"
      });
  
      return res.status(200).jsonp(movieOrSeries);
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }



  static async getFavoriteId(req, res) {
    try {
      const favoriteMoviesAndSeriesIds = await MovieAndSeriesService.getFavoritesIds(
        router.db, 
      );
  
      return res.status(200).jsonp(favoriteMoviesAndSeriesIds);
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }



  static async addToFavorites(req, res) {
    try {
      const { id } = req.params;
  
      const newFavorite = await MovieAndSeriesService.addToFavorites(
        router.db, 
        String(id),
      );
  
      if (!newFavorite) {
        return res.status(500).jsonp({
          message : 'Ocorreu um erro ao adicionar aos favoritos!',
          success : false,
        });
      }
  
      return res.status(200).jsonp({
        message : 'Adicionado aos favoritos com sucesso!',
        success : true,
      });
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }



  static async removeFromFavorites(req, res) {
    try {  
      const { id } = req.params;
  
      const removedFavorite = await MovieAndSeriesService.removeFromFavorites(
        router.db, 
        String(id),
      );
  
      if (!removedFavorite) {
        return res.status(404).jsonp({
          message : 'Ocorreu um erro ao remover aos favoritos, pois já estava não favoritado!',
          success : false,
        });
      }
  
      return res.status(200).jsonp({
        message : 'Removido dos favoritos com sucesso!',
        success : removedFavorite,
      });
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }



  static async new(req, res) {
    try {
      const data = req.body;
  
      const newMovieOrSeries = await MovieAndSeriesService.new(
        router.db, 
        data,
      );
  
      if (newMovieOrSeries === 'FOUND') {
        return res.status(409).jsonp({
          message : 'Ocorreu um erro ao adicionar o filme, pois já existe um com o mesmo título!',
          success : false,
        });
      }
  
      if (!newMovieOrSeries) {
        return res.status(500).jsonp({
          message : 'Ocorreu um erro ao remover aos favoritos, tente novamente mais tarde!',
          success : false,
        });
      }
  
      return res.status(201).jsonp({
        message : 'Filme/Série adicionada à lista com sucesso!',
        success : true,
      });
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }
}

module.exports = { MovieAndSeriesController };
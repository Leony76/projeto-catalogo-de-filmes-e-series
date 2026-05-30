const { router } = require("../../../server");
const { TitleService } = require("./service");

class TitleController {

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
      const movieAndSeries = await TitleService.get(router.db);
  
      return res.status(200).jsonp(movieAndSeries);
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }



  static async getInfo(req, res) {
    try {
      const { id } = req.params;
  
      const title = await TitleService.getInfoById(
        router.db, 
        String(id)
      );
  
      if (!title) return res.status(404).jsonp({
        message: "Filme/Série não encontrado"
      });
  
      return res.status(200).jsonp(title);
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }



  static async getFavoriteId(req, res) {
    try {
      const favoriteTitlesIds = await TitleService.getFavoritesIds(
        router.db, 
      );
  
      return res.status(200).jsonp(favoriteTitlesIds);
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }



  static async addToFavorites(req, res) {
    try {
      const { id } = req.params;
  
      const newFavorite = await TitleService.addToFavorites(
        router.db, 
        String(id),
      );
  
      if (newFavorite === 'ALREADY_ADDED') {
        return res.status(409).jsonp({
          message : 'Ocorreu um erro ao adicionar aos favoritos, pois já estava!',
          success : false,
        });
      }
      
      if (!newFavorite) {
        return res.status(404).jsonp({
          message : 'Ocorreu um erro ao adicionar aos favoritos, pois o título não existe!',
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
  
      const removedFavorite = await TitleService.removeFromFavorites(
        router.db, 
        String(id),
      );
  
      if (removedFavorite === 'ALREADY_UNFAVORITED') {
        return res.status(409).jsonp({
          message : 'Ocorreu um erro ao remover aos favoritos, pois já estava não favoritado!',
          success : false,
        });
      }

      if (!removedFavorite) {
        return res.status(404).jsonp({
          message : 'Ocorreu um erro ao remover dos favoritos, pois o título não existe!',
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
  
      const newMovieOrSeries = await TitleService.new(
        router.db, 
        data,
      );

      if (newMovieOrSeries === 'INVALID_POSTER_FORMAT') {
        return res.status(400).jsonp({
          message : 'O poster deve ser uma imagem estática!',
          success : false,
        });
      }
  
      if (newMovieOrSeries === 'ALREADY_EXIST') {
        return res.status(409).jsonp({
          message : 'Ocorreu um erro ao adicionar o filme, pois já existe um com o mesmo título!',
          success : false,
        });
      }
  
      if (!newMovieOrSeries) {
        return res.status(500).jsonp({
          message : 'Ocorreu um erro ao adicionar o filme, tente novamente mais tarde!',
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



  static async remove(req, res) {
    try {
      const { id } = req.params;
  
      const remove = await TitleService.remove(
        router.db, 
        id,
      );
  
      if (remove === 'NOT_FOUND') {
        return res.status(404).jsonp({
          message : 'Ocorreu um erro ao remover o filme, pois ele não existe!',
          success : false,
        });
      }
  
      if (!remove) {
        return res.status(404).jsonp({
          message : 'Ocorreu um erro ao remover o filme, pois ele não existe!',
          success : false,
        });
      }
  
      return res.status(200).jsonp({
        message : 'Filme/Série removido da lista com sucesso!',
        success : true,
      });
    } catch (error) {
      return this.handleInternalError(res, error);
    }
  }
}

module.exports = { TitleController };
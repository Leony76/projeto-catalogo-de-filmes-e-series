const { router } = require("../../../server");
const { MovieAndSeriesService } = require("./service");

class MovieAndSeriesController {

  static async getMoviesAndSeries(req, res) {

    const movies =await MovieAndSeriesService.getMoviesAndSeries(router.db);

    res.jsonp(movies);
  }
}

module.exports = { MovieAndSeriesController };
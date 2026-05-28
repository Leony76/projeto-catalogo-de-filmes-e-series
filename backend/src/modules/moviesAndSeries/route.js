const { server, router } = require("../../../server");
const { MovieAndSeriesController } = require("./controller");

server.get("/movies-and-series", MovieAndSeriesController.getMoviesAndSeries);
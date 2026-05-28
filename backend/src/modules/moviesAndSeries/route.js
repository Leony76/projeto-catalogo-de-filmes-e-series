const { server, router } = require("../../../server");
const { MovieAndSeriesController } = require("./controller");

server.get("/movies-and-series"                             , MovieAndSeriesController.get);
server.get("/movies-and-series/favorites"                   , MovieAndSeriesController.getFavoriteId);
server.get("/movies-and-series/:id"                         , MovieAndSeriesController.getInfo);
server.post("/movies-and-series/add-to-favorite/:id"        , MovieAndSeriesController.addToFavorites);
server.delete("/movies-and-series/remove-from-favorite/:id" , MovieAndSeriesController.removeFromFavorites);
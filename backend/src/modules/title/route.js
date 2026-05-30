const { server, router } = require("../../../server");
const { TitleController } = require("./controller");

server.get("/titles"                             , TitleController.get)                 ;
server.get("/titles/favorites"                   , TitleController.getFavoriteId)       ;
server.post("/titles/new"                        , TitleController.new)                 ;
server.delete("/titles/remove/:id"               , TitleController.remove)              ;
server.get("/titles/:id"                         , TitleController.getInfo)             ;
server.post("/titles/add-to-favorite/:id"        , TitleController.addToFavorites)      ;
server.delete("/titles/remove-from-favorite/:id" , TitleController.removeFromFavorites) ;
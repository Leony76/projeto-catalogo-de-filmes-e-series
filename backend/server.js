const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

module.exports = {
  server,
  router,
};

require("./src/modules/moviesAndSeries/route.js");

server.use(router);

server.listen(3000, "0.0.0.0", () => {
  console.log("JSON Server rodando");
});
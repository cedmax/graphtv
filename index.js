require("dotenv").config();

const fastify = require("fastify")();
const api = require("./modules/api");
const path = require("path");
const serveStatic = require("serve-static");

(async () => {
  await fastify.register(require("fastify-express"));

  fastify.get("/api/search/:search", async (request, reply) => {
    const result = await api.searchShow(request.params.search);

    reply.send(result);
  });

  fastify.get("/api/show/:id", async (request, reply) => {
    const show = await api.getSeasons(request.params.id);

    reply.send(show);
  });

  if (process.env.ENV === "development") {
    fastify.register(require("fastify-http-proxy"), {
      upstream: "http://localhost:3000",
    });
  } else {
    fastify.use("/", serveStatic(path.join(__dirname, "/build")));
  }

  await fastify.listen(process.env.SERVER_PORT, "127.0.0.1");
})();

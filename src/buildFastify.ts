import Fastify from "fastify";

const buildFastify = (settings = {}) => {
  const fastify = Fastify(settings);

  fastify.get("/", async () => ({
    nonce: "strokey nonce",
  }));

  return fastify;
};

export default buildFastify;

import Fastify from "fastify";

const buildFastify = (settings = {}) => {
  const fastify = Fastify(settings);

  fastify.get("/", async () => ({
    nonce: "strokey nonce faggot",
    gay: "cunty mcjim",
    aids: "rawrxd",
  }));

  return fastify;
};

export default buildFastify;

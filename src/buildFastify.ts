import Fastify from "fastify";

// disable unused vars until i get typescript 3.8 to work properly...
// eslint-disable-next-line no-unused-vars
import mongoose, { Document, Schema, model } from "mongoose";
// eslint-disable-next-line import/no-unresolved
import { Client as PostgresClient } from "pg";

// mongo
interface INonce {
  name: string,
  number?: number,
}

interface INonceDocument extends INonce, Document { }

const NonceSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, default: 23 },
});

const NonceModel = model<INonceDocument>("Nonce", NonceSchema);

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  MONGO_REPLICASET,
} = process.env;

const mongoUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?replicaSet=${MONGO_REPLICASET}&authSource=admin`;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on("error", console.error);
// eslint-disable-next-line no-console
db.on("open", () => console.log("db conn"));

// postgres
const {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
  PGDATABASE,
} = process.env;

// note: the conn string gets ignored completely by this shitty postgres lib
const postgresUrl = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

const pgClient = new PostgresClient({
  connectionString: postgresUrl,
});
pgClient.connect();

const buildFastify = (settings = {}) => {
  const fastify = Fastify(settings);

  fastify.get("/", async () => ({
    nonce: "strokey nonce faggot",
    gay: "cunty mcjim",
    aids: "yyyyyyyyy",
  }));

  fastify.get("/postgres", async () => {
    const dbRes = await pgClient.query("SELECT $1::text as message", ["cunty mcjim"]);

    return {
      message: dbRes.rows[0].message,
    };
  });

  fastify.get("/nonce", async () => NonceModel.find());
  fastify.post("/nonce", async (request) => new NonceModel(request.body).save());

  return fastify;
};

export default buildFastify;

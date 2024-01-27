import { MongoTools } from "../infra/repository/tools/mongo-tools";
import app from "./config/app";
import "dotenv/config";

const PORT = process.env.PORT || 3001;
const MONGO_URL =
  (process.env.MONGO_URL as string) === "prod"
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL_DEV;

(async () => {
  await MongoTools.connect(MONGO_URL as string);
  app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT} - environment: ${process.env.NODE_ENV}`);
  });
})();

import { MongoTools } from "../infra/repository/tools/mongo-tools";
import app from "./config/app";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

(async () => {
  await MongoTools.connect(process.env.MONGO_URL as string);
  app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT} - environment: ${process.env.NODE_ENV}`);
  });
})();

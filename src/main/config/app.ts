import express from "express";
import helmet from "helmet";
import cors from "cors";
import { requestLog } from "../middlewares/request-log";
import { newsletterRoute } from "../routes/newsletter-route";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLog);
app.use("/api/v1/newsletter", newsletterRoute);

export default app;

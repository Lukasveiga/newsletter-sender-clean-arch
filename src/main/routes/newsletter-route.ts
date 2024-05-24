import { Request, Response, Router } from "express";
import {
  makeSendNewsletterController,
  makeSubscribeUserController,
  makeUnsubscribeUserController,
} from "../factories";
import { HttpRequest, HttpResponse } from "../../presenters/controllers/ports/http";

const route = Router();

const subscribeUserController = makeSubscribeUserController();
const usnsubscribeUserController = makeUnsubscribeUserController();
const sendNewsletterController = makeSendNewsletterController();

route.post("/subscribe", async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
  };

  const httpResponse: HttpResponse = await subscribeUserController.subscribe(httpRequest);
  return res.status(httpResponse.statusCode).json(httpResponse.body);
});

route.get("/unsubscribe", async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    query: req.query,
  };

  const httpResponse: HttpResponse = await usnsubscribeUserController.unsubscribe(httpRequest);
  return res.sendFile(httpResponse.body.path);
});

route.post("/send", async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    host: req.headers.host?.split(":")[0],
    port: req.headers.host?.split(":")[1],
  };
  const httpResponse: HttpResponse = await sendNewsletterController.send(httpRequest);
  return res.status(httpResponse.statusCode).json(httpResponse.body);
});

export { route as newsletterRoute };

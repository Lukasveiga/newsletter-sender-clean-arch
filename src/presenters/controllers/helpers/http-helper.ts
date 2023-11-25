import { HttpResponse } from "../ports/http";

export const badRequest = (error: Error): HttpResponse => {
  return { statusCode: 400, body: error.message };
};

export const ok = (body: any): HttpResponse => {
  return { statusCode: 200, body };
};

export const notFound = (error: Error): HttpResponse => {
  return { statusCode: 404, body: error.message };
};

export const serverError = (): HttpResponse => {
  return { statusCode: 500, body: "Internal Server Error" };
};

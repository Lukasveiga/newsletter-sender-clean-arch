import { HttpResponse } from "../ports/http";

export const badRequest = (error: Error): HttpResponse => {
  return { statusCode: 400, body: { message: error.message } };
};

export const ok = (body?: any): HttpResponse => {
  return { statusCode: 200, body };
};

export const notFound = (error: Error): HttpResponse => {
  return { statusCode: 404, body: { message: error.message } };
};

export const invalidToken = (error: Error): HttpResponse => {
  return { statusCode: 498, body: { message: error.message } };
};

export const serverError = (): HttpResponse => {
  return { statusCode: 500, body: { message: "Internal Server Error" } };
};

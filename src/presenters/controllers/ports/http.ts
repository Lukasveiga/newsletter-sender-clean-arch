export type HttpResponse = {
  statusCode: number;
  body: any;
};

export type HttpRequest = {
  host?: any;
  port?: any;
  body?: any;
  query?: any;
};

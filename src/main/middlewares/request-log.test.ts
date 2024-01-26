import request from "supertest";
import app from "../config/app";

describe("Request log middleware", () => {
  test("Should print request informations", async () => {
    const logSpy = jest.spyOn(console, "log");

    app.get("/test_request_log", (req, res) => {
      res.send("Test request log");
    });

    await request(app).get("/test_request_log");

    expect(logSpy).toHaveBeenCalledWith(`GET:/test_request_log`);
  });
});

import { MongoTools } from "../../infra/repository/tools/mongo-tools";
import "dotenv/config";
import app from "../config/app";
import request from "supertest";

const BASE_URL = "/api/v1/newsletter";
const mongo_url = process.env.MONGO_URL_DEV!;

describe("Newsletter Routes", () => {
  beforeAll(async () => {
    await MongoTools.connect(mongo_url);
  });

  afterAll(async () => {
    await MongoTools.clearCollection("users");
    await MongoTools.disconnect();
  });

  test("Should return user data when registration was successful", async () => {
    const requestBodyTest = { email: "user_test@email.com", name: "user_test" };

    const response = await request(app)
      .post(BASE_URL + "/subscribe")
      .send(requestBodyTest);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(requestBodyTest);
  });

  test("Should return successful message when the emails are sent", async () => {
    const response = await request(app).post(BASE_URL + "/send");

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Newsletters sent successfully");
  });

  test("Should return unsubscribe message when user unsubscribed", async () => {
    const response = await request(app)
      .patch(BASE_URL + "/unsubscribe")
      .send({ email: "user_test@email.com" });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("User unsubscribed");
  });
});

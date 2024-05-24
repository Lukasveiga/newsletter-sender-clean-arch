import { MongoTools } from "../../infra/repository/tools/mongo-tools";
import "dotenv/config";
import app from "../config/app";
import request from "supertest";
import { JwtToken } from "../../infra/token/jwt-token";
import { getTokenOptions } from "../config/token";

const BASE_URL = "/api/v1/newsletter";
const mongo_url = process.env.MONGO_URL_DEV!;

const jwtToken = new JwtToken();
const tokenOptions = getTokenOptions();

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

  test("Should send a file when user unsubscribed", async () => {
    const token = jwtToken.generate("user_test@email.com", tokenOptions);
    const response = await request(app)
      .get(BASE_URL + "/unsubscribe")
      .query({ token });

    expect(response.text.includes("<h1>Successfully Unsubscribed</h1>")).toBeTruthy();
  });
});

import { MongoTools } from "../../infra/repository/tools/mongo-tools";
import app from "../config/app";
import request from "supertest";

const BASE_URL = "/api/v1/newsletter";

describe("Newsletter Routes", () => {
  beforeAll(async () => {
    await MongoTools.connect(process.env.MONGO_URL_DEV as string);
  });

  afterAll(async () => {
    await MongoTools.clearCollection("users");
    await MongoTools.disconnect();
  });

  beforeEach(async () => {
    await MongoTools.clearCollection("users");
  });

  test("Should return user data when registration was successful", async () => {
    const requestBodyTest = { email: "userr_test@email.com", name: "user_test" };

    const response = await request(app)
      .post(BASE_URL + "/subscribe")
      .send(requestBodyTest);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(requestBodyTest);
  });
});

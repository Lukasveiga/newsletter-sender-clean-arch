import { MongoDBUserRepository } from "./mongodb-user-repository";
import { MongoTools } from "./tools/mongo-tools";
import "dotenv/config";

describe("MongoDB User Repository", () => {
  beforeAll(async () => {
    await MongoTools.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoTools.disconnect();
  });

  beforeEach(async () => {
    MongoTools.clearCollection("users");
  });

  test("Should add a user", async () => {
    const sut = new MongoDBUserRepository();
    await sut.add({ name: "test_name", email: "test_email@email.com" });
    const savedUser = await sut.findUserByEmail("test_email@email.com");
    expect(savedUser).not.toBeNull();
    expect(savedUser?.name).toEqual("test_name");
    expect(savedUser?.email).toEqual("test_email@email.com");
  });
});

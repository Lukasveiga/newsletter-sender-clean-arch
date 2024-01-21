import { MongoDBUserRepository } from "./mongodb-user-repository";
import { MongoTools } from "./tools/mongo-tools";
import { UserData } from "../../entities/user/user-data";

const sut = new MongoDBUserRepository();

describe("MongoDB User Repository", () => {
  beforeAll(async () => {
    await MongoTools.connect(global.__MONGO_URI__);
  });
  beforeEach(async () => {
    MongoTools.clearCollection("users");
  });

  afterAll(async () => {
    await MongoTools.disconnect();
  });

  test("Should add a user", async () => {
    const mockUser: UserData = { name: "test_name", email: "test_email@email.com" };
    await sut.add(mockUser);
    const savedUser = await sut.findUserByEmail(mockUser.email);

    expect(savedUser?.name).toEqual("test_name");
    expect(savedUser?.email).toEqual("test_email@email.com");
    expect(savedUser?.isSubscribed()).toBeTruthy();
  });

  test("Should update active status to false", async () => {
    const mockUser: UserData = { name: "test_name", email: "test_email@email.com" };
    await sut.add(mockUser);
    await sut.updateActiveStatus(mockUser.email);
    const savedUser = await sut.findUserByEmail(mockUser.email);
    expect(savedUser?.isSubscribed()).toBeFalsy();
  });

  test("Should return a list of active users", async () => {
    const mockUserList: UserData[] = [
      { name: "test_name", email: "test_email@email.com" },
      { name: "test_name", email: "test_email1@email.com" },
      { name: "test_name", email: "test_email2@email.com", active: false },
    ];

    for (let mockUser of mockUserList) {
      await sut.add(mockUser);
    }

    const activeUsersList = await sut.findAllActiveUsers();
    expect(activeUsersList).toHaveLength(2);

    for (let i = 0; i < activeUsersList.length; i++) {
      expect(activeUsersList[i].email).toEqual(mockUserList[i].email);
      expect(activeUsersList[i].name).toEqual(mockUserList[i].name);
      expect(activeUsersList[i].isSubscribed()).toBeTruthy();
    }
  });
});

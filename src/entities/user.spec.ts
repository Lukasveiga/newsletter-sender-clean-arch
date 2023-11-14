import { User } from "./user";
import { UserData } from "./user-data";

describe("User domain entity", () => {
  test("Should create a new user", () => {
    const userData: UserData = {
      name: "User Test",
      email: "user@email.com",
    };

    const user = User.create(userData);

    console.log(user);

    expect(user).toEqual({ name: "User Test", email: "user@email.com" });
  });
});

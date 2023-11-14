import { User } from "./user";
import { UserData } from "./user-data";

describe("User domain entity", () => {
  test("Should create a new user", () => {
    const userData: UserData = {
      name: "User Test",
      email: "user@email.com",
    };

    const user = User.create(userData);

    expect(user).toEqual({ name: "User Test", email: "user@email.com", active: true });
  });

  test("isSubscribed should returns true if the user is subscribed", () => {
    const userData: UserData = {
      name: "User Test",
      email: "user@email.com",
    };

    const user = User.create(userData);

    expect(user.isSubscribed()).toBeTruthy();
  });

  test("isSubscribed should returns false if the user unsubscribe", () => {
    const userData: UserData = {
      name: "User Test",
      email: "user@email.com",
    };

    const user = User.create(userData);

    user.unsubscribe();

    expect(user.isSubscribed()).toBeFalsy();
  });
});

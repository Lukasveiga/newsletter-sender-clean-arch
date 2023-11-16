import { InvalidEmailError } from "./errors/invalid-email";
import { InvalidNameError } from "./errors/invalid-name";
import { User } from "./user";
import { UserData } from "./user-data";

describe("User domain entity", () => {
  test("Should not create a new user when invalid names are provided", () => {
    const emptyName: string = "";
    const shortName: string = "a";
    let longName: string = "";

    for (let i = 0; i <= 45; i++) {
      longName += "a";
    }

    const userDataCases: UserData[] = [
      {
        name: emptyName,
        email: "user@email.com",
      },
      {
        name: shortName,
        email: "user@email.com",
      },
      {
        name: longName,
        email: "user@email.com",
      },
    ];

    for (const userDataCase of userDataCases) {
      const error = () => {
        User.create(userDataCase);
      };

      expect(error).toThrow(new InvalidNameError());
    }
  });

  test("Should not create a new user when invalid email is provided", () => {
    const invalidEmail: string = "invalid_email";
    const userData: UserData = {
      name: "User Test",
      email: invalidEmail,
    };

    const error = () => {
      User.create(userData);
    };

    expect(error).toThrow(new InvalidEmailError());
  });

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

  test("isSubscribed should returns true if the user resubscribe", () => {
    const userData: UserData = {
      name: "User Test",
      email: "user@email.com",
    };

    const user = User.create(userData);

    user.unsubscribe();

    expect(user.isSubscribed()).toBeFalsy();

    user.resubscribe();

    expect(user.isSubscribed()).toBeTruthy();
  });
});

import { InvalidEmailError } from "../../entities/user/errors/invalid-email";
import { InvalidNameError } from "../../entities/user/errors/invalid-name";
import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { InMemoryUserRepository } from "../in-memory-user-repository/in-memory-user-repository";
import { SubscribeUserOnNewsletterList } from "./subscribe-user-on-newsletter-list";

const makeSut = (userslist: User[]) => {
  const inMemoryUserRepository = new InMemoryUserRepository(userslist);
  const sut = new SubscribeUserOnNewsletterList(inMemoryUserRepository);
  return { sut, inMemoryUserRepository };
};

describe("subscribeUserOnNewsletterList", () => {
  test("Should subscribe a user to newsletter list", async () => {
    const userData: UserData = {
      name: "user",
      email: "user@email.com",
    };

    const usersList: User[] = [];
    const { sut, inMemoryUserRepository } = makeSut(usersList);

    await sut.subscribeUserOnNewsletterList(userData);
    const subscribedUser = await inMemoryUserRepository.findUserByEmail(userData.email);

    expect(subscribedUser).toEqual({ ...userData, active: true });
  });

  test("Should change user active status if user was already registered into newsletter list but with active status equal to false", async () => {
    const userData: UserData = {
      name: "user",
      email: "user@email.com",
    };

    const user: User = User.create(userData);

    user.unsubscribe();

    expect(user.isSubscribed()).toBeFalsy();

    const usersList: User[] = [user];
    const { sut, inMemoryUserRepository } = makeSut(usersList);

    await sut.subscribeUserOnNewsletterList(userData);
    const subscribedUser = await inMemoryUserRepository.findUserByEmail(user.email);

    expect(subscribedUser).toStrictEqual(user);
    expect(subscribedUser?.isSubscribed()).toBeTruthy();
  });

  test("Should throw if invalid names are provided", async () => {
    const emptyName: string = "";
    const shortName: string = "a";
    let longName: string = "";

    for (let i = 0; i <= 45; i++) {
      longName += "a";
    }

    const nameCases: string[] = [emptyName, shortName, longName];

    const usersList: User[] = [];
    const { sut } = makeSut(usersList);

    for (const nameCase of nameCases) {
      const response = sut.subscribeUserOnNewsletterList({
        name: nameCase,
        email: "valid@email.com",
      });
      expect(response).rejects.toThrow(new InvalidNameError());
    }
  });

  test("Should throw if invalid email is provided", async () => {
    const userData: UserData = {
      name: "user",
      email: "invalid_email",
    };

    const usersList: User[] = [];
    const { sut } = makeSut(usersList);

    const response = sut.subscribeUserOnNewsletterList(userData);
    expect(response).rejects.toThrow(new InvalidEmailError());
  });
});

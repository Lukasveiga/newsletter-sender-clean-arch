import { UnsubscribeUserFromNewsletterList } from "./unsubscribe-user-from-newsletter-list";
import { User } from "../../entities/user/user";
import { InMemoryUserRepository } from "../in-memory-user-repository/in-memory-user-repository";
import { UserData } from "../../entities/user/user-data";
import { UserNotFound } from "../errors/user-repository-error";
import { Token, TokenOptions } from "../ports/token";

class TokenSpy implements Token {
  generate(email: string, tokenOptions: TokenOptions): string {
    return "";
  }
  validate(token: string, secretKey: string): any {
    return "";
  }
}

const makeSut = (userslist: User[]) => {
  const inMemoryUserRepository = new InMemoryUserRepository(userslist);
  const token = new TokenSpy();
  const sut = new UnsubscribeUserFromNewsletterList(inMemoryUserRepository, token);
  return { sut, inMemoryUserRepository, token };
};

describe("UnsubscribeUserFromNewsletterList", () => {
  const accessToken = "token";
  test("Should change user active status to false", async () => {
    const userData: UserData = { name: "user", email: "user@email.com" };
    const userList: User[] = [User.create(userData)];

    expect(userList[0].isSubscribed()).toBeTruthy();

    const { sut, inMemoryUserRepository, token } = makeSut(userList);

    jest.spyOn(token, "validate").mockReturnValue({ email: userData.email });

    await sut.unsubscribeUserFromNewsletterList(accessToken, "secret");

    const exist = await inMemoryUserRepository.findUserByEmail(userData.email);

    expect(exist?.isSubscribed()).toBeFalsy();
  });

  test("Should call token validate function with correct parameters", async () => {
    const userData: UserData = { name: "user", email: "user@email.com" };
    const userList: User[] = [User.create(userData)];

    const { sut, token } = makeSut(userList);

    const tokenSpy = jest.spyOn(token, "validate");

    tokenSpy.mockReturnValue({ email: userData.email });

    await sut.unsubscribeUserFromNewsletterList(accessToken, "secret");

    expect(tokenSpy).toHaveBeenCalledWith(accessToken, "secret");
  });

  test("Should call userRepository functions with correct parameters", async () => {
    const userData: UserData = { name: "user", email: "user@email.com" };
    const userList: User[] = [User.create(userData)];

    const { sut, inMemoryUserRepository, token } = makeSut(userList);

    const findUserByEmailSpy = jest.spyOn(inMemoryUserRepository, "findUserByEmail");

    const updateActiveStatusSpy = jest.spyOn(inMemoryUserRepository, "updateActiveStatus");

    jest.spyOn(token, "validate").mockReturnValue({ email: userData.email });

    await sut.unsubscribeUserFromNewsletterList(accessToken, "secret");

    expect(findUserByEmailSpy).toHaveBeenCalledWith(userData.email);
    expect(updateActiveStatusSpy).toHaveBeenCalledWith(userData.email);
  });

  test("Should throw if user was not found by email", async () => {
    const userData: UserData = { name: "user", email: "user@email.com" };
    const userList: User[] = [];

    const { sut, token } = makeSut(userList);

    jest.spyOn(token, "validate").mockReturnValue({ email: userData.email });

    const promise = sut.unsubscribeUserFromNewsletterList(accessToken, "secret");
    expect(promise).rejects.toThrow(new UserNotFound());
  });
});

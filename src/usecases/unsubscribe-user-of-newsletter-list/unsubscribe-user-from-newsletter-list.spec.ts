import { UnsubscribeUserFromNewsletterList } from "./unsubscribe-user-from-newsletter-list";
import { User } from "../../entities/user/user";
import { InMemoryUserRepository } from "../in-memory-user-repository/in-memory-user-repository";
import { UserData } from "../../entities/user/user-data";

const makeSut = (userslist: User[]) => {
  const inMemoryUserRepository = new InMemoryUserRepository(userslist);
  const sut = new UnsubscribeUserFromNewsletterList(inMemoryUserRepository);
  return { sut, inMemoryUserRepository };
};

describe("UnsubscribeUserFromNewsletterList", () => {
  test("Should change active status to false", async () => {
    const userData: UserData = { name: "user", email: "user@email.com" };
    const userList: User[] = [User.create(userData)];

    expect(userList[0].isSubscribed()).toBeTruthy();

    const { sut, inMemoryUserRepository } = makeSut(userList);
    sut.unsubscribeUserFromNewsletterList(userData.email);

    const exist = await inMemoryUserRepository.findUserByEmail(userData.email);

    expect(exist?.isSubscribed()).toBeFalsy();
  });
});

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
  test("Should subscribe a new user to newsletter list", async () => {
    const user: UserData = {
      name: "user",
      email: "user@email.com",
    };

    const usersList: User[] = [];
    const { sut, inMemoryUserRepository } = makeSut(usersList);

    await sut.subscribeUserOnNewsletterList(user);
    const subscribedUser = await inMemoryUserRepository.findUserByEmail(user.email);

    expect(subscribedUser).toEqual({ ...user, active: true });
  });
});

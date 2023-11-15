import { User } from "../../entities/user";
import { UserData } from "../../entities/user-data";
import { InMemoryUserRepository } from "./in-memory-user-repository";

describe("InMemoryUserRepository", () => {
  test("Should return user if user is found by email", async () => {
    const user: User = User.create({ name: "User", email: "user@email.com" });
    const usersList: User[] = [user];
    const inMemoryUserRepository = new InMemoryUserRepository(usersList);
    const existingUser = await inMemoryUserRepository.findUserByEmail(user.email);
    expect(existingUser).toStrictEqual(user);
  });

  test("Should return null if user is not found by email", async () => {
    const user: User = User.create({ name: "User", email: "user@email.com" });
    const usersList: User[] = [];
    const inMemoryUserRepository = new InMemoryUserRepository(usersList);
    const existingUser = await inMemoryUserRepository.findUserByEmail(user.email);
    expect(existingUser).toBeNull();
  });

  test("Should add new user if user is not registered", async () => {
    const newUser: UserData = { name: "User", email: "user@email.com" };
    const usersList: User[] = [];
    const inMemoryUserRepository = new InMemoryUserRepository(usersList);
    await inMemoryUserRepository.add(newUser);
    const existingUser = await inMemoryUserRepository.findUserByEmail(newUser.email);
    expect(existingUser).toEqual({ ...newUser, active: true });
  });

  test("Should change active status when try to add unsubscribed user", async () => {
    const newUser: UserData = { name: "User", email: "user@email.com" };
    const user: User = User.create(newUser);
    user.unsubscribe();
    expect(user.isSubscribed()).toBeFalsy();

    const usersList: User[] = [user];
    const inMemoryUserRepository = new InMemoryUserRepository(usersList);
    await inMemoryUserRepository.add(newUser);

    expect(user.isSubscribed()).toBeTruthy();
  });
});

import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { UserNotFound } from "../errors/user-repository-error";
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

  test("Should return a list of active users", async () => {
    const usersList: User[] = [
      User.create({ name: "User 1", email: "user@email.com" }),
      User.create({ name: "User 2", email: "user@email.com" }),
      User.create({ name: "User 3", email: "user@email.com" }),
    ];

    usersList[2].unsubscribe();

    const inMemoryUserRepository = new InMemoryUserRepository(usersList);
    const users: User[] = await inMemoryUserRepository.findAllActiveUsers();

    expect(users).toHaveLength(2);
  });

  test("Should change user active status", async () => {
    const user: User = User.create({ name: "User", email: "user@email.com" });
    const usersList: User[] = [user];
    const inMemoryUserRepository = new InMemoryUserRepository(usersList);
    await inMemoryUserRepository.updateActiveStatus(user.email);
    const existingUser = await inMemoryUserRepository.findUserByEmail(user.email);
    expect(existingUser?.isSubscribed()).toBeFalsy();
  });

  test("Should throw if user is not found when try to update the active status", async () => {
    const user: User = User.create({ name: "User", email: "user@email.com" });
    const usersList: User[] = [];
    const inMemoryUserRepository = new InMemoryUserRepository(usersList);
    const promise = inMemoryUserRepository.updateActiveStatus(user.email);
    expect(promise).rejects.toThrow(new UserNotFound());
  });
});

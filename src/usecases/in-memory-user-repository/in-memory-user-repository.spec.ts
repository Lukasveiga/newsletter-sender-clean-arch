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
});

import { User } from "../../entities/user/user";
import { UserData } from "../../entities//user/user-data";
import { UserNotFound } from "../errors/user-repository-error";
import { UserRepository } from "../ports/user-repository";

export class InMemoryUserRepository implements UserRepository {
  usersList: User[] = [];

  constructor(usersList: User[]) {
    this.usersList = usersList;
  }

  async add(user: UserData): Promise<void> {
    const exist = await this.findUserByEmail(user.email);
    if (!exist) {
      this.usersList.push(User.create(user));
      return;
    }

    if (!exist.isSubscribed()) {
      exist.resubscribe();
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    let user: User;
    for (user of this.usersList) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findAllActiveUsers(): Promise<User[]> {
    const activeUsers: User[] = this.usersList.filter((user) => user.isSubscribed());
    return activeUsers;
  }

  async updateActiveStatus(email: string): Promise<void> {
    const exist = await this.findUserByEmail(email);
    if (!exist) {
      throw new UserNotFound();
    }

    exist.unsubscribe();
  }
}

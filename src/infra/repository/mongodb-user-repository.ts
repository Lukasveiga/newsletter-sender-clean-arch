import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { UserRepository } from "../../usecases/ports/user-repository";

export class MongoDBUserRepository implements UserRepository {
  add(user: UserData): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findUserByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findAllActiveUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  updateActiveStatus(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

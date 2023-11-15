import { User } from "../../entities/user";
import { UserData } from "../../entities/user-data";

export interface UserRepository {
  add(user: UserData): Promise<void>;
  findUserByEmail(email: string): Promise<User | null>;
  findAllActiveUsers(): Promise<User[]>;
  updateActiveStatus(email: string): Promise<void>;
}

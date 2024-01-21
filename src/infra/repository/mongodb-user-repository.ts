import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { UserRepository } from "../../usecases/ports/user-repository";
import { MongoTools } from "./tools/mongo-tools";
import { UserDataObjectID } from "./tools/user-data-objectid";

export class MongoDBUserRepository implements UserRepository {
  async add(user: UserData): Promise<void> {
    const userCollection = MongoTools.getCollection("users");
    const existingUser = await this.findUserByEmail(user.email);

    if (!existingUser) {
      await userCollection.insertOne(User.create(user));
      return;
    }

    if (existingUser && !existingUser.isSubscribed) {
      const userCollection = MongoTools.getCollection("users");
      existingUser.resubscribe();
      userCollection.updateOne(
        { email: existingUser.email },
        { $set: { active: existingUser.isSubscribed() } }
      );
      return;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userCollection = MongoTools.getCollection("users");
    const user = (await userCollection.findOne({ email: email })) as UserDataObjectID;
    return user != null ? User.create(user) : null;
  }

  async findAllActiveUsers(): Promise<User[]> {
    const userCollection = MongoTools.getCollection("users");
    const result = (await userCollection.find({ active: true }).toArray()) as UserDataObjectID[];
    return result.map((u) => {
      return User.create(u);
    });
  }

  async updateActiveStatus(email: string): Promise<void> {
    const userCollection = MongoTools.getCollection("users");
    const existingUser = await this.findUserByEmail(email);

    existingUser?.unsubscribe();

    await userCollection.updateOne(
      { email: existingUser?.email },
      { $set: { active: existingUser?.isSubscribed() } }
    );
  }
}

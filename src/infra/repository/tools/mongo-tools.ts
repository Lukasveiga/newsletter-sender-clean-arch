import { MongoClient, Collection } from "mongodb";

export class MongoTools {
  private static client: MongoClient;

  static async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  }

  static async disconnect(): Promise<void> {
    this.client.close();
  }

  static getCollection(name: string): Collection {
    return this.client.db().collection(name);
  }

  static async clearCollection(name: string): Promise<void> {
    await this.client.db().collection(name).deleteMany({});
  }
}

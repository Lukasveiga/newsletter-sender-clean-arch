import { ObjectId } from "mongodb";

export type UserDataObjectID = {
  _id: ObjectId;
  name: string;
  email: string;
  active?: boolean;
};

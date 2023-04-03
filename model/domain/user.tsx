import { ActionFlat } from "./post";

export enum UserType {
  OWNER = "OWNER",
  NONE = "NONE",
  BUYER = "BUYER",
  AGENT = "AGENT",
}

export interface UserDomain {
  actionFlat: ActionFlat;
  type: UserType;
}

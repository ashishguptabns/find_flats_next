export enum UserType {
  OWNER = "OWNER",
  NONE = "NONE",
}
export interface User {
  type: UserType;
}

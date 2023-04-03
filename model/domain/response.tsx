export enum ResponseType {
  OK = "OK",
  FAIL = "FAIL",
}

export enum ResponseCode {
  OK = 200,
  FAIL = 500,
}
export interface ServerResponse {
  msg: any;
  status: string;
}

export interface ErrorResponse {
  status: string;
  msg: string;
}

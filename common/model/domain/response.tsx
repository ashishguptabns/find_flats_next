export const OK = "OK";
export const FAIL = "FAIL";

export interface ServerResponse {
  msg: any;
  status: string;
}

export interface ErrorResponse {
  status: string;
  msg: string;
}

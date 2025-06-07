export interface IVerifyOtp {
  timestamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: IOtp;
}

export interface IOtp {
  token: string;
  email: string;
  fullname: string;
  userId: number;
  role: Array<string>;
}

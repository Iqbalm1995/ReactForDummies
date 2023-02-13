export type IResponseDataUsers = {
  statusCode: number;
  message: string;
  count: number;
  countTotal: number;
  data: IUsersModel[];
};

export type IUsersModel = {
  id: number;
  username: string;
  fullName: string;
  createdAt: Date;
  createdBy: string;
};

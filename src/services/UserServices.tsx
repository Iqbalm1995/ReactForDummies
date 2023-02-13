import axios from "axios";
import { delay } from "framer-motion";

// url must be https://localhost:7151/v1/Users/List?limit=9999&page=1
// const urlApi = process.env.BASE_URL_API;
// const v1 = "v1/";

axios.defaults.baseURL = "https://localhost:7151/v1";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.timeout = 10000;

interface IPropTypes {
  limit: number;
  page: number;
  search: string;
}

interface IPropTypes2 {
  pageSize: number;
  offset: number;
  search: string;
}

export async function getUserList({ limit, page, search }: IPropTypes) {
  //   const urlGet = `${urlApi}${v1}Users/List`;
  const urlGet = `/Users/List?limit=${limit}&page=${page}&search=${search}`;
  const response = await axios.get(urlGet);

  return response;
}

export async function getUserDetail(UserID?: string) {
  await new Promise((f) => setTimeout(f, 1000));
  const urlGet = `/Users/${UserID}`;
  const response = await axios.get(urlGet);

  return response;
}

export async function getUserListAlt({
  pageSize,
  offset,
  search,
}: IPropTypes2) {
  //   const urlGet = `${urlApi}${v1}Users/List`;
  const urlGet = `/Users/List?limit=${pageSize}&page=${offset}&search=${search}`;
  const response = await axios.get(urlGet);

  return response;
}

interface IPropAddData {
  id?: number;
  username: string;
  fullName: string;
  password: string;
  passwordConfirmation: string;
  createdBy?: string;
  updatedBy?: string;
}

export async function postUserAdd(data: IPropAddData) {
  data.createdBy = data.username;
  const urlGet = `/Users/Add`;
  const response = await axios.post(urlGet, data);

  return response;
}

interface IPropUpdateData {
  id: number;
  data: IPropAddData;
}

export async function patchUserUpdate({ id, data }: IPropUpdateData) {
  data.id = id;
  data.updatedBy = data.username;
  const urlGet = `/Users/Edit`;
  const response = await axios.patch(urlGet, data);

  return response;
}

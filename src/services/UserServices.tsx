import axios from "axios";

// url must be https://localhost:7151/v1/Users/List?limit=9999&page=1
// const urlApi = process.env.BASE_URL_API;
// const v1 = "v1/";

axios.defaults.baseURL = "https://localhost:7151/v1";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.timeout = 10000;

interface IPropTypes {
  limit: string;
  page: string;
  search: string;
}

export async function getUserList({ limit, page, search }: IPropTypes) {
  //   const urlGet = `${urlApi}${v1}Users/List`;
  const urlGet = `/Users/List?limit=${limit}&page=${page}&search=${search}`;
  const response = await axios.get(urlGet);

  return response;
}

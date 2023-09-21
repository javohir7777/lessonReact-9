import axios from "axios";

export const requist = axios.create({
  baseURL: "https://650aee4adfd73d1fab09363e.mockapi.io",
  timeout: 10000,
});

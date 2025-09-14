import axios from "axios";

export const endpoint = axios.create({
  baseURL: process.env.SERVER_BASE_URL as string,
});

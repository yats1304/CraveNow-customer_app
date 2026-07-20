import { ENV } from "@/config";
import axios from "axios";

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshApi = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";

export const axiosCalcInstance = axios.create({
  baseURL: "http://localhost:5000",
});

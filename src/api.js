import axios from "axios";

export const joinApi = axios.create({
  baseURL: "http://192.168.0.239:6111",
});

export let headers = {
  Authorization: `${
    localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : ""
  }`,
};

export let authApi = axios.create({
  baseURL: "http://192.168.0.239:6111",
  headers: headers,
});

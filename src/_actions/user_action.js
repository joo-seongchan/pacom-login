import { authApi, joinApi } from "../api";
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from "./types";

export const loginUser = (dataToSubmit) => {
  const request = joinApi.post("/login", dataToSubmit).then((res) => res);
  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = (dataToSubmit) => {
  const request = joinApi
    .post(`/join`, null, { params: dataToSubmit })
    .then((res) => res.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const auth = async () => {
  const request = await authApi
    .get(`/api/v1/user/check`, {
      headers: {
        Authorization: `${
          localStorage.getItem("Authorization")
            ? localStorage.getItem("Authorization")
            : ""
        }`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return {
    type: AUTH_USER,
    payload: request,
  };
};

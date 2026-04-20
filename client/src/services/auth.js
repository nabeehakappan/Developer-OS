import API from "./api";

export const signup = (data) => API.post("/auth/signup", data);

export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  localStorage.setItem("token", res.data.token);
};
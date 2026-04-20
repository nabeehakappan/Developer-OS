import API from "./api";

export const getDesktop = async () => {
  const res = await API.get("/desktop");
  return res.data;
};

export const saveDesktop = (config) => {
  return API.post("/desktop", config);
};
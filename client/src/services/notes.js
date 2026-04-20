import API from "./api";

export const getNotes = async () => {
  const res = await API.get("/notes");
  return res.data;
};

export const saveNotes = (content) => {
  return API.post("/notes", { content });
};
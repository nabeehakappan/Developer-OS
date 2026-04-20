// src/services/auth.js
import axios from "axios";

const API = "http://localhost:5000/api/auth";

// SIGNUP
export const signup = async (data) => {
  const res = await axios.post(`${API}/signup`, data);
  return res.data;
};

// LOGIN
export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);

  // 🔥 IMPORTANT: store token
  localStorage.setItem("token", res.data.token);

  return res.data;
};
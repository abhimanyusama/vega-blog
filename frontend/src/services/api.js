import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if different
});

export const signup = (formData) =>
  API.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const login = (data) => API.post("/auth/login", data);

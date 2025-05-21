import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const signup = (formData) => API.post("/auth/signup", formData); 


export const login = (data) => API.post("/auth/login", data);
// Add these blog API functions

export const getAllBlogs = () => API.get("/blogs");
export const createBlog = (formData) =>
  API.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const getBlogById = (id) => API.get(`/blogs/${id}`);
export const updateBlog = (id, data) =>
  API.put(`/blogs/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  


export const deleteBlog = (id) =>
  API.delete(`/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

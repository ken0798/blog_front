import axios from "axios";

export async function getAllBlogs() {
  return await axios.get("/blog");
}

export async function authUser() {}

export async function registerUser() {}

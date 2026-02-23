import { setToken, removeToken, getToken, parseJwt } from "../../utils/jwt.js";

const API_URL = "http://localhost:3000/api/auth";


export async function login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    setToken(data.token);
    return data;
  }
  

  export async function register(username, password) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  }
  

  export function logout() {
    removeToken();
  }
  

  export function getCurrentUser() {
    const token = getToken();
    if (!token) return null;
    return parseJwt(token);
  }
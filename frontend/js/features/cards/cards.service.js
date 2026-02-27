import { getToken } from "../../utils/jwt.js";
import { CONFIG } from "../../config/config.js";

const API_URL = "http://localhost:3000/api/cards";

export async function fetchCards(page = 1, limit = 9) {
  const token = getToken();
  const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.CARDS}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return null;
  return await response.json();
}
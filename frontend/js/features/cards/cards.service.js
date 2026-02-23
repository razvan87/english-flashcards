import { getToken } from "../../utils/jwt.js";
import { CONFIG } from "../../config/config.js";

const API_URL = "http://localhost:3000/api/cards";

export async function fetchCards() {
  const token = getToken();
  const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.CARDS, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.data;
}
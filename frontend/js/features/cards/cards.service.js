import { getToken } from "../../utils/jwt.js";
import { CONFIG } from "../../config/config.js";

const API_URL = "http://localhost:3000/api/cards";

export async function fetchCategories() {
  const token = getToken();
  const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.CARDS.CATEGORIES}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Failed to load categories");
  return response.json();
}

export async function fetchCards(page = 1, limit = 9) {
  const token = getToken();
  const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.CARDS.FETCH}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function createCard(cardData) {
  const token = getToken();

  const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.CARDS.FETCH}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });

  if (!response.ok) {
    throw new Error("Failed to create card");
  }

  return await response.json();
}
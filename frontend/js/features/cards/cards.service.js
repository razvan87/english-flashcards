// features/cards/cards.service.js
import { getToken } from "../../utils/jwt.js";

const API_URL = "http://localhost:3000/api/cards";

export async function fetchCards() {
  const token = getToken();
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.data;
}
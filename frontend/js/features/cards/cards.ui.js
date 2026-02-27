// features/cards/cards.ui.js
import { fetchCards } from "./cards.service.js";
import { createCardElement } from "./card.js";

const container = document.getElementById("cards-container");
const paginationContainer = document.getElementById("pagination");

let currentPage = 1;
const limit = 9;

export async function renderCards(page = 1) {
  container.innerHTML = ""; // clear previous cards
  const result = await fetchCards(page, limit);
  if (!result) {
    container.innerHTML = "<p>Unauthorized or failed to load cards.</p>";
    return;
  }

  const { data, page: current, pages } = result;

  data.forEach((card) => {
    const cardEl = createCardElement(card);
    container.appendChild(cardEl);
  });

  renderPagination(current, pages);
}

function renderPagination(currentPage, totalPages) {
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  // Previous
  if (currentPage > 1) {
    const prevBtn = createPageButton("Previous", currentPage - 1);
    paginationContainer.appendChild(prevBtn);
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = createPageButton(i, i);

    if (i === currentPage) {
      btn.classList.add("btn-primary");
    } else {
      btn.classList.add("btn-outline-primary");
    }

    paginationContainer.appendChild(btn);
  }

  // Next
  if (currentPage < totalPages) {
    const nextBtn = createPageButton("Next", currentPage + 1);
    paginationContainer.appendChild(nextBtn);
  }
}

function createPageButton(text, pageNumber) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("btn", "btn-sm", "mx-1");

  button.addEventListener("click", () => {
    currentPage = pageNumber;
    renderCards(currentPage);
  });

  return button;
}
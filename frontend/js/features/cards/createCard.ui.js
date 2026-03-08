// features/cards/createCard.ui.js
import { createCard, fetchCategories } from "./cards.service.js"; // fetchCategories will return JSON array
import { renderCards } from "./cards.ui.js";

const form = document.getElementById("create-card-form");

// ---------- Handle form submit ----------
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const card = {
      text: document.getElementById("card-text").value,
      level: document.getElementById("card-level").value,
      imageUrl: document.getElementById("card-image").value,
      category: document.getElementById("card-category").value,
      meanings: [
        {
          partOfSpeech: document.getElementById("card-pos").value,
          definition: document.getElementById("card-definition").value,
          example: document.getElementById("card-example").value,
        },
      ],
    };

    try {
      await createCard(card);

      // Close modal
      bootstrap.Modal.getInstance(
        document.getElementById("createCardModal")
      ).hide();

      form.reset();
      renderCards(); // refresh cards
    } catch (err) {
      console.error(err);
      alert("Error creating card");
    }
  });
}

// ---------- Build dynamic category dropdown ----------
async function buildCategoryDropdown() {
  const container = document.getElementById("card-category-container");
  if (!container) return;

  try {
    const categories = await fetchCategories(); // should return array of strings

    const select = document.createElement("select");
    select.id = "card-category";
    select.classList.add("form-select");

    // optional placeholder
    const placeholder = document.createElement("option");
    placeholder.textContent = "Select category";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });

    container.appendChild(select);
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    container.textContent = "Failed to load categories";
  }
}

// call it immediately
buildCategoryDropdown();

// ---------- Observe for admin button dynamically ----------
const sidebar = document.getElementById("sidebar");

if (sidebar) {
  // Use MutationObserver to wait for admin button insertion
  const observer = new MutationObserver(() => {
    const openBtn = document.getElementById("open-create-card");
    if (openBtn) {
      const modal = new bootstrap.Modal(
        document.getElementById("createCardModal")
      );

      openBtn.addEventListener("click", () => modal.show());

      // Stop observing once button is found
      observer.disconnect();
    }
  });

  observer.observe(sidebar, { childList: true, subtree: true });
}
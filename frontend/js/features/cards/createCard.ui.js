// features/cards/createCard.ui.js
import { createCard, fetchCategories } from "./cards.service.js";
import { renderCards } from "./cards.ui.js";

const modalElement = document.getElementById("createCardModal");
const createCardModal = modalElement ? new bootstrap.Modal(modalElement) : null;

const form = document.getElementById("create-card-form");
const sidebar = document.getElementById("sidebar");

// ---------- Safety cleanup (prevents grey frozen screen) ----------
if (modalElement) {
  modalElement.addEventListener("hidden.bs.modal", () => {
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  });
}

// ---------- Build category dropdown ----------
async function buildCategoryDropdown() {
  const container = document.getElementById("card-category-container");
  if (!container) return;

  try {
    const categories = await fetchCategories();

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

// ---------- Handle form submit ----------
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ---------- Create FormData ----------
    const formData = new FormData();
    formData.append("text", document.getElementById("card-text").value);
    formData.append("level", document.getElementById("card-level").value);
    const categorySelect = document.getElementById("card-category");
    if (categorySelect) formData.append("category", categorySelect.value);

    // Meanings as JSON string
    const meanings = [
      {
        partOfSpeech: document.getElementById("card-pos").value,
        definition: document.getElementById("card-definition").value,
        example: document.getElementById("card-example").value,
      },
    ];
    formData.append("meanings", JSON.stringify(meanings));

    // Image file
    const imageFile = document.getElementById("card-image-file").files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createCard(formData);
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

// ---------- Open modal from sidebar ----------
if (sidebar) {
  sidebar.addEventListener("click", async (event) => {
    const button = event.target.closest("#open-create-card");
    if (!button) return;

    await buildCategoryDropdown();
    if (createCardModal) createCardModal.show();
  });
}

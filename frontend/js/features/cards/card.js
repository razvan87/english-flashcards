// import { addSpeakButtonListener } from "./speak.js";

// export function createCardElement(card) {

//     // Bootstrap column wrapper
//     const col = document.createElement("div");
//     col.className = "col-12 col-sm-6 col-lg-3";

//     const cardEl = document.createElement("div");
//     cardEl.classList.add("flip-card");
  
//     const cardInner = document.createElement("div");
//     cardInner.classList.add("card-inner");
  
//     // ---------- FRONT ----------
//     const cardFront = document.createElement("div");
//     cardFront.classList.add("card-front");
  
//     const wordText = document.createElement("span");
//     wordText.textContent = card.text;
  
//     const speakBtn = document.createElement("button");
//     speakBtn.classList.add("speak-btn");
//     speakBtn.textContent = "🔊";
  
//     // Speak functionality
//     addSpeakButtonListener(speakBtn, card.text);
  
//     cardFront.appendChild(wordText);
//     cardFront.appendChild(speakBtn);
  
//     // ---------- BACK ----------
//     const cardBack = document.createElement("div");
//     cardBack.classList.add("card-back");
  
//     card.meanings.forEach(m => {
//       const p = document.createElement("p");
  
//       const strong = document.createElement("strong");
//       strong.textContent = `${m.partOfSpeech}: `;
  
//       const definitionText = document.createTextNode(m.definition);
  
//       p.appendChild(strong);
//       p.appendChild(definitionText);
  
//       cardBack.appendChild(p);
//     });
  
//     // ---------- ASSEMBLE ----------
//     cardInner.appendChild(cardFront);
//     cardInner.appendChild(cardBack);
//     cardEl.appendChild(cardInner);
//     col.appendChild(cardEl);
  
//     // Flip behavior
//     cardEl.addEventListener("click", () => {
//       cardEl.classList.toggle("flipped");
//     });
  
//     return col;
//   }

import { addSpeakButtonListener } from "./speak.js";

// Example: userRole can be "admin" or "user", adjust based on your auth
const userRole = localStorage.getItem("userRole") || "user";

export function createCardElement(card) {
  // Bootstrap column wrapper
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-3";

  // Card container
  const cardEl = document.createElement("div");
  cardEl.classList.add("flip-card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  // ---------- FRONT ----------
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  // Word text
  const wordText = document.createElement("h4");
  wordText.textContent = card.text;
  wordText.style.marginBottom = "10px";

  // Optional image
  if (card.imageUrl) {
    const img = document.createElement("img");
    img.src = card.imageUrl;
    img.alt = card.text;
    img.style.width = "100%";
    img.style.borderRadius = "5px";
    img.style.marginBottom = "8px";
    cardFront.appendChild(img);
  }

  // Speak button
  const speakBtn = document.createElement("button");
  speakBtn.classList.add("speak-btn");
  speakBtn.textContent = "🔊";
  addSpeakButtonListener(speakBtn, card.text);

  cardFront.appendChild(wordText);
  cardFront.appendChild(speakBtn);

  // ---------- BACK ----------
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  // Meanings
  card.meanings.forEach(m => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${m.partOfSpeech}: `;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(m.definition));
    cardBack.appendChild(p);
  });

  // ---------- Card actions ----------
  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  // Favorite button
  const favBtn = document.createElement("button");
  favBtn.textContent = "⭐";
  favBtn.title = "Mark as favorite";
  favBtn.className = "btn btn-sm btn-outline-warning me-1";
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    card.isFavorite = !card.isFavorite;
    favBtn.classList.toggle("active", card.isFavorite);
  });
  actions.appendChild(favBtn);

  // Learned button
  const learnedBtn = document.createElement("button");
  learnedBtn.textContent = "✅";
  learnedBtn.title = "Mark as learned";
  learnedBtn.className = "btn btn-sm btn-outline-success me-1";
  learnedBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    card.isLearned = !card.isLearned;
    learnedBtn.classList.toggle("active", card.isLearned);
  });
  actions.appendChild(learnedBtn);

  // Admin actions
  if (userRole === "admin") {
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.title = "Edit card";
    editBtn.className = "btn btn-sm btn-outline-info me-1";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      alert(`Edit card: ${card.text}`);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.title = "Delete card";
    deleteBtn.className = "btn btn-sm btn-outline-danger";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      alert(`Delete card: ${card.text}`);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
  }

  cardBack.appendChild(actions);

  // ---------- ASSEMBLE ----------
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardEl.appendChild(cardInner);
  col.appendChild(cardEl);

  // Flip behavior
  cardEl.addEventListener("click", () => {
    cardEl.classList.toggle("flipped");
  });

  return col;
}

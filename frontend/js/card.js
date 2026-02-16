import { addSpeakButtonListener } from "./speak.js";

export function createCardElement(card) {

    // Bootstrap column wrapper
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";

    const cardEl = document.createElement("div");
    cardEl.classList.add("flip-card");
  
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
  
    // ---------- FRONT ----------
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
  
    const wordText = document.createElement("span");
    wordText.textContent = card.text;
  
    const speakBtn = document.createElement("button");
    speakBtn.classList.add("speak-btn");
    speakBtn.textContent = "🔊";
  
    // Speak functionality
    addSpeakButtonListener(speakBtn, card.text);
  
    cardFront.appendChild(wordText);
    cardFront.appendChild(speakBtn);
  
    // ---------- BACK ----------
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
  
    card.meanings.forEach(m => {
      const p = document.createElement("p");
  
      const strong = document.createElement("strong");
      strong.textContent = `${m.partOfSpeech}: `;
  
      const definitionText = document.createTextNode(m.definition);
  
      p.appendChild(strong);
      p.appendChild(definitionText);
  
      cardBack.appendChild(p);
    });
  
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
  
import { bindAuthForms } from "./features/auth/auth.ui.js";
import { displayUserAuth } from "./features/navbar/navbar.ui.js";
import { renderCards } from "./features/cards/cards.ui.js";
import "./features/cards/createCard.ui.js"; // just to bind the create card form

debugger;
bindAuthForms();
displayUserAuth();
renderCards();
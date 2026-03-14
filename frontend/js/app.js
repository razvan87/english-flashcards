import { bindAuthForms } from "./features/auth/auth.ui.js";
import { displayUserAuth } from "./features/navbar/navbar.ui.js";
import { renderCards } from "./features/cards/cards.ui.js";
import { renderGuestCarousel } from "./features/cards/guestCarousel.ui.js";
import { getToken } from "./utils/jwt.js";
import "./features/cards/createCard.ui.js"; // just to bind the create card form

bindAuthForms();
displayUserAuth();

if (getToken()) {
  renderCards();        // authenticated users
} else {
  renderGuestCarousel(); // guests
}
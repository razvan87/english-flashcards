import express from 'express';
import { createCard, getCards } from '../controllers/cardController.js';

const router = express.Router();

// @route POST api/cards
router.post("/", createCard);

//@rout GET api/cards
router.get("/", getCards);

export default router;
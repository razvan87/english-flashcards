import express from 'express';
import { createCard, getCards } from '../controllers/cardController.js';

const router = express.Router();

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all cards
 *     responses:
 *       200:
 *         description: List of cards
 */
router.get("/", getCards);

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               level:
 *                 type: string
 *                 enum: [A1, A2, B1, B2, C1, C2]
 *               category:
 *                 type: string
 *               meanings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     partOfSpeech:
 *                       type: string
 *                     definition:
 *                       type: string
 *                     example:
 *                       type: string
 *     responses:
 *       201:
 *         description: Card created
 */
router.post("/", createCard);

export default router;
import express from 'express';
import { createCard, getCards } from '../controllers/cardController.js';

const router = express.Router();

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all flashcards
 *     description: Retrieve flashcards with optional filtering, search, sorting and pagination.
 *     tags:
 *       - Cards
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [All, Animals, Food, Colors, Clothes, Nature, Transport, People, House, Work, School, Sports, Technology, Weather, Health, Travel]
 *         description: Filter by category
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [A1, A2, B1, B2, C1, C2]
 *         description: Filter by CEFR level
 *       - in: query
 *         name: partOfSpeech
 *         schema:
 *           type: string
 *           enum: [noun, verb, adjective, adverb, phrase]
 *         description: Filter by part of speech inside meanings
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Case-insensitive search by text field
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Sort field (prefix with '-' for descending)
 *     responses:
 *       200:
 *         description: Paginated list of cards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 57
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 6
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Card'
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
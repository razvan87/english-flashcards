/**
 * @swagger
 * components:
 *   schemas:
 *     Meaning:
 *       type: object
 *       properties:
 *         partOfSpeech:
 *           type: string
 *           enum: [noun, verb, adjective, adverb, phrase]
 *         definition:
 *           type: string
 *         example:
 *           type: string
 *     Card:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         text:
 *           type: string
 *         imageUrl:
 *           type: string
 *         level:
 *           type: string
 *           enum: [A1, A2, B1, B2, C1, C2]
 *         category:
 *           type: string
 *         meanings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Meaning'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
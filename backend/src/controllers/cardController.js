import Card from "../models/Card.js";

//Post api/cards

export const createCard = async (req, res) => {
    try {
        const { text, imageUrl, level, meanings, category } = req.body;

        const newCard = new Card({
            text,
            imageUrl,
            level,
            meanings,
            category
        });

        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        console.error("Error creating card:", error);
        res.status(500).json({ message: "Server error" });
    }
}

//Get api/cards
export const getCards = async (req, res) => {
    try {
        const cards = await Card.find().populate("category", "name");
        res.json(cards);
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ message: "Server error" });
    }
}
import Card from "../models/Card.js";

//GET categories
export const getCategories = async (req, res) => {
  const categories = Card.schema.path("category").enumValues;
  res.json(categories);
}

//POST api/cards
export const createCard = async (req, res) => {
  try {
    const { text, level, meanings, category } = req.body;

    // Multer saves the file info in req.file
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // or your public URL path
    }  

    // meanings come as JSON string, parse it
    const parsedMeanings = typeof meanings === "string" ? JSON.parse(meanings) : meanings;

    const newCard = new Card({
      text,
      imageUrl,
      level,
      meanings: parsedMeanings,
      category,
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ message: "Server error"  + error.message });
  }
};

// GET /api/cards
export const getCards = async (req, res) => {
  try {
    const {
      category,
      level,
      partOfSpeech,
      search,
      sort = "createdAt",
    } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const filter = {};

    // Filter by category
    if (category && category !== "All") {
      filter.category = category;
    }

    // Filter by level
    if (level) {
      filter.level = level;
    }

    // Filter by partOfSpeech inside meanings array
    if (partOfSpeech) {
      filter["meanings.partOfSpeech"] = partOfSpeech;
    }

    // Search by text (case insensitive)
    if (search) {
      filter.text = {
        $regex: search,
        $options: "i",
      };
    }

    const skip = (page - 1) * limit;

    const cards = await Card.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Card.countDocuments(filter);

    const host = `${req.protocol}://${req.get("host")}`;
    const cardsWithFullImages = cards.map(card => {
      const cardObj = card.toObject();
      if (cardObj.imageUrl) {
        cardObj.imageUrl = `${host}${cardObj.imageUrl}`;
      }
      return cardObj;
    });

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: cardsWithFullImages,
    });
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Server error" });
  }
};

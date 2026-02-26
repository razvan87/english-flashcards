import mongoose from "mongoose";

const meaningSchema = new mongoose.Schema(
  {
    partOfSpeech: {
      type: String,
      enum: ["noun", "verb", "adjective", "adverb", "phrase"],
      required: true,
    },

    definition: {
      type: String,
      required: true,
    },

    example: {
      type: String,
      required: true,
    },
  },
  { _id: false } // not necessary to have an _id for each meaning, since they are subdocuments of Card
);

const cardSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    imageUrl: {
      type: String,
    },

    level: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
      required: true,
    },

    meanings: {
      type: [meaningSchema],
      required: true,
      validate: [(v) => v.length > 0, "At least one meaning is required"],
    },

    category: {
        type: String,
        enum: [
          "All",        // special category for all words
          'Academic',
          "Animals",
          "Business",
          "Career",
          "Clothes",
          "Colors",
          "Communication",
          "Critical Thinking",
          "Emotions",
          "Environment",
          "Food",
          "General",
          "Language",
          "Lifestyle",
          "Nature",
          "Transport",
          "People",
          "Psychology",
          "House",
          "Work",
          "School",
          "Sports",
          "Technology",
          "Weather",
          "Health",
          "Travel",
          "Education",
          "Entertainment",
          "Other",
          "Personal Growth",
        ],
        required: false,
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Card", cardSchema);

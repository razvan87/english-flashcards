import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchima = new mongoose.Schema(
    {
        username : {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlenght: 6,
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchima);
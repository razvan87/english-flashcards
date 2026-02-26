import express from 'express';
import authRoutes from "./routes/authRoutes.js";
import cardRoutes from './routes/cardRoutes.js';
import cors from 'cors';
import path from 'path';


const app = express();

app.use("/uploads", express.static(path.join("uploads")));

const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ];

  app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true); // requests like curl/postman
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // allow this origin
      } else {
        callback(new Error("Not allowed by CORS")); // block others
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"]
  }));

// middleware to read JSON
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

export default app;
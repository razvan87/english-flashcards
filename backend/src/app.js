import express from 'express';
import cardRoutes from './routes/cardRoutes.js';

const app = express();

// middleware to read JSON
app.use(express.json());

// routes
app.use("/api/cards", cardRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});

export default app;
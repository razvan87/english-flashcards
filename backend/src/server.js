import "dotenv/config";
import app from './app.js';
import connectDB from './config/db.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";

const PORT = process.env.PORT || 3000;

// connect to DB first
connectDB();

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
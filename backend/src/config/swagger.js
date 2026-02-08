import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "English Flashcards API",
      version: "1.0.0",
      description: "API documentation for English Flashcards app",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // files containing annotations
};

const specs = swaggerJsdoc(options);

export default specs;

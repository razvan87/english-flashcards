# 📚 English Flashcards

A full-stack ready HTML, CSS, JavaScript, Node.js + Express + MongoDB application for managing English vocabulary flashcards.
This project allows you to create, store, and retrieve structured English vocabulary cards.  
Each card can contain a word or phrase, difficulty level (A1 → C2), image (optional), multiple meanings (based on part of speech), usage examples, and optional category.

---

## Card Structure

**Each flashcard contains:**

    text → The word or phrase

    level → CEFR level (A1, A2, B1, B2, C1, C2)

    imageUrl → Optional image

    meanings[] → Array of meanings:

    partOfSpeech → noun | verb | adjective | adverb | phrase

    definition

    example

    category → Optional predefined category

    timestamps → Automatically generated

## **Architecture Overview**

**The application follows a clean separation of concerns:**
```text
Client (Frontend)
        ↓
Express REST API
        ↓
Controllers
        ↓
Mongoose Models
        ↓
MongoDB
```

## 🧱 Tech Stack

- **Node.js** (ES Modules)
- **Express**
- **MongoDB**
- **Mongoose**
- **Docker & Docker Compose**
- **Mongo Express** (web UI)
- **Nodemon** (dev mode)

---

## 📂 Project Structure

```text
english-flashcards/
|── .gitignore
├── docker-compose.yml
├── README.md
├── backend/
│   ├── src/
│   │   ├── docs/
│   │   │   └── swaggerSchemas.js    
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── swagger.js
│   │   ├── controllers/
│   │   │   └── cardController.js
│   │   ├── models/
│   │   │   └── Card.js
│   │   ├── routes/
│   │   │   └── cardRoutes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│   └── node_modules
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js                  # bootstrap/init
│       │
│       ├── features/
│       │   ├── auth/
│       │   │   ├── auth.service.js  # login/register/logout logic + token storage
│       │   │   └── auth.ui.js       # login/register forms + event binding
│       │   │
│       │   ├── cards/
│       │   │   ├── cards.service.js # fetch cards
│       │   │   └── cards.ui.js      # render cards
│       │   │
│       │   └── navbar/
│       │       └── navbar.ui.js     # displayUserAuth / update navbar DOM
│       │
│       └── utils/
│           └── jwt.js              # parseJwt + token helpers
│

```

## **Start the MongoDB & Backend**

From the project root, run:
    `docker-compose up --build`

**This will start:**

    MongoDB → port 27017

    Mongo Express → port 8081

    Backend (Node.js/Express) → port 3000

To check if the container is up and running please use command:
    `docker ps`    

To stop the docker process please use command:
    `docker-compose down`    


## **Access the MongoDB:**

1. You can access the DB via Monga Express UI: 

    **Open in browser:**
    http://localhost:8081

        Login:
            user: admin
            password: admin

2. Or using MongoDB shell (sau mongosh), commands:

    ```text
    "docker exec -it mongo mongosh"

    "use flashcards"

    "db.cards.find().pretty()"

    ```

## **Start the Backend (Development):**

Backend already runs in Docker via `docker-compose`.

Hot reload enabled via volume mapping.
`Local changes in backend/src/ will automatically reload backend (nodemon).
`

## **Start the Frontend (Development):**

Since the front-end uses ES Modules, it cannot be opened directly via file://. You need to serve it via a local server:

**## Option 1: live-server (quick):**

    cd frontend

    live-server --port=5500

    Frontend available at: http://localhost:5500

    Fetches backend API at http://localhost:3000/api/cards


**## Option 2: small Express server:**

    cd frontend

    node server.js

    Serves frontend at http://localhost:5500

    Supports ES modules and fetch requests to backend.

## **Use Swagger** 
You can open the following link for swagger:

    `http://localhost:3000/api-docs`\


## **Create new card using curl**

```text
curl -X POST http://localhost:3000/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "text": "run",
    "level": "A1",
    "imageUrl": "https://example.com/run.png",
    "meanings": [
      {
        "partOfSpeech": "verb",
        "definition": "to move quickly using your legs",
        "example": "I run every morning"
      }
    ],
    "category": "Sports"
  }'
  ```

  **Categories Available:**
  Categories Available

    Animals

    Food

    Colors

    Clothes

    Nature

    Transport

    People

    House

    Work

    School

    Sports

    Technology

    Weather

    Health

    Travel

    Personal Growth

    All (special global category)

**Run the seeds**    

If you want to have a some minimal data into mongo db and displayed in frontend, please run the following command that will inject into mongo an **admin user (user: admin, pass: admin123)** and some cards for testing purposes.

    docker exec -it backend node seed/seed.js   
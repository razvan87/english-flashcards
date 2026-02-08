# 📚 English Flashcards

A Node.js + Express + MongoDB application for managing English vocabulary flashcards.  
Each card can contain a word or phrase, difficulty level (A1 → C2), image (optional), multiple meanings (based on part of speech), usage examples, and optional category.

---

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
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
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
│   └── nodemon.json

```


In project's root folder (where is docker-compose.yml file) please run the following command to start the mongoDB and mongoExpress container:
    `docker-compose up -d`


## **MongoDB:**

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

## **Starting the app:**

To run the node app, please move into backend filder and then run the following command:

    `npm run dev`
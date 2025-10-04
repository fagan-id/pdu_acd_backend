# acd_backend

Backend API for **PDU Automated Cutting Description**.

---

## 🛠 Tech Stack

- **Backend:** Node.js + Express.js  
- **Database ORM:** Prisma  
- **Database:** PostgreSQL (Supabase)

---

## 🚀 Features

- JWT-based authentication (stateless)  
- API endpoints for:
  - **Analysis Result**
  - **Wells**
  - **Auth**

---

## ⚡ Installation & Setup

1. **Clone the repository**  
   ``` git clone <your-repo-url> ```
   ``` cd acd_backend bash```

2. **Install dependencies**
    ``` npm install ```
3. **Configure environment variables**
    Create a .env file in the root folder with the following variables:\\
    ``` PORT=5000 ```\\
    ``` DATABASE_URL="postgresql://username:password@host:port/dbname?sslmode=require" ```\\
    ``` DIRECT_URL="postgresql://username:password@host:port/dbname?sslmode=require" ```\\
    ``` JWT_SECRET=your_jwt_secret ```\\
4. **Set up Prisma & migrate database**\\
    ``` npx prisma migrate dev ```\\
    ```npx prisma generate ```\\

## 🏃  Usage
Start the server:
``` npm run dev ```
Make sure your database is running and connected before starting the server.

You can then access the API endpoints using tools like Postman or cURL.

##  📦 API Endpoints Overview

- Auth: ```/api/auth```
    - Login / Register
    - JWT-based token authentication

- Wells: ```/api/wells```
    - Retrieve well data

- Analysis Result: ```/api/analysis```
    - Fetch analysis results, optionally filtered by well

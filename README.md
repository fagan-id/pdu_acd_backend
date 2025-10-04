# acd_backend

Backend API for **PDU Automated Cutting Description**.

- **Deployed At** : https://pdu-acd-backend.vercel.app/
- **Postman**  : 
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/39802261-1fdcba60-ed08-4943-b29e-5e8f800a0e74?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D39802261-1fdcba60-ed08-4943-b29e-5e8f800a0e74%26entityType%3Dcollection%26workspaceId%3D6b8b3fde-0902-4cdb-b90a-3bb8039f8a70)
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

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd acd_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root folder with the following variables:

```env
PORT=5000
DATABASE_URL="postgresql://username:password@host:port/dbname?sslmode=require"
DIRECT_URL="postgresql://username:password@host:port/dbname?sslmode=require"
JWT_SECRET=your_jwt_secret
```

### 4. Set up Prisma & migrate database

```bash
npx prisma migrate dev
npx prisma generate
```

---

## 🏃 Usage

Start the server:

```bash
npm run dev
```

Make sure your database is running and connected before starting the server.

You can then access the API endpoints using tools like Postman or cURL.

---

## 📦 API Endpoints Overview

### Auth: `/api/auth`
- Login / Register
- JWT-based token authentication

### Wells: `/api/wells`
- Retrieve well data

### Analysis Result: `/api/analysis`
- Fetch analysis results, optionally filtered by well

---

## 📝 License

[Add your license information here]

## 🤝 Contributing

[Add contributing guidelines here]
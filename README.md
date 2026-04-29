# 📌 Simple Q&A Forum API (NestJS + Prisma)

A RESTful API for a simple Q&A forum application using **NestJS** and **Prisma ORM**.
This application allows users to create threads (questions) and manage only their own threads using JWT authentication.

[API Docs](https://inge-salim-s-team.docs.buildwithfern.com/milestone-2/get-all-threads)

---

## 🚀 Tech Stack

* **Framework**: NestJS
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Authentication**: JWT (Passport JWT)
* **Validation**: class-validator
* **Documentation**: Postman

---

## 📂 Features

### 🔐 Authentication & User

* Register user (password di-hash menggunakan bcrypt)
* Login user (generate JWT)
* Get user profile by ID

### 🧵 Threads

* Create thread (authenticated)
* Get all threads (public)
* Get thread by ID
* Get my threads (authenticated)
* Update thread (owner only)
* Delete thread (owner only)

---

## 🗂️ Database Schema (Prisma)

```prisma
model User {
  id            String   @id @default(uuid()) @db.Uuid
  username      String   @unique
  email         String   @unique
  password_hash String
  refresh_token String?
  created_at    DateTime @default(now())

  threads       Thread[]
}

model Thread {
  id         String   @id @default(uuid()) @db.Uuid
  user_id    String   @db.Uuid
  title      String
  content    String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  user       User @relation(fields: [user_id], references: [id])
}
```

---


## Screen Shots
# DIAGRAM
![Diagram](https://i.imgur.com/Ko5thqI.jpeg)

# EXAMPLE
![Register](https://i.imgur.com/smaZvWL.jpeg)
![LogIn](https://i.imgur.com/49zHPqY.jpeg)
![Get Profile](https://i.imgur.com/DgIEEAf.jpeg)

---


## 📦 Installation & Setup

```bash
# clone repo
git clone https://github.com/ingenioust91/CODE_CHALLENGE-2.git

cd your-repo

# install dependencies
npm install

# setup prisma
npx prisma generate
npx prisma migrate dev --name init

# run app
npm run start:dev
```

---

## 🔑 Authentication

Gunakan JWT Token di header:

```http
Authorization: Bearer <access_token>
```

---

## 📡 API Endpoints

### 🔐 Auth

#### Register

```http
POST /api/auth/register
```

Body:

```json
{
  "email": "user@mail.com",
  "password": "password123"
}
```

Response:

* `201 Created`
* `400 Bad Request`

---

#### Login

```http
POST /api/auth/login
```

Response:

```json
{
  "access_token": "jwt_token"
}
```

---

### 👤 User

#### Get User Profile

```http
GET /api/users/:id
```

Response:

* `200 OK`
* `404 Not Found`

---

### 🧵 Threads

#### Create Thread ✅

```http
POST /api/threads
```

Headers:

```http
Authorization: Bearer token
```

Body:

```json
{
  "title": "How to use Prisma?",
  "content": "I need help with relations..."
}
```

---

#### Get All Threads ❌

```http
GET /api/threads
```

---

#### Get My Threads ✅

```http
GET /api/threads/my-threads
```

---

#### Get Thread by ID ❌

```http
GET /api/threads/:id
```

---

#### Update Thread ✅ (Owner Only)

```http
PUT /api/threads/:id
```

---

#### Delete Thread ✅ (Owner Only)

```http
DELETE /api/threads/:id
```

---

## 🔒 Authorization Logic

* Endpoint yang butuh login menggunakan **JwtAuthGuard**
* Validasi ownership dilakukan dengan:

  * membandingkan `thread.userId` dengan `req.user.id`

Jika tidak sesuai:

* `403 Forbidden`

---

## 🧠 Validation

DTO + class-validator:

Contoh:

```ts
export class CreateThreadDto {
  @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title! : string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    content! : string
}
```

---

## 📸 API Documentation (Postman)

Tersedia di:

```bash
http://
```

📌 Screenshot:



---

## 📁 Project Structure

```bash
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│
├── threads/
│   ├── threads.controller.ts
│   ├── threads.service.ts
│   ├── threads.repository.ts
│
├── prisma/
│   ├── prisma.service.ts
│
│
└── main.ts
```

---

## 🔐 Security Notes

* Password di-hash menggunakan **bcrypt**
* Tidak expose password di response
* Memakai `.env` untuk semua secret
* Memakai guard untuk proteksi route

---

## 🧪 Testing Tools

* Postman

---

## 👨‍💻 Author

**Inge Salim**
 Inventory Management System API

REST API untuk aplikasi Inventory Management yang dibangun menggunakan Express.js, MySQL, JWT Authentication, dan bcrypt.

 Features

 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Profile Route

 Product Management

* Create Product
* Get All Products
* Get Product By ID
* Update Product
* Delete Product

---

 Tech Stack

* Node.js
* Express.js
* MySQL
* JWT (JSON Web Token)
* bcrypt
* mysql2
* dotenv
* cors

---

 Installation

 Clone Repository

```bash
git clone <your-repository-url>
cd backend
```

 Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name

JWT_SECRET=your_jwt_secret
```

 Run Development Server

```bash
npm run dev
```

 Run Production Server

```bash
npm start
```

---

 Database Schema

 Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

 Products Table

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

 API Endpoints

 Authentication

 Register

**POST**

```http
/api/auth/register
```

Request Body

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "password123"
}
```

---

 Login

**POST**

```http
/api/auth/login
```

Request Body

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

---

 Profile

**GET**

```http
/api/auth/profile
```

Headers

```http
Authorization: Bearer YOUR_TOKEN
```

---

 Products

 Get All Products

**GET**

```http
/api/products
```

 Get Product By ID

**GET**

```http
/api/products/:id
```

 Create Product

**POST**

```http
/api/products
```

Request Body

```json
{
  "name": "Keyboard",
  "sku": "KEY001",
  "description": "Mechanical Keyboard",
  "price": 500000,
  "stock": 10
}
```

 Update Product

**PUT**

```http
/api/products/:id
```

 Delete Product

**DELETE**

```http
/api/products/:id
```

---

 Project Structure

```txt
src/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── productController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
└── app.js
```

---
 Author

**Ilyas Habibullah**

Backend Developer | Node.js | Express.js | MySQL

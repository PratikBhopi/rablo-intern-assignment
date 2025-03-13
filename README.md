# Rablo Assignment

## Overview

This project is a simple API for managing products and users. It uses Node.js, Express, and MongoDB.

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Create a `.env` file and add the following environment variables:
    ```
    PORT=your_port
    MONGO_URI=your_mongo_uri
    JWT_SECRET_KEY=your_jwt_secret_key
    ```

4. Start the server using `npm start`

## API Endpoints

### User Routes

#### Register User
- **URL:** `/api/user/register`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response:**
    - `201 Created` on success
    - `400 Bad Request` if validation fails or user already exists

#### Login User
- **URL:** `/api/user/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response:**
    - `200 OK` on success
    - `400 Bad Request` if validation fails
    - `404 Not Found` if user does not exist
    - `401 Unauthorized` if password is incorrect

### Product Routes

#### Add Product
- **URL:** `/api/product/add-product`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
    ```json
    {
        "productId": "string",
        "name": "string",
        "price": "number",
        "featured": "boolean",
        "rating": "number",
        "createdAt": "date",
        "company": "string"
    }
    ```
- **Response:**
    - `201 Created` on success
    - `400 Bad Request` if required fields are missing or product already exists
    - `500 Internal Server Error` on server error

#### Get All Products
- **URL:** `/api/product/all`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    - `200 OK` on success
    - `500 Internal Server Error` on server error

#### Update Product
- **URL:** `/api/product/update-product/:id`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
    ```json
    {
        "values": {
            "field": "value"
        }
    }
    ```
- **Response:**
    - `200 OK` on success
    - `500 Internal Server Error` on server error

#### Delete Product
- **URL:** `/api/product/delete-product/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    - `200 OK` on success
    - `500 Internal Server Error` on server error

#### Get Featured Products
- **URL:** `/api/product/featured`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    - `200 OK` on success
    - `500 Internal Server Error` on server error

#### Get Products by Price
- **URL:** `/api/product/price/:value`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    - `200 OK` on success
    - `500 Internal Server Error` on server error

#### Get Products by Rating
- **URL:** `/api/product/rating/:value`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
    - `200 OK` on success
    - `500 Internal Server Error` on server error

## Models

### User Model
- **Fields:**
    - `name`: String, required
    - `email`: String, required
    - `password`: String, required, select: false
- **Methods:**
    - `generateAuthToken()`: Generates JWT token
    - `comparePassword(password)`: Compares given password with hashed password
- **Statics:**
    - `hashPassword(password)`: Hashes the given password

### Product Model
- **Fields:**
    - `productId`: String, required, unique
    - `name`: String, required
    - `price`: Number, required
    - `featured`: Boolean, default: false
    - `rating`: Decimal128
    - `createdAt`: Date, required, default: Date.now
    - `company`: String, required

## Middlewares

### Auth Middleware
- **Function:** `authUser`
- **Description:** Verifies JWT token and attaches user to request object
- **Usage:** Applied to routes that require authentication

## Controllers

### User Controller
- **Functions:**
    - `registerUser(req, res, next)`: Registers a new user
    - `loginUser(req, res)`: Logs in a user

### Product Controller
- **Functions:**
    - `addProduct(req, res)`: Adds a new product
    - `getAllProducts(req, res)`: Retrieves all products
    - `updateProduct(req, res)`: Updates a product by ID
    - `deleteProduct(req, res)`: Deletes a product by ID
    - `getFeaturedProducts(req, res)`: Retrieves featured products
    - `getProductsByPrice(req, res)`: Retrieves products by price
    - `getProductsByRating(req, res)`: Retrieves products by rating
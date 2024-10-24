### Invoice Generator

An Invoice Generator application built with Express.js for handling user registration, login, and product invoice download. The app is secured using authentication middleware for accessing certain routes.

## Features

- User Registration and Login
- Add Products (authenticated route)
- Download Invoices
- Secured with JWT authentication

# Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (for authentication)
- CORS
- dotenv (for environment variables)

## Installation

1. Clone the repository:

   git clone https://github.com/your-username/invoice-generator.git
   cd invoice-generator

2. Install dependencies:

   npm install

3. Set up environment variables: Create a .env file in the root of your project and add the following:

PORT=8000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_key

4. Start the server:

npm start
The server will run at http://localhost:8000.

# API Endpoints

User Routes (/api/user)

- POST /register: Register a new user.

{
"username": "your-username",
"email": "your-email",
"password": "your-password"
}

- POST /login: Authenticate a user.

{
"email": "your-email",
"password": "your-password"
}

# Product Routes (/api/product)

- POST /invoice-download: Add a product and generate an invoice (authentication required).

  Requires a valid JWT token in the headers

  Authorization: Bearer <your-jwt-token>

- Middleware

authTokenHandler: Middleware to verify the JWT token and protect routes from unauthorized access.

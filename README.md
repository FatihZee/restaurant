# Restaurant Management Backend

## About This Project
Restaurant is a backend system designed using **Node.js** and **Express** to help manage restaurant data such as menus, orders, and reservations. The system exposes a set of API endpoints for managing the various restaurant operations, making it ideal for use with a front-end application or mobile app.

## Features
- **Menu Management**: CRUD operations to manage menu items (add, update, delete).
- **Order Management**: Track and manage customer orders.
- **Reservation System**: Manage customer reservations by storing reservation details.
- **JWT Authentication**: Secure access for restaurant staff and admins using JSON Web Tokens.
- **RESTful API**: Exposes endpoints to handle menu items, orders, and reservations.

## Project Structure
```
📂 restaurant-backend  
 ┣ 📂 controllers     # API logic for handling restaurant data  
 ┣ 📂 models          # Mongoose models for menus, orders, and reservations  
 ┣ 📂 routes          # API route definitions  
 ┣ 📂 middleware      # Middleware for authentication and error handling  
 ┣ 📜 app.js          # Main Express app setup  
 ┣ 📜 config.js       # Configuration for environment variables  
 ┣ 📜 .env            # Environment configuration  
 ┣ 📜 package.json    # Project dependencies  
 ┣ 📜 README.md       # Project documentation  
```
```

## How to Run
1. Clone this repository:
   ```
   git clone <REPO_URL>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   DB_URI=<your_mongo_db_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open the app in your browser at `http://localhost:3000`.

## API Endpoints
- **POST** `/api/menus` - Add a new menu item.
- **GET** `/api/menus` - Get all menu items.
- **GET** `/api/menus/:id` - Get a specific menu item by ID.
- **PUT** `/api/menus/:id` - Update an existing menu item.
- **DELETE** `/api/menus/:id` - Delete a menu item.
- **POST** `/api/orders` - Create a new order.
- **GET** `/api/orders` - Get all orders.
- **GET** `/api/orders/:id` - Get a specific order by ID.
- **POST** `/api/reservations` - Create a new reservation.
- **GET** `/api/reservations` - Get all reservations.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose for data modeling)
- **JWT** (JSON Web Tokens) for authentication
- **Body-parser** for parsing JSON request bodies

## Usage Example
- To create a new menu item, send a `POST` request to `/api/menus` with data like:
  ```json
  {
    "name": "Pizza Margherita",
    "description": "Classic pizza with tomatoes, mozzarella, and basil.",
    "price": 12.99,
    "availability": true
  }
  ```
- To place an order, send a `POST` request to `/api/orders` with:
  ```json
  {
    "customerName": "John Doe",
    "items": [
      { "menuId": "60f4a7b6d8f5b8a1b60c5b0f", "quantity": 2 }
    ],
    "status": "pending"
  }
  ```

## Future Improvements
- Add order tracking with status updates (e.g., preparing, ready for pickup).
- Implement payment integration (e.g., Stripe or PayPal).
- Enhance reservation system with date/time availability checking.

This project provides a simple yet powerful backend for restaurant management. Customize and extend the features to meet your specific needs.


# Nufu Store - Fullstack E-commerce Application

Nufu Store is a full-stack e-commerce application built with React, Redux, and Node.js. It provides a seamless shopping experience with features like product browsing, cart management, wishlist, user authentication, and payment integration.

## Features

### Client-Side
- **React**: Frontend built with React and Vite for fast development.
- **Redux Toolkit**: State management for cart, wishlist, and authentication.
- **TailwindCSS**: Responsive and modern UI design.
- **React Router**: Navigation between pages.
- **Axios**: API requests to the backend.
- **Razorpay Integration**: Secure payment gateway for order payments.
- **Toast Notifications**: User feedback for actions like login, cart updates, etc.

### Server-Side
- **Node.js & Express**: Backend server for handling API requests.
- **MongoDB**: Database for storing user, product, and order data.
- **Mongoose**: ODM for MongoDB.
- **JWT Authentication**: Secure user authentication.
- **Multer**: File uploads for product images.
- **Razorpay**: Payment gateway integration.

## Project Structure

### Client
The client-side code is located in the `client` folder:
```
client/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── features/         # Redux slices for state management
│   ├── config/           # Axios configuration
│   ├── app/              # Redux store
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
```

### Server
The server-side code is located in the `server` folder:
```
server/
├── config/               # Database configuration
├── controller/           # Business logic for routes
├── middleware/           # Middleware (e.g., authentication, file uploads)
├── models/               # Mongoose models
├── routes/               # API routes
├── uploads/              # Uploaded files
└── server.js             # Entry point for the server
```

## Installation

### Prerequisites
- Node.js
- MongoDB
- Yarn or npm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nufu-store.git
   cd nufu-store
   ```

2. Install dependencies for the client:
   ```bash
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```bash
   cd ../server
   npm install
   ```

4. Create `.env` files in both `client` and `server` directories:
   -

5. Start the development servers:
   - Client:
     ```bash
     cd client
     npm run dev
     ```
   - Server:
     ```bash
     cd ../server
     npm start
     ```


## Usage

- **Browse Products**: Explore categories and view product details.
- **Cart Management**: Add, update, or remove items from the cart.
- **Wishlist**: Save favorite items for later.
- **Authentication**: Register and log in to access personalized features.
- **Checkout**: Make payments securely using Razorpay.

## Technologies Used

### Frontend
- React
- Redux Toolkit
- TailwindCSS
- Axios
- React Router
- Razorpay Integration

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Razorpay

## License
This project is licensed under the NARS License.

## Acknowledgments
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Razorpay](https://razorpay.com/)
```

Replace placeholders like `your_razorpay_key_id` and `your_mongodb_connection_string` with your actual credentials.

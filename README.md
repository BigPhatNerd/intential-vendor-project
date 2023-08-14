# ColaCo Virtual Vending Machine

## Table of Contents
1. [Background](#background)
2. [Features](#features)
3. [Current Virtual Soda Lineup](#current-virtual-soda-lineup)
   - [Fizz](#fizz)
   - [Pop](#pop)
   - [Cola](#cola)
   - [Mega Pop](#mega-pop)
4. [Setup & Run](#setup--run)
   - [Notes for Testing](#notes-for-testing)
   - [Admin API Routes](#admin-api-routes)
5. [Usage](#usage)
   - [User Interface](#user-interface)
   - [Admin Interface](#admin-interface)
6. [Technologies Used](#technologies-used)
7. [Photo Gallery](#photo-gallery)

---

## Background

ColaCo is launching a new line of virtual sodas and they need a vending machine to vend them virtually. These sodas are unique and scarce, available in limited quantities. The vending machine interface aims to resemble a traditional soda vending machine for an immersive user experience. With every successful purchase, the browser will download a JSON soda file.

## Features

- UI resembling a traditional vending machine.
- Ability to purchase sodas and download them as JSON files.
- Admin API to check machine status and restock.
- Dynamic pricing adjustment.

## Current Virtual Soda Lineup

### Fizz
- **Description**: An effervescent fruity experience with hints of grape and coriander.
- **Cost**: $1
- **Maximum Quantity**: 100

### Pop
- **Description**: An explosion of flavor that will knock your socks off!
- **Cost**: $1
- **Maximum Quantity**: 100

### Cola
- **Description**: A basic no nonsense cola that is the perfect pick me up for any occasion.
- **Cost**: $1
- **Maximum Quantity**: 200

### Mega Pop
- **Description**: Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.
- **Cost**: $1
- **Maximum Quantity**: 50

## Setup & Run

This project is hosted on Heroku at https://intential-vending-7862443e6098.herokuapp.com/

### Notes for Testing

## For testing the purchase functionality, use the following Stripe test card details:

- **Card Number: 4242 4242 4242 4242
- **Expiration Date: Any future date (e.g., 12/26)
- **ZIP Code: Any valid ZIP (e.g., 10001)
- **This card will simulate a successful payment without actually charging any real funds.

## Admin API Routes

- **Check Vending Machine Inventory**:
  - Method: `GET`
  - Endpoint: `/api/products`
 
- **Dispense Item**:
  - Method: `POST`
  - Endpoint: `/api/products/dispense`
  - - Body:
    ```json
    {
    "productId": "<product-id>",
    }
    ```

- **Restock/Change Prices Vending Machine**:
  - Method: `PUT`
  - Endpoint: `/api/products`
  - Body:
    ```json
    {
    "id": "<product-id>",
    "quantity": "<quantity>",
    "priceCents": "<price-cents>",
    "adminID": "<admin-id>"
    }
    ```


    

## Usage

1. **User Interface**:
   - Select your desired virtual soda.
   - Insert virtual money and make a purchase.
   - Upon successful payment, an API call will be made to STRIPE for the amount of the purchase and a JSON file corresponding to the purchased soda will be downloaded.

2. **Admin Interface**:
   - Navigate to the admin panel.
   - Signup/Login
   - Check machine status, restock products, and adjust product prices.
   - **Quantity can only be increased (no stealing 😜) and cannot be over 100.

## Technologies Used

- **Backend**: NodeJS 
- **Frontend**: React.js

---

## Technologies Used

### 1. **Vite**:
Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It serves your code via native ES modules, resulting in faster page reloads. In this project, Vite is used for starting the development server, building the project for production, and previewing the production build.

- [Vite Documentation](https://vitejs.dev/guide/)

### 2. **React**:
React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple.

- [React Documentation](https://reactjs.org/docs/getting-started.html)

### 3. **React-Router-Dom**:
A routing library for React, it allows navigation between different components, changing the browser URL, and modifying the browser history.

- [React-Router-Dom Documentation](https://reactrouter.com/web/guides/quick-start)

### 4. **Bootstrap and React-Bootstrap**:
Bootstrap is a powerful front-end framework for faster and easier web development. React-Bootstrap replaces the Bootstrap JavaScript with React components, facilitating its integration with React projects.

- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [React-Bootstrap Documentation](https://react-bootstrap.netlify.app/getting-started/introduction/)

### 5. **Stripe (React-Stripe-JS and Stripe-JS)**:
Stripe is a technology company that builds economic infrastructure for the internet. In this project, Stripe libraries for React are utilized to handle payments.

- [Stripe Documentation](https://stripe.com/docs/js)

### 6. **Axios**:
Axios is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node.js environment.

- [Axios Documentation](https://axios-http.com/docs/intro)


### 7. **JSON Web Tokens (JWT)**:
JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. In this project, JWT is used for authentication and ensuring secure data transfer.

- [JWT Documentation](https://jwt.io/introduction/)

### 8. **BCRYPT**:
BCRYPT is a password-hashing function designed to build a cryptographically secure hash of a user's password. It's especially important for ensuring that even if a database is compromised, user passwords remain secure. BCRYPT automatically handles the generation of salt and ensures the hashing is sufficiently slow, making it difficult for attackers to conduct brute-force attacks.

- [BCRYPT GitHub Repository](https://github.com/kelektiv/node.bcrypt.js)


### 9. **Express**:
Express is a fast, unopinionated, minimalist web framework for Node.js. It's designed for building web applications and APIs. In this project, Express provides a robust set of features for web and mobile applications, ensuring quick and easy routing, middleware support, and more.

- [Express Documentation](https://expressjs.com/)

### 10. **MongoDB**:
MongoDB is a cross-platform document-oriented NoSQL database program. It's designed for scalability and flexibility, using JSON-like documents with optional schemas. For this project, MongoDB serves as the primary database, storing data related to the virtual vending machine, including product information and transaction records.

- [MongoDB Official Site](https://www.mongodb.com/)

### 11. **Mongoose**:
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB. In this project, Mongoose simplifies the process of interacting with MongoDB, ensuring data consistency and ease of access.

- [Mongoose Documentation](https://mongoosejs.com/)


## Photo Gallery


![Screenshot 2023-08-14 at 7 47 09 AM](https://github.com/BigPhatNerd/intential-vendor-project/assets/44242436/d7766d65-8d1d-4378-b69e-d674f6cc0c1d)

![Screenshot 2023-08-14 at 7 47 26 AM](https://github.com/BigPhatNerd/intential-vendor-project/assets/44242436/9cdef677-c42a-4c3c-ae57-bbd2cd69c8b1)

![Screenshot 2023-08-14 at 7 48 11 AM](https://github.com/BigPhatNerd/intential-vendor-project/assets/44242436/4229c9cd-341f-43d3-a911-11facff6c052)


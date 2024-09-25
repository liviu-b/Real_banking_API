# Banking API

A simple, scalable Banking API built using Node.js, Express, and MongoDB. The API offers essential features for user authentication, account management, and transaction handling. This API can be expanded for larger financial systems, with core functionality such as deposits, withdrawals, and account balance tracking.

## Features

- User Registration and Login with JWT Authentication
- Create and Manage Bank Accounts
- Handle Transactions (Credit and Debit)
- Get Account and Transaction History
- Secure Access using JWT

## Technologies Used

- **Node.js** and **Express**: Backend framework for building the API
- **MongoDB** (with **Mongoose**): Database to store users, accounts, and transactions
- **JWT**: For user authentication and secure API access
- **bcryptjs**: For password hashing

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or above)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance
- [Postman](https://www.postman.com/) or another API testing tool


## API Endpoints
Authentication:

Register a user: POST /api/auth/register
Login a user: POST /api/auth/login

Account Management:

Get accounts: GET /api/accounts
Create an account: POST /api/accounts

Transactions:

Create a transaction: POST /api/transactions
Get transactions for an account: GET /api/transactions?accountId={accountId}

## Testing:

You can test the API endpoints using Postman or any other API testing tool. Make sure to include the JWT token in the Authorization header as a Bearer Token for protected routes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions
Feel free to submit a pull request if you'd like to contribute!

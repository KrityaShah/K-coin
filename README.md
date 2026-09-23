# KCoin

KCoin is a simplified blockchain application built with a NestJS API and a Next.js web client. It demonstrates wallet-based authentication, proof-of-work mining, pending transactions, block confirmation, and blockchain exploration.

## Description

The project is split into two applications:

- `backend` - NestJS API using MongoDB, Mongoose, JWT authentication, cookies, validation pipes, and CORS.
- `frontend` - Next.js application using Tailwind CSS, shadcn/ui components, TanStack Query, and Axios.

Users can register an account, receive a wallet address, mine blocks to earn KCoin, send KCoin to another wallet, and inspect the blockchain history from the explorer.

## Features

- User registration and login
- Wallet address generation
- JWT authentication with cookie support
- Proof-of-work block mining
- Coinbase mining rewards
- Pending transaction pool
- Confirmed transaction history
- Blockchain explorer

## Project Structure

```text
KCoin
|-- backend
|   |-- src
|   |   |-- auth
|   |   |-- block
|   |   |-- transaction
|   |   `-- user
|   `-- test
`-- frontend
    `-- src
        |-- api
        |-- app
        |-- components
        |-- context
        `-- lib
```

## Prerequisites

- Node.js
- Yarn
- MongoDB database connection string

## Backend Setup

Install dependencies:

```bash
cd backend
yarn install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Configure the required environment variables:

```env
MONGODB_URI=<your_mongodb_uri>
JWT_ACCESS_SECRET=<your_jwt_access_secret>
JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
MINING_DIFFICULTY=00
COINBASE_AMOUNT=10
COINBASE_SENDER=00
FRONTEND_URL=http://localhost:3001
ALLOWED_ORIGINS=http://localhost:3001
PORT=3000
```

Start the NestJS development server:

```bash
yarn dev
```

The API runs on:

```text
http://localhost:3000
```

## Frontend Setup

Install dependencies:

```bash
cd frontend
yarn install
```

Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Start the Next.js development server:

```bash
yarn dev
```

The web app runs on:

```text
http://localhost:3001
```

## Backend Scripts

```bash
# Development
yarn dev

# Production build
yarn build

# Production start
yarn start:prod

# Lint and fix
yarn lint

# Unit tests
yarn test

# End-to-end tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Frontend Scripts

```bash
# Development
yarn dev

# Production build
yarn build

# Production start
yarn start

# Lint
yarn lint
```

## Application Flow

1. A user registers and receives a unique wallet address.
2. Authenticated users can send KCoin to another wallet address.
3. Transactions enter the pending transaction pool.
4. Mining creates a new block using proof-of-work.
5. The mined block confirms pending transactions and rewards the miner.
6. The explorer displays blocks, hashes, and transaction history.

## Tech Stack

- NestJS
- MongoDB and Mongoose
- JWT authentication
- Next.js
- React
- Tailwind CSS
- shadcn/ui
- TanStack Query

## License

This project is currently unlicensed.

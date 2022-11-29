# Transaction monitor for the Ethereum blockchain

The current project connects to an Ethereum node and watches the transactions appearing there. Transactions are saved to the database, if they match the pre-defined rule.

## Prerequisites

1.  Install `npm` and `node`
2.  Setup a database, either Postgres or MySQL
3.  Create .env file
    - Set infura node address you will use
4.  Populate db.config file with required information

## Installation

1. Clone the repository with `https://github.com/konstantinabl/ethereum-transaction-monitor.git`
2. Install the dependencies with `npm install`.
3. Run database migrations and seed with `npm run db:migrate` and `npm run db:seed:all`.
4. Run the application in development mode with `npm run dev`.
5. Access `http://localhost:<PORT>` and get started!

[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# Bluefox Microservices Project

Bluefox is a microservices project built with [Moleculer](https://moleculer.services/), focusing on authentication and user management.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Docker (optional, for containerized deployment)

## Project Structure

- `services/`: Microservices implementations
- `test/`: Unit and integration tests
- `helpers/`: Utility functions
- `graphql/`: GraphQL schema definitions
- `src/`: Generated TypeScript types

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/[your-username]/bluefox.git
cd bluefox
```

2. Install dependencies
```bash
npm install
```

## Development

### Running the Project

- Development mode (with hot-reload):
```bash
npm run dev
```

- Production mode:
```bash
npm start
```

### Running Tests

- Run all tests:
```bash
npm test
```

- Run specific test suite:
```bash
npm test test/unit/services/auth.methods.spec.ts
```

### Available npm Scripts

- `dev`: Start project in development mode
- `start`: Start project in production mode
- `test`: Run Jest test suite
- `build`: Compile TypeScript to JavaScript

## Configuration

- `moleculer.config.js`: Moleculer broker configuration
- `tsconfig.json`: TypeScript compiler settings
- `jest.config.js`: Jest testing framework configuration

## Authentication Services

The project includes robust authentication methods:
- Account registration
- Practice account registration
- Password change
- Two-factor authentication helpers

## GraphQL Integration

Uses GraphQL for API interactions, with schema defined in `graphql/schema.graphql`

## Useful links

* Moleculer website: https://moleculer.services/
* Moleculer Documentation: https://moleculer.services/docs/0.14/

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose

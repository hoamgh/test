# PetCarx Backend

Backend API for PetCarx pet care management system using PostgreSQL (Neon) and Express.js.

## Tech Stack

- **Node.js** with Express.js
- **PostgreSQL** (Neon hosted)
- **Sequelize ORM**
- **CORS** for cross-origin requests

## Quick Start

See [SETUP.md](./SETUP.md) for detailed setup instructions.

```bash
npm install
node migrations/init-database.js
node seed-postgres.js
npm run dev
```

Server runs on http://localhost:8000

## Database Migration

This backend has been migrated from MongoDB to PostgreSQL (Neon):
- All Mongoose schemas converted to Sequelize models
- MongoDB queries converted to Sequelize queries
- UUID primary keys for all tables
- JSONB support for complex data types
- Full SSL support for Neon connection


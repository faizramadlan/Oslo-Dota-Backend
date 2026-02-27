# Oslo-Dota Companion API
Server-side component for the Oslo-Dota web application.

## Overview
This is a Node.js / Express backend powering the Oslo-Dota companion site. It handles user authentication, connects to third-party APIs (like OpenDota for analytics), and provides a robust RESTful API to be consumed by the Vercel-hosted frontend Vue application.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (managed via Sequelize ORM)
- **Authentication**: JWT & bcrypt
- **Integrations**: Nodemailer, Google Auth Library, Midtrans, Xendit
- **Testing**: Jest
- **Linting**: ESLint

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory mirroring `.env_example`.
   ```env
   # Required for local development
   PORT=4040
   SECRET_KEY=your_jwt_secret
   email_address=your_gmail_address
   email_password=your_gmail_app_password
   # Specify your frontend URL if testing CORS strictly locally
   VITE_APP_URL=http://localhost:5173
   ```

3. **Database Setup**
   Ensure PostgreSQL is running locally, then initialize the database:
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all # (if seeds are available)
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```

## API Documentation
Endpoints cover authentication, fetching Dota 2 heroes, analytics, and external gaming memes. 
For detailed payload and response structures, see the [api_docs.md](./api_docs.md) file.

## Production Deployment (Koyeb)

This repository is optimized for deployment on [Koyeb](https://www.koyeb.com/), which offers a great free tier without requiring a credit card.

1. **Database Setup**: 
   - In the Koyeb Dashboard, click **Create Database** and spin up a free PostgreSQL instance.
   - Once provisioned, copy the provided `Connection String`.
2. **Connect Repository**: 
   - Click **Create Service** and connect your GitHub repository.
3. **Environment Configuration**: Expand the "Environment variables" section and add:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = *(Your Koyeb PostgreSQL Connection String)*
   - `VITE_APP_URL` = *(Your Vercel Frontend Domain, e.g., https://my-dota-app.vercel.app)*
   - `SECRET_KEY` = *(Your secure production JWT secret)*
4. **Build & Start**: 
   - Set the Run Command to: `npm run koyeb-prestart && npm run koyeb-start`
   - *This ensures database migrations forcefully target the production PostgreSQL instance before booting your Express app.*
5. **Deploy**: Click Deploy and Koyeb will build and launch your API!

---
*Maintained using `@kaizen` continuous improvement principles, featuring decoupled service layers and uniform `AppError` handling patterns.*

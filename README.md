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

## Production Deployment (Render Blueprint)

This repository includes a `render.yaml` file that automates the deployment infrastructure (Infrastructure as Code).

1. **Connect Repository**: In the Render Dashboard, click **New +** > **Blueprint**.
2. **Connect**: Select this GitHub repository. Render will automatically read the `render.yaml` file.
3. **Provisioning**: It will automatically spin up two services:
   - A PostgreSQL Database (`oslo-dota-db`)
   - A Node Web Service (`oslo-dota-backend`)
   - *It automatically links the `DATABASE_URL` between them!*
4. **Environment Variables**: Once provisioned, go to the Web Service settings and input your missing secure variables:
   - `SECRET_KEY` (Your secure production JWT secret)
   - `VITE_APP_URL` (Your Vercel Frontend Domain, e.g., https://my-dota-app.vercel.app)
   - *Any other API keys (Midtrans, Gmail app passwords, etc.)*

---
*Maintained using `@kaizen` continuous improvement principles, featuring decoupled service layers and uniform `AppError` handling patterns.*

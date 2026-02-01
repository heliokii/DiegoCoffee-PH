# How to run the web app

## Prerequisites (one-time)

- **Node.js** 18+
- **Yarn** (`npm install -g yarn`)
- **PostgreSQL** installed and running

## One-time setup

### 1. Install dependencies

```bash
cd backend
yarn install
cd ../frontend
yarn install
```

### 2. PostgreSQL database

- Create a database and user (e.g. name `app_37967`, user `app_37967`, password from `backend/.env`).
- From project root:

```bash
cd backend
yarn db:create
```

## Run the app

Use **two terminals**.

**Terminal 1 – backend** (from project root):

```bash
cd backend
yarn start
```

Backend runs at **http://localhost:8080**.

**Terminal 2 – frontend** (from project root):

```bash
cd frontend
yarn dev
```

Frontend runs at **http://localhost:3000**. Open this in your browser.

---

**Ports:** Backend = 8080, Frontend = 3000 (configured in `backend/.env` and `frontend/src/config.ts`).

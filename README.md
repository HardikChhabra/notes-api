# NOTES-API

An API to create an authenticated Notes managing application, where users can create notes, look them up, update them, and if anything goes wrong, delete them too.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`DATABASE_URL` Secret url to your database.

`JWT_SECRET` Secret string key.

## Run Locally

Clone the project

```bash
  git clone https://github.com/HardikChhabra/notes-api.git
```

Go to the project directory

```bash
  cd notes-api
```

`Make sure you have the .env file`

Install dependencies

```bash
  npm install
```

Generate and Migrate to your database

```bash
  npm drizzle-kit generate
  npm drizzle-kit migrate
```

Start the server

```bash
  npm run dev
```

# API Endpoints

## Authentication

| Endpoint         | Method | Body Parameters             | Auth Required | Response      |
| ---------------- | ------ | --------------------------- | ------------- | ------------- |
| `/auth/register` | POST   | `email`, `name`, `password` | No            | Returns token |
| `/auth/login`    | POST   | `email`, `password`         | No            | Returns token |

## Task

| Endpoint             | Method | Body Parameters                          | Auth Required | Response                                       |
| -------------------- | ------ | ---------------------------------------- | ------------- | ---------------------------------------------- |
| `/notes/create`      | POST   | `content` (required), `title` (optional) | Yes           | Returns new note JSON                          |
| `/notes/read`        | GET    | None                                     | Yes           | Returns array of notes belonging to user       |
| `/notes/update/{id}` | PUT    | `title`, `content`                       | Yes           | Returns updated note JSON or status 404        |
| `/notes/delete/{id}` | DELETE | None                                     | Yes           | Returns status 204 if deleted, else status 404 |

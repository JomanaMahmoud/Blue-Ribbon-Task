
# Blue Ribbon - Sporting Club API

This repository contains the backend application for the Blue Ribbon Development Internship Task. It is a robust REST API built with **NestJS** that manages members, sports, and subscriptions for a sporting club, using a **PostgreSQL** database managed by **Supabase**.

## ✨ Features

- **CRUD Operations** for Sports, Members, and Subscriptions.
- **Relational Data Handling:** Manages relationships between members (family links) and between members and sports (subscriptions).
- **DTO Validation:** Uses `class-validator` to ensure all incoming data is well-formed and valid.
- **Clean Architecture:** Follows NestJS best practices with modules, controllers, services, and entities.
- **CamelCase API / Snake_case Database:** Provides a clean, conventional `camelCase` API interface while seamlessly mapping to a `snake_case` database schema via TypeORM.

---

## 🚀 Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account for the PostgreSQL database.

### 1. Clone the Repository

```bash
git clone https://github.com/JomanaMahmoud/Blue-Ribbon-Task/
cd <your-repository-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Database

1.  Go to your [Supabase Dashboard](https://app.supabase.com/) and create a new project.
2.  Navigate to **Project Settings > Database** and find your connection string URI.
3.  Navigate to the **SQL Editor** in the Supabase dashboard and run the following schema to create the necessary tables and types.

<details>
<summary>Click to view the SQL Schema</summary>

```sql
-- Custom ENUM types for data integrity
CREATE TYPE gender_enum AS ENUM ('male', 'female');
CREATE TYPE allowed_gender_enum AS ENUM ('male', 'female', 'mix');
CREATE TYPE subscription_type_enum AS ENUM ('group', 'private');

-- Members Table
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    gender gender_enum NOT NULL,
    birthdate DATE NOT NULL,
    subscription_date TIMESTAMPTZ NOT NULL,
    central_member_id INTEGER REFERENCES members(id) ON DELETE SET NULL
);

-- Sports Table
CREATE TABLE sports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    subscription_price NUMERIC(10, 2) NOT NULL CHECK (subscription_price >= 0),
    allowed_gender allowed_gender_enum NOT NULL
);

-- Subscriptions Table (Join Table)
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    sport_id INTEGER NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
    type subscription_type_enum NOT NULL,

    -- Ensures a member cannot have more than one subscription to the same sport.
    UNIQUE (member_id, sport_id)
);
```
</details>

### 4. Configure Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill it with your Supabase database credentials from the connection string.

```env
# .env file
DATABASE_HOST=db.<your-project-ref>.supabase.co
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=<your-database-password>
DATABASE_NAME=postgres
```

### 5. Run the Application

```bash
# Development mode with hot-reload
npm run start:dev
```

The application will be running at `http://localhost:3000`.

---

## 📋 API Summary

The base URL is `http://localhost:3000`.

### Sports (`/sports`)

| Method        | Endpoint         | Description                                     |
|---------------|------------------|-------------------------------------------------|
| `POST`        | `/sports`        | Creates a new sport.                            |
| `GET`         | `/sports`        | Gets a list of all available sports.            |
| `GET`         | `/sports/:id`    | Gets details for a single sport by its ID.      |
| `PATCH`       | `/sports/:id`    | Updates a sport's details.                      |
| `DELETE`      | `/sports/:id`    | Deletes a sport.                                |

💡 **Bonus:** The `GET /sports` endpoint is cached for 10 seconds to handle high traffic efficiently.

**Example: `POST /sports`**
_Request Body:_
```json
{
  "name": "Archery",
  "subscriptionPrice": 45.00,
  "allowedGender": "mix"
}
```

### Members (`/members`)

| Method        | Endpoint         | Description                                     |
|---------------|------------------|-------------------------------------------------|
| `POST`        | `/members`       | Creates a new member.                           |
| `GET`         | `/members`       | Gets a list of all members.                     |
| `GET`         | `/members/:id`   | Gets a member's details, including family links.|
| `PATCH`       | `/members/:id`   | Updates a member's details.                     |
| `DELETE`      | `/members/:id`   | Deletes a member.                               |

**Example: `POST /members` (to create a family member)**
_Request Body:_
```json
{
  "firstName": "Sam",
  "lastName": "Jones",
  "gender": "male",
  "birthdate": "2010-02-10",
  "subscriptionDate": "2023-10-27T12:00:00Z",
  "centralMemberId": 1
}
```

### Subscriptions (`/subscriptions`)

| Method        | Endpoint            | Description                                  |
|---------------|---------------------|----------------------------------------------|
| `POST`        | `/subscriptions`    | Subscribes a member to a sport.              |
| `DELETE`      | `/subscriptions/:id`| Unsubscribes a member from a sport by subscription ID.|

💡 **Bonus:** The system ensures a member cannot subscribe to the same sport more than once via a database `UNIQUE` constraint.

**Example: `POST /subscriptions`**
_Request Body:_
```json
{
  "memberId": 1,
  "sportId": 1,
  "type": "group"
}
```

---

## 📝 Assumptions Made

-   **API Naming Convention:** The API uses `camelCase` for all JSON request and response bodies, as this is the standard for modern web APIs.
-   **Database Naming Convention:** The database uses `snake_case` for table and column names, as this is a common convention for PostgreSQL. TypeORM is configured to handle this mapping seamlessly.
-   **Caching Strategy:** For the high-traffic bonus on `GET /sports`, an in-memory cache (`@nestjs/cache-manager`) with a 10-second TTL was implemented. This provides a simple and effective performance boost.
-   **Uniqueness Constraint:** For the unique subscription bonus, a database-level `UNIQUE` constraint on `(member_id, sport_id)` was implemented. This is the most robust and efficient way to enforce this rule.
-   **Error Handling:** The API provides clear error messages for `4xx` client errors (e.g., Not Found, Bad Request) and generic messages for `5xx` server errors.

---



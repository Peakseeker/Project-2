# Project-2

A full-stack Kanban board application. The backend is an Express and MongoDB API, and the frontend is a React application created with Vite.

## Current Status

- The backend API is implemented for workspaces, boards, lists, and cards.
- The frontend contains Kanban board components and API helpers, but the default `App.jsx` is still the Vite starter screen.
- `frontend/src/pages/board/Board.jsx` currently uses the placeholder value `YOUR_BOARD_ID`.
- There is no authentication or User model in this repository. User IDs are expected to be existing MongoDB ObjectIds supplied by the client.
- The frontend imports `react-beautiful-dnd`, while `frontend/package.json` currently declares `@hello-pangea/dnd`. These dependency/import names need to be aligned before the Kanban components can build successfully.

## Tech Stack

- **Frontend:** React 19, Vite, Axios, Fetch API, drag-and-drop components
- **Backend:** Node.js, Express 5, Mongoose 9, CORS, dotenv
- **Database:** MongoDB

## Project Structure

```text
Project-2/
|-- index.js                         # Root-level file; currently not used by the documented apps
|-- package.json                     # Root dependency manifest
|-- README.md
|-- backend/
|   |-- .env                         # Local environment variables; do not commit secrets
|   |-- package.json
|   |-- package-lock.json
|   |-- index.js                     # Express server and route registration
|   |-- db.js                        # MongoDB connection helper
|   |-- controllers/
|   |   |-- workspaceController.js   # Workspace CRUD handlers
|   |   |-- boardController.js       # Board CRUD handlers
|   |   |-- listController.js        # List CRUD and ordering handlers
|   |   `-- cardController.js        # Card CRUD, ordering, and assignment handlers
|   |-- models/
|   |   |-- Workspace.js
|   |   |-- Board.js
|   |   |-- List.js
|   |   `-- Card.js
|   `-- routes/
|       |-- workspaceRoutes.js
|       |-- boardRoutes.js
|       |-- listRoutes.js
|       `-- cardRoutes.js
|-- frontend/
|   |-- package.json                 # Frontend scripts and dependencies
|   |-- index.html                   # Vite HTML entry point
|   |-- vite.config.js               # Vite React plugin configuration
|   |-- eslint.config.js             # ESLint configuration
|   |-- README.md                    # Original Vite template notes
|   |-- public/                      # Static files served as-is
|   |-- services/api/
|   |   |-- axios.js                 # Axios instance with API base URL
|   |   |-- kanbanApi.js              # Fetch helpers for lists and cards
|   |   |-- listApi.js                # Axios list helpers
|   |   `-- cardApi.js                # Axios card helpers
|   `-- src/
|       |-- main.jsx                 # React entry point
|       |-- App.jsx                  # Current application root
|       |-- App.css                  # App styles
|       |-- index.css                # Global styles and theme variables
|       |-- assets/                  # Frontend images and SVG assets
|       |-- components/kanban/
|       |   |-- KanbanBoard.jsx       # Loads board data and handles card drag/drop
|       |   |-- BoardList.jsx         # Renders one list and its cards
|       |   `-- Card.jsx              # Renders one draggable card
|       `-- pages/board/Board.jsx    # Board page wrapper
```

## Requirements

- Node.js 20.19+ or Node.js 22.12+ for the current Vite/Rolldown toolchain
- npm
- A running MongoDB instance or MongoDB Atlas connection string

## Installation and Running

### 1. Install backend dependencies

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/project-2
PORT=5000
```

`MONGO_URI` is required. `PORT` is optional and defaults to `5000`.

Start the backend:

```bash
npm start
```

The backend does not currently define a `start` script, so use this command with the current files:

```bash
node index.js
```

The health response is available at `http://localhost:5000/`.

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Other frontend commands:

```bash
npm run build       # Create a production build
npm run preview     # Preview the production build
npm run lint        # Run ESLint
```

The frontend API helpers currently use `http://localhost:5000/api` directly. No frontend `.env` variable is configured.

## Backend API

Base URL: `http://localhost:5000/api`

All requests and responses use JSON. CORS is enabled globally. MongoDB ObjectIds are represented as string values in URL parameters and request bodies.

### Workspaces

| Method | Endpoint | Body | Successful response |
|---|---|---|---|
| `POST` | `/workspaces` | `{ "name": "Team", "description": "...", "owner": "USER_ID" }` | `201`, `{ message, workspace }` |
| `GET` | `/workspaces` | None | `200`, `{ message, workspaces }` |
| `GET` | `/workspaces/:id` | None | `200`, `{ message, workspace }` |
| `PUT` | `/workspaces/:id` | `{ "name": "New name", "description": "..." }` | `200`, `{ message, workspace }` |

Workspace creation requires `name` and `owner`. The owner is also added to `members`. Missing records return `404`; controller/database failures return `500`.

### Boards

| Method | Endpoint | Body | Successful response |
|---|---|---|---|
| `POST` | `/boards` | `{ "name": "Product", "description": "...", "workspace": "WORKSPACE_ID", "createdBy": "USER_ID" }` | `201`, `{ message, board }` |
| `GET` | `/boards/workspace/:workspaceId` | None | `200`, `{ message, boards }` |
| `GET` | `/boards/:id` | None | `200`, `{ message, board }` |
| `PUT` | `/boards/:id` | `{ "name": "New name", "description": "..." }` | `200`, `{ message, board }` |
| `DELETE` | `/boards/:id` | None | `200`, `{ message }` |

Board creation requires `name`, `workspace`, and `createdBy`. Board deletion does not currently delete its lists or cards.

### Lists

| Method | Endpoint | Body | Successful response |
|---|---|---|---|
| `POST` | `/lists` | `{ "title": "In progress", "board": "BOARD_ID" }` | `201`, `{ success, message, data }` |
| `GET` | `/lists/board/:boardId` | None | `200`, `{ success, count, data }` sorted by `position` |
| `GET` | `/lists/:listId` | None | `200`, `{ success, data }` |
| `PATCH` | `/lists/:listId` | `{ "title": "Updated title" }` | `200`, `{ success, message, data }` |
| `DELETE` | `/lists/:listId` | None | `200`, `{ success, message }` |
| `PATCH` | `/lists/:listId/move` | `{ "destinationIndex": 1 }` | `200`, `{ success, message, data }` |

New lists receive the next position in their board. Deleting a list also deletes all cards whose `list` matches that list. List updates require `title`.

### Cards

| Method | Endpoint | Body | Successful response |
|---|---|---|---|
| `POST` | `/cards` | `{ "title": "Fix login", "description": "...", "board": "BOARD_ID", "list": "LIST_ID", "assignedTo": [], "priority": "medium", "dueDate": "2026-09-08" }` | `201`, `{ success, message, data }` |
| `GET` | `/cards/list/:listId` | None | `200`, `{ success, count, data }` sorted by `position` |
| `GET` | `/cards/:cardId` | None | `200`, `{ success, data }` |
| `PATCH` | `/cards/:cardId` | Any of `title`, `description`, `priority`, `dueDate`, `assignedTo` | `200`, `{ success, message, data }` |
| `DELETE` | `/cards/:cardId` | None | `200`, `{ success, message }` |
| `PATCH` | `/cards/:cardId/move` | `{ "destinationListId": "LIST_ID", "destinationIndex": 0 }` | `200`, `{ success, message, data }` |
| `PATCH` | `/cards/:cardId/assign` | `{ "userId": "USER_ID" }` | `200`, `{ success, message, data }` |

Card creation requires `title`, `board`, and `list`. New cards receive the next position in their list. Valid priorities are `low`, `medium`, and `high`; the default is `medium`. Card movement updates positions for both same-list reordering and cross-list moves. Assignment rejects duplicate user IDs.

### Common error responses

- `400`: required input is missing or a user is already assigned.
- `404`: the requested workspace, board, list, or card does not exist.
- `500`: database or server error.

Error response shapes vary slightly between controllers. Workspace and board errors generally return `{ message, error? }`; list and card errors generally return `{ success: false, message }`.

## Database Models

All models use Mongoose timestamps, so documents include `createdAt` and `updatedAt`.

### Workspace

- `name`: required string
- `description`: string, default `""`
- `owner`: required ObjectId reference to `User`
- `members`: array of ObjectId references to `User`

### Board

- `name`: required string
- `description`: string, default `""`
- `workspace`: required ObjectId reference to `Workspace`
- `createdBy`: required ObjectId reference to `User`

### List

- `title`: required string
- `board`: required ObjectId reference to `Board`
- `position`: required number, default `0`

### Card

- `title`: required string
- `description`: string, default `""`
- `board`: required ObjectId reference to `Board`
- `list`: required ObjectId reference to `List`
- `assignedTo`: array of ObjectId references to `User`
- `position`: number, default `0`
- `priority`: `low`, `medium`, or `high`; default `medium`
- `dueDate`: date, default `null`

## Frontend Details

### API service files

- `services/api/axios.js` creates an Axios instance with base URL `http://localhost:5000/api`.
- `services/api/listApi.js` provides Axios helpers for creating, fetching, updating, deleting, and moving lists.
- `services/api/cardApi.js` provides Axios helpers for creating, fetching, updating, deleting, moving, and assigning cards.
- `services/api/kanbanApi.js` provides Fetch-based helpers for loading lists/cards, creating lists/cards, and moving cards. `KanbanBoard.jsx` currently uses this file.

### Kanban components

- `KanbanBoard.jsx` loads lists for a board, loads cards for each list, renders drag-and-drop columns, and optimistically updates card movement with rollback on failure.
- `BoardList.jsx` renders a list title, card count, cards, and an empty state.
- `Card.jsx` renders priority, title, description, assigned member initials, due date, and drag behavior.
- `Board.jsx` wraps `KanbanBoard`, but currently passes `YOUR_BOARD_ID` and is not connected from the default `App.jsx`.

## Development Notes

1. Start MongoDB before starting the backend; the server exits when `MONGO_URI` cannot be reached.
2. Start the backend before using frontend API calls.
3. Replace `YOUR_BOARD_ID` with a real Board ObjectId when rendering `Board`.
4. Align the drag-and-drop dependency with the imports in `Card.jsx` and `KanbanBoard.jsx`.
5. Add a User model/authentication layer before treating `owner`, `createdBy`, or `assignedTo` as validated application users.

## License

No project license has been specified yet.
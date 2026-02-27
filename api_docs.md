# Oslo Dota Companion API Documentation

## Authentication (`/routes/auth.js`)

### `POST /register`
Registers a new user in the system.
- **Body Parameters:**
  - `username` (string): The user's desired handle.
  - `email` (string): Valid email address.
  - `password` (string): Minimum 5 characters.
- **Responses:**
  - `201 Created`: `{ message: "id {id} with email {email} successfully created!" }`
  - `400 Bad Request`: Validation errors (e.g., missing fields, duplicate email).

### `POST /login`
Authenticates an existing user and returns an access token.
- **Body Parameters:**
  - `email` (string): Registered email address.
  - `password` (string): Associated password.
- **Responses:**
  - `200 OK`: `{ access_token: "jwt_token_here", username: "dota_player_1" }`
  - `401 Unauthorized`: Invalid email or password.

---

## Dota Analytics Data (`/routes/dota.js`)

*Note: You must be authenticated to access these endpoints (`access_token` in headers).*

### `GET /heroes`
Retrieves a comprehensive list of all Dota 2 heroes with detailed base attributes, winrates, and role tags from OpenDota.
- **Headers:** `access_token: <JWT>`
- **Responses:**
  - `200 OK`: `[{ id, localized_name, primary_attr, roles, attack_type, pro_win, pro_pick, ... }]`
  - `401 Unauthorized`: Missing or invalid token.

### `GET /heroes/:heroname`
Fetches aggressive meta-analytics for a specific hero, joining live item popularity metrics and matchups against the overall hero pool.
- **URL Parameters:** `heroname` (string) - Localized hero name (e.g., "Anti-Mage").
- **Headers:** `access_token: <JWT>`
- **Responses:**
  - `200 OK`: `{ heroId: 1, itemPopularity: {...}, matchups: [...] }`
  - `404 Not Found`: Hero name invalid or API fetch failed.

---

## Miscellaneous / Extras (`/routes/misc.js`)

### `GET /memes`
Public endpoint returning a collection of community Dota 2 memes fetching from external Reddit/Imgur services.
- **Responses:**
  - `200 OK`: `[{ title, url, author }]`
  - `500 Server Error`: Failed to connect to third-party meme host.

### `GET /freebies`
Fetches a list of currently free-to-play PC gaming deals (often used for downtime between queues).
- **Headers:** `access_token: <JWT>` (Requires Login)
- **Responses:**
  - `200 OK`: `[{ title, thumbnail, platform, url }]`
  - `401 Unauthorized`: Missing or invalid token.
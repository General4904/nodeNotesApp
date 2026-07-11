# Node Notes App

A simple Node.js and Express REST API for creating and deleting notes. Notes are stored in a local JSON file, so no database is required.

## Features

- Add a new note
- Delete an existing note by ID
- Persist notes in a local JSON file
- Simple API built with Express

## Project Structure

- `server.js` - Starts the Express server
- `routes/notesRoutes.js` - Defines the note-related API routes
- `notes.json` - Stores note data

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and set a port:
   ```env
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Welcome route
- `GET /`
- Returns a simple welcome message

### Add a note
- `POST /api/addNote`
- Request body:
  ```json
  {
    "note": "Your note here"
  }
  ```

### Delete a note
- `DELETE /api/removeNote/:id`
- Example:
  ```bash
  DELETE /api/removeNote/1780826577992
  ```

## Example Usage

### Add a note
```bash
curl -X POST http://localhost:3000/api/addNote \
  -H "Content-Type: application/json" \
  -d '{"note":"This is a test note"}'
```

### Delete a note
```bash
curl -X DELETE http://localhost:3000/api/removeNote/1780826577992
```

## Notes

- The app reads and writes notes to `notes.json`.
- If the file does not exist, the app will fail until it is created or initialized.

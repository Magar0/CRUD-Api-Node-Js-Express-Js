# Note Taking API
a RESTful API for a simple note-taking application using Node.js and Express.js, with MongoDB as the database. The API should allow users to create, retrieve, update, and delete text notes.
### vercel deployed link :
https://crud-api-node-js-express-js.vercel.app/

## Geting started 
#### npm init
to install all dependencies

#### add .env file and add this:
MONGODB_URI="your mongo db URI/(database name)"

#### node server.js 
To start your server

#### npm run test
To run the test cases.

## Documentation API:
#### Endpoints
/api/notes : GET/POST

/api/notes/:id : PUT/DELETE

# API Endpoints

| Endpoint | Method | URL Path | Request Body | Response Format |
|---|---|---|---|---|
| Create Note | POST | /api/notes | { title: string, content: string } | 201 Created: { id: string, title: string, content: string, createdAt: Date, updatedAt: Date } <br/> 400 Bad Request: { message: string } |
| Get All Notes | GET | /api/notes | None | 200 OK: [ { id: string, title: string, content: string, createdAt: Date, updatedAt: Date }, ... ] <br/> 500 Internal Server Error: { message: string } |
| Get Single Note | GET | /api/notes/:id | None | 200 OK: { id: string, title: string, content: string, createdAt: Date, updatedAt: Date } <br/> 404 Not Found: { message: string } <br/> 500 Internal Server Error: { message: string } |
| Update Note | PUT | /api/notes/:id | { title: string, content: string } | 200 OK: { id: string, title: string, content: string, createdAt: Date, updatedAt: Date } <br/> 400 Bad Request: { message: string } <br/> 404 Not Found: { message: string } <br/> 500 Internal Server Error: { message: string } |
| Delete Note | DELETE | /api/notes/:id | None | 200 OK: { message: string } <br/> 404 Not Found: { message: string } <br/> 500 Internal Server Error: { message: string } |


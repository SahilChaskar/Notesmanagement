# Notes Management App
## Overview
The Notes Management App is a full-stack CRUD (Create, Read, Update, Delete) web application designed for creating and managing personal notes. Built with jQuery and a RESTful API backend, this single-page application (SPA) offers a seamless experience for users to register, log in, create notes, view their saved notes, edit existing notes, and delete notes.

## Features
- **User Registration**: New users can sign up with their details.
- **User Authentication**: Secure login system for registered users.
- **Create Notes**: Logged-in users can create new notes with a title and content.
- **View Notes**: Users can view all their saved notes.
- **Edit Notes**: Users can edit the title and content of their existing notes.
- **Delete Notes**: Users can delete unwanted notes from their list.
- **Responsive Design**: The app is designed to work well on both desktop and mobile devices.

## Technologies Used
### Frontend:
- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery for DOM manipulation and AJAX requests
- Toastr for notifications

### Backend:
- RESTful API (details about the backend technology can be added here, e.g., Node.js, Express, etc.)
- JWT (JSON Web Tokens) for authentication
- PostgreSQL for the database

## Setup and Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/SahilChaskar/Notesmanagement.git
   cd Notesmanagement
   ```
2. Create PostgreSQL tables:
   - Connect to your PostgreSQL database:
     ```sh
     psql -U yourusername -d yourdatabase
     ```
   - Create the `users` table:
   - Create the `notes` table:
    
3. Open `index.html` in your web browser to run the application locally.
4. Ensure that the backend server is running and accessible at `http://localhost:3000` (or update the `API_BASE_URL` in the JavaScript file if your backend is hosted elsewhere).

## API Endpoints
The application interacts with the following API endpoints:
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Authenticate a user and receive a token
- `POST /api/notes`: Create a new note (requires authentication)
- `GET /api/getnotes`: Retrieve all notes for the authenticated user (requires authentication)
- `PUT /api/getnotes/:id`: Update an existing note (requires authentication)
- `DELETE /api/deletenote/:id`: Delete a note (requires authentication)

## Usage
1. Register a new account by clicking on the "Register" button and filling out the registration form.
2. Log in with your credentials.
3. Once logged in, you'll see the note creation form. Enter a title and content for your note, then click "Create Note".
4. To view your saved notes, click the "View Notes" button.
5. In the notes view, you can see all your saved notes. Click on a note to edit its title and content, and click "Save" to update the note.
6. To delete a note, click the "Delete" button next to the note you want to remove.
7. Click "Back to Create Note" to return to the note creation form.
8. Use the "Logout" button in the top-right corner to end your session.

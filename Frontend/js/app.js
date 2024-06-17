$(document).ready(function() {
    let token = '';
    LandingPage();

    function LandingPage() {
        $('body').append('<header class="main-header"><h1>Notes Management App</h1></header>');

        $('body').append(`
            <form id="loginForm">
                <input type="text" id="loginUsername" name="username" placeholder="Username" autocomplete=true required />
                <input type="password" id="loginPassword" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
                <button type="button" id="showRegisterForm">Register</button>
            </form>
        `);

        $('body').append(`
            <form id="registerForm">
                <input type="text" id="registerFirstName" name="firstName" placeholder="First Name" required />
                <input type="text" id="registerLastName" name="lastName" placeholder="Last Name" required />
                <input type="email" id="registerEmail" name="email" placeholder="Email" autocomplete=true required />
                <input type="text" id="registerUsername" name="username" placeholder="Username" autocomplete=true required />
                <input type="password" id="registerPassword" name="password" placeholder="Password" required />
                <button type="submit">Register</button>
                <button type="button" id="showLoginForm">Back to Login</button>
            </form>
        `);

        $('body').append(`
            <form id="createNoteForm">
                <h4 id="notesheader"> Start Creating Your Own Notes!! </h4>
                <input type="text" id="noteTitle" name="title" placeholder="Enter title" required />
                <textarea name="content" id="noteContent" placeholder="Enter your note..." required></textarea>
                <button type="submit">Create Note</button>            
                <button id="viewNotesButton">View Notes</button>
            </form>
        `);

        $('body').append('<div id="notesList"></div>');

        $('body').append('<button id="logoutButton">Logout</button>');

        $('#registerForm, #createNoteForm, #notesList, #logoutButton, #viewNotesButton').hide();
        bindEventListeners();
    }

    function bindEventListeners() {
        $('#loginForm').on('submit', handleLogin);
        $('#registerForm').on('submit', handleRegister);
        $('#logoutButton').on('click', logout);

        $('#showRegisterForm').on('click', function() {
            $('#loginForm, #notesList').hide();
            $('#registerForm').show();
        });
        $('#showLoginForm').on('click', showLoginForm);

        $('#createNoteForm').on('submit', handleNoteCreation);
        $('#viewNotesButton').on('click', function() {
            $('#createNoteForm').hide();
            fetchAndDisplayNotes();
        });
        $('#notesList').on('click', '.editbutton', function() {
            const noteId = $(this).closest('.note').data('note-id');
            editNotes(noteId);
        });
        $('#notesList').on('click', '.deletebutton', function() {
            const noteId = $(this).closest('.note').data('note-id');
            deleteNotes(noteId);
        });
        $('#notesList').on('click', '.savebutton', function() {
            const noteId = $(this).closest('.note').data('note-id');
            saveEditedNote(noteId);
        });
    }

    function showLoginForm() {
        $('#registerForm, #notesList').hide();
        $('#loginForm').show();
    }

    function editNotes(noteId) {
        const note = $(`.note[data-note-id="${noteId}"]`);
        const textarea = note.find('textarea');
        textarea.removeAttr('disabled');
        note.append('<button class="savebutton">Save</button>');
    }

    function saveEditedNote(noteId) {
        const note = $(`.note[data-note-id="${noteId}"]`);
        const content = note.find('textarea').val();

        const editedNoteData = {
            content: content
        };
        // console.log(editedNoteData)

        $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/api/getnotes${noteId}`,
            data: JSON.stringify(editedNoteData),
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                toastr.success('Note edited successfully!');
                fetchAndDisplayNotes();
            },
            error: function(xhr, status, error) {
                toastr.error('Failed to edit note: ' + error);
                console.error('Failed to edit note:', error, status, xhr);
            }
        });
    }

    function deleteNotes(noteId) {
        // console.log("Delete button clicked for note ID:", noteId);
        
        $.ajax({
            type:'DELETE',
            url:`http://localhost:3000/api/deletenote${noteId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success:function(response){
                console.log("Note deleted successfully",response);
                toastr.success('Note deleted successfully!');
                fetchAndDisplayNotes();
            },
            error: function(xhr, status, error) {
                toastr.error('Failed to delete note: ' + error);
                console.error('Failed to delete note:', error, status, xhr);
            }
        })
    }

    function handleLogin(event) {
        event.preventDefault();
        const credentials = {
            username: $('#loginUsername').val(),
            password: $('#loginPassword').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/auth/login',
            data: JSON.stringify(credentials),
            contentType: 'application/json',
            success: function(response) {
                token = response.token;
                toastr.success('User logged in successfully!');
                $('#loginForm').hide();
                $('#createNoteForm, #logoutButton, #viewNotesButton').show();
            },
            error: function(xhr, status, error) {
                toastr.error('Login failed: ' + error);
            }
        });
    }

    function handleRegister(event) {
        event.preventDefault();
        const userData = {
            firstname: $('#registerFirstName').val(),
            lastname: $('#registerLastName').val(),
            email: $('#registerEmail').val(),
            username: $('#registerUsername').val(),
            password: $('#registerPassword').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/auth/register',
            data: JSON.stringify(userData),
            contentType: 'application/json',
            success: function(response) {
                toastr.success('User registered successfully!');
                $('#registerForm')[0].reset();
                showLoginForm();
            },
            error: function(xhr, status, error) {
                toastr.error('Registration failed: ' + error);
            }
        });
    }

    function handleNoteCreation(event) {
        event.preventDefault();
        const noteData = {
            title: $('#noteTitle').val(),
            content: $('#noteContent').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/notes',
            data: JSON.stringify(noteData),
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                toastr.success('Note added successfully!');
                $('#createNoteForm')[0].reset();
            },
            error: function(xhr, status, error) {
                toastr.error('Failed to add note: ' + error);
            }
        });
    }

    function fetchAndDisplayNotes() {
        $('#notesList').html('<p>Loading notes...</p>').show();

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/getnotes',
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                const notes = response;
                if (notes.length === 0) {
                    $('#notesList').html('<p>No notes found. Create your first note!</p>');
                } else {
                    const notesHtml = notes.map(note => `
                        <div class="note" data-note-id="${note.id}" data-note-content="${note.content}">
                            <button class="deletebutton"><i class="fa fa-trash" id="trashicon" aria-hidden="true"></i></button>
                            <button class="editbutton"><i class="fa fa-edit" id="editicon"></i></button>
                            <h3>${note.title}</h3>
                            <p><textarea disabled>${note.content}</textarea></p>
                        </div>
                    `).join('');
                    $('#notesList').html(notesHtml);
                }
            },
            error: function(xhr, status, error) {
                $('#notesList').html('<p>Failed to load notes. Please try again.</p>');
                toastr.error('Failed to load notes: ' + error);
            },
            complete: function() {
                $('#notesList').append('<button id="backToCreateNote">Back to Create Note</button>');
                $('#backToCreateNote').on('click', function() {
                    $('#notesList').hide();
                    $('#createNoteForm').show();
                });
            }
        });
    }

    function logout() {
        token = '';
        $('#createNoteForm, #notesList, #logoutButton').hide();
        $('#loginForm').show();
        $('#loginForm input').val('');
        toastr.success('Logged out successfully!');
    }
});

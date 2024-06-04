# Library Management System

## Written in Golang, this LMS will have the following features:
- Separate Client and Admin portals     &#10004;
- Admins can:
    - Manage the book catalog (list, update, add/remove books).
    - Approve/deny checkout and check-in requests from clients.
    - Approve/deny requests from users seeking admin privileges.
-  Clients can:
    - View the list of available books.
    - Request checkout and check-in of books from the admin.
    - View their borrowing history.
- Secure Password Storage
    - Passwords will be salted and hashed (without using libraries) and only then stored in the database        &#10004;
- Session Management using self implemented JWTs

### Additional features include
- safeguards against SQL injection      &#10004;
- system that manages overdue fines
- search functionality with dynamic search
- SQL JOIN will be used 
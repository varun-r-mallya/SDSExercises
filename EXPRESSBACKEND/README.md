# Library Management System

## Written in JavaScript with Express.js, this LMS will have the following features:
- Separate Client and Admin portals     &#10004;
- Admins can:
    - Manage the book catalog (list, update, add/remove books). &#10004;
    - Approve/deny checkout and check-in requests from clients. &#10004;
    - Approve/deny requests from users seeking admin privileges.    &#10004;
-  Clients can:
    - View the list of available books. &#10004;
    - Request checkout and check-in of books from the admin.  &#10004;
    - View their borrowing history. &#10004;
- Secure Password Storage
    - Passwords will be salted and hashed (without using libraries) and only then stored in the database        &#10004;
- Session Management using self implemented JWTs    &#10004;

### Additional features include
- safeguards against SQL injection      &#10004;
- system that manages overdue fines 
- search functionality with dynamic search (kind of &#10004;) Implemented on frontend
- SQL JOIN will be used     &#10004;

# Instructions to Run
- Create a mariaDB database user and add a password to it (Also add to <code>.env</code>)
- Create a database and add it's name to the <code>.env</code>
- Run the queries in the database from <code>queries_Used.sql</code>
- Complete all fields of the <code>.env</code> file as given in the sample
- Run <code>npm i</code> to install dependencies
- Run <code>npm start</code> on the root directory and enjoy.
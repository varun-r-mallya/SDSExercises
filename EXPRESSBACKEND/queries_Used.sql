CREATE TABLE CLIENT ( 
    C_Id int(10) unsigned NOT NULL AUTO_INCREMENT,
    ClientID varchar(255) DEFAULT NULL,
    ClientPassword varchar(255) DEFAULT NULL,
    primary key(C_Id),
    UNIQUE KEY ClientID (ClientID)
);

CREATE TABLE ADMINISTRATORS ( 
    A_Id int(10) unsigned NOT NULL AUTO_INCREMENT,
    AdminID varchar(255) DEFAULT NULL,
    AdminPassword varchar(255) DEFAULT NULL,
    primary key(A_Id),
    UNIQUE KEY AdminID (AdminID)
);

CREATE TABLE CLIENTSALT (
        ClientID varchar(255) NOT NULL,
        Salt varchar(255),
        PRIMARY KEY (ClientID),
        FOREIGN KEY (ClientID) REFERENCES CLIENT(ClientID)
    ); 



CREATE TABLE ADMINISTRATORSALT (
        AdminID varchar(255) NOT NULL,
        Salt varchar(255),
        PRIMARY KEY (AdminID),
        FOREIGN KEY (AdminID) REFERENCES ADMINISTRATORS(AdminID)
    ); 


CREATE TABLE BOOKLIST (
    B_Id int(10) unsigned NOT NULL AUTO_INCREMENT,
    BookName varchar(255) DEFAULT NULL,
    Author varchar(255) DEFAULT NULL,
    Genre varchar(255) DEFAULT NULL,
    NumberofCopies int(10) unsigned DEFAULT 0,
    NumberofCopiesAvailable int(10) unsigned DEFAULT 0,
    NumberofCopiesBorrowed int(10) unsigned DEFAULT 0,
    CONSTRAINT check_copies CHECK (NumberofCopies = NumberofCopiesAvailable + NumberofCopiesBorrowed),
    primary key(B_Id)
);

CREATE TABLE TRANSACTIONS (
    T_Id int(10) unsigned NOT NULL AUTO_INCREMENT UNIQUE,
    ClientID varchar(255) DEFAULT NULL,
    BookID int(10) unsigned DEFAULT NULL,
    Borrowed boolean DEFAULT NULL,
    DateBorrowed date DEFAULT NULL,
    DateReturned date DEFAULT NULL,
    primary key(T_Id),
    FOREIGN KEY (ClientID) REFERENCES CLIENT(ClientID),
    FOREIGN KEY (BookID) REFERENCES BOOKLIST(B_Id)
);
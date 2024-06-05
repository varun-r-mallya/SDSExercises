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



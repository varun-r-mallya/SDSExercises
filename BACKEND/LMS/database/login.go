package database

import (
	"fmt"
	"database/sql"

	
)

func SaveUser(username string, password string, user_type string ) (sql.Result, error) {
	if user_type == "admin"{
		result, err := db.Exec("INSERT INTO ADMINISTRATORS (AdminID, AdminPassword) VALUES (?, ?)", username, password)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		fmt.Println("User registered in database")
		return result, nil
	} else 
	if user_type == "client" {
		result, err := db.Exec("INSERT INTO CLIENT (ClientID, ClientPassword) VALUES (?, ?)", username, password)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		fmt.Println("User registered in database")
		return result, nil
	} else {
		fmt.Println("Invalid user type")
		return nil, fmt.Errorf("invalid user type")
	}
}

func GetUser(username string, user_type string) (string, string, error) {
	var password_actual string
	var salt string
	if user_type == "admin"{
		err := db.QueryRow("SELECT AdminPassword FROM ADMINISTRATORS WHERE AdminID = ?", username).Scan(&password_actual)
		err2 := db.QueryRow("SELECT Salt FROM ADMINISTRATORSALT WHERE AdminID = ?", username).Scan(&salt)
		if err != nil || err2 != nil{
			fmt.Println(err, err2)
			return "", "", err
		}
		fmt.Println("User retrieved from database")
		return password_actual, salt, nil
	} else 
	if user_type == "client" {
		err := db.QueryRow("SELECT ClientPassword FROM CLIENT WHERE ClientID = ?", username).Scan(&password_actual)
		err2 := db.QueryRow("SELECT Salt FROM CLIENTSALT WHERE ClientID = ?", username).Scan(&salt)
		if err != nil || err2 != nil{
			fmt.Println(err, err2)
			return "", "", err
		}
		fmt.Println("User retrieved from database")
		return password_actual, salt, nil
	} else {
		fmt.Println("Invalid user type")
		return "", "", fmt.Errorf("invalid user type")
	}
}

package database

import (
	"fmt"
	"database/sql"
)

func GetSalt(username string, user_type string) string {
	fmt.Println("Salt retrieved from database")
	return "salt"
}


func StoreSalt(username string, user_type string, salt string) (sql.Result, error){
	if user_type == "admin"{
		result, err := db.Exec("INSERT INTO ADMINISTRATORSALT (AdminID, Salt) VALUES (?, ?)", username, salt)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		fmt.Println("Salt successfully stored in database")
		return result, nil
	} else 
	if user_type == "client" {
		result, err := db.Exec("INSERT INTO CLIENTSALT (ClientID, Salt) VALUES (?, ?)", username, salt)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		fmt.Println("Salt successfully stored in database")
		return result, nil
	} else {
		fmt.Println("Invalid user type")
		return nil, fmt.Errorf("invalid user type")
	}

}